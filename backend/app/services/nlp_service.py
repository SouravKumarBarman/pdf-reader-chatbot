from app.services.pdf_service import extract_text_from_pdf
from app.config import settings
import os
import asyncio
from google import genai
from langchain_core.embeddings import Embeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=100,
    length_function=len
)

class CustomGeminiEmbeddings(Embeddings):
    def __init__(self, api_key: str):
        self.client = genai.Client(api_key=api_key)
        
    def embed_documents(self, texts: list[str]) -> list[list[float]]:
        embeddings = []
        for text in texts:
            res = self.client.models.embed_content(
                model='models/gemini-embedding-2',
                contents=text
            )
            embeddings.append(res.embeddings[0].values)
        return embeddings

    def embed_query(self, text: str) -> list[float]:
        return self.embed_documents([text])[0]

embeddings = CustomGeminiEmbeddings(api_key=settings.API_KEY)

async def process_pdf(unique_filename: str):
    """Extracts text from PDF, builds FAISS index, and saves it."""
    filepath = os.path.join(settings.UPLOAD_FOLDER, unique_filename)
    pdf_text = await extract_text_from_pdf(filepath)

    chunks = text_splitter.create_documents([pdf_text])

    # Run FAISS building in thread as it's CPU bound and potentially slow
    def build_and_save():
        db = FAISS.from_documents(chunks, embeddings)
        index_path = os.path.join(settings.FAISS_FOLDER, unique_filename)
        db.save_local(index_path)

    await asyncio.to_thread(build_and_save)

async def process_question(pdf_id: str, question: str):
    index_path = os.path.join(settings.FAISS_FOLDER, pdf_id)
    
    if not os.path.exists(index_path):
        return "Error: Index for this PDF not found. It might still be processing."

    def load_db_and_search():
        db = FAISS.load_local(index_path, embeddings, allow_dangerous_deserialization=True)
        return db.similarity_search(question, k=3)
        
    docs = await asyncio.to_thread(load_db_and_search)

    context = "\n\n".join([doc.page_content for doc in docs])
    
    client = genai.Client(api_key=settings.API_KEY)
    
    prompt = f"Context:\n{context}\n\nQuestion: {question}\nAnswer:"
    
    def generate():
        return client.models.generate_content(
            model="gemini-flash-latest",
            contents=prompt
        )
        
    response = await asyncio.to_thread(generate)
    return response.text
