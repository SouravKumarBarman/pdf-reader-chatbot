import os
import fitz  # PyMuPDF
from fastapi import UploadFile
import uuid

async def save_pdf(pdf: UploadFile):
    # Save the uploaded PDF to the local filesystem
    file_id = str(uuid.uuid4())
    unique_filename = f"{file_id}_{pdf.filename}"


    filepath = os.path.join("uploaded_pdfs", unique_filename)

    with open(filepath, "wb") as buffer:
        buffer.write(await pdf.read())

    return unique_filename

def extract_text_from_pdf(filepath: str) -> str:
    # Extract text from the PDF file using PyMuPDF
    text = ""
    with fitz.open(filepath) as doc:
        for page in doc:
            text += page.get_text() + "\n"
    return text
