from langchain_community.llms import Anthropic # Assuming you use OpenAI models; change as needed
from app.services.pdf_service import extract_text_from_pdf
from app.config import UPLOAD_FOLDER
from dotenv import load_dotenv
import os

load_dotenv()  # Load variables from .env file


async def process_question(pdf_id: str, question: str):
    # Retrieve the PDF text (this function assumes you have a way to get the PDF filename by id)
    filepath = f"{UPLOAD_FOLDER}/{pdf_id}"
    pdf_text = extract_text_from_pdf(filepath)

    # Use LangChain to get the answer
    model = Anthropic(anthropic_api_key=os.getenv("ANTHROPIC_API_KEY"))
    prompt = f"Context: {pdf_text}\nQuestion: {question}\nAnswer:"

    # Call the model with the prompt
    answer = model(prompt=prompt)
    
    return answer
