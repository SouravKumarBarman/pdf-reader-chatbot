from fastapi import APIRouter, UploadFile, File, Depends
from app.schemas.document_schema import DocumentCreate, DocumentResponse
from app.services.pdf_service import save_pdf
from datetime import datetime
from fastapi.exceptions import HTTPException
import uuid

router = APIRouter()

@router.post("/upload", response_model=DocumentResponse)
async def upload_pdf(pdf: UploadFile = File(...)):
    if not pdf.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")
    filename = await save_pdf(pdf)
    # Here you would save the metadata to the database and return a response
    return {"filename": filename, "upload_date": datetime.now()}
