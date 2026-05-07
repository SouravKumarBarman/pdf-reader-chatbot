from fastapi import APIRouter, UploadFile, File, BackgroundTasks
from app.schemas.document_schema import DocumentResponse
from app.services.pdf_service import save_pdf
from app.services.nlp_service import process_pdf
from datetime import datetime
from fastapi.exceptions import HTTPException

router = APIRouter()

@router.post("/upload", response_model=DocumentResponse)
async def upload_pdf(background_tasks: BackgroundTasks, pdf: UploadFile = File(...)):
    if not pdf.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")
    
    filename = await save_pdf(pdf)
    
    # Process the PDF in the background to build and save embeddings
    background_tasks.add_task(process_pdf, filename)
    
    return {"filename": filename, "upload_date": datetime.now()}
