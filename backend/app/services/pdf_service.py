import os
import fitz  # PyMuPDF
from fastapi import UploadFile
import uuid
import asyncio
from app.config import settings

async def save_pdf(pdf: UploadFile) -> str:
    # Save the uploaded PDF to the local filesystem
    file_id = str(uuid.uuid4())
    unique_filename = f"{file_id}_{pdf.filename}"

    filepath = os.path.join(settings.UPLOAD_FOLDER, unique_filename)

    # Note: pdf.read() is async, so we await it. The file write can be sync if it's fast enough,
    # or wrapped in a thread. Since files might be large, it's safer to use an async file write
    # or just read entirely into memory. Here, standard I/O is usually fast enough for typical PDFs.
    content = await pdf.read()
    with open(filepath, "wb") as buffer:
        buffer.write(content)

    return unique_filename

def _extract_text_sync(filepath: str) -> str:
    text = ""
    with fitz.open(filepath) as doc:
        for page in doc:
            text += page.get_text() + "\n"
    return text

async def extract_text_from_pdf(filepath: str) -> str:
    # Extract text from the PDF file using PyMuPDF in a background thread
    return await asyncio.to_thread(_extract_text_sync, filepath)
