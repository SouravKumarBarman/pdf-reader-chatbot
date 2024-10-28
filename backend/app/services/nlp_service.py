from app.services.pdf_service import extract_text_from_pdf
from app.config import UPLOAD_FOLDER
from dotenv import load_dotenv
import os
import google.generativeai as genai

load_dotenv()  # Load variables from .env file
secret_key=os.getenv("API_KEY")


async def process_question(pdf_id: str, question: str):
    # Retrieve the PDF text (this function assumes you have a way to get the PDF filename by id)
    filepath = f"{UPLOAD_FOLDER}/{pdf_id}"
    pdf_text = extract_text_from_pdf(filepath)

    

    genai.configure(api_key=secret_key)  # Set the API key for GenerativeAI
    model = genai.GenerativeModel("gemini-1.5-flash")
    
    # Use LangChain to get the answer
    prompt = f"Context: {pdf_text}\nQuestion: {question}\nAnswer:"
    answer = model.generate_content(prompt)

    # Call the model with the prompt
    
    
    return answer.text
