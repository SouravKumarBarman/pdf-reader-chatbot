from app.services.pdf_service import extract_text_from_pdf
from app.config import UPLOAD_FOLDER
from dotenv import load_dotenv
import os
import google.generativeai as genai
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from transformers import GPT2Tokenizer
from langchain.schema import Document


load_dotenv()  # Load variables from .env file
secret_key=os.getenv("API_KEY")

tokenizer=GPT2Tokenizer.from_pretrained("gpt2")

def count_tokens(text:str)->int:
    return len(tokenizer.encode(text))

text_splitter=RecursiveCharacterTextSplitter(
    chunk_size=512,
    chunk_overlap=24,
    length_function=count_tokens
)

embeddings=GoogleGenerativeAIEmbeddings(
            model="models/embedding-001",
            google_api_key=secret_key
        )




async def process_question(pdf_id: str, question: str):
    # Retrieve the PDF text (this function assumes you have a way to get the PDF filename by id)
    filepath = f"{UPLOAD_FOLDER}/{pdf_id}"
    pdf_text = extract_text_from_pdf(filepath)

    chunks=text_splitter.create_documents([pdf_text])

    db=FAISS.from_documents(chunks, embeddings)

    docs=db.similarity_search(question, k=3)

    genai.configure(api_key=secret_key)  # Set the API key for GenerativeAI
    model = genai.GenerativeModel("gemini-1.5-flash")
    
    # Use LangChain to get the answer
    prompt = f"Context: {docs[0].page_content}\nQuestion: {question}\nAnswer:"
    answer = model.generate_content(prompt)
    
    
    return answer.text
