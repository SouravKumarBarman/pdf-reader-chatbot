from fastapi import APIRouter
from app.schemas.question_schema import QuestionRequest, QuestionResponse
from app.services.nlp_service import process_question

router = APIRouter()

@router.post("/ask", response_model=QuestionResponse)
async def ask_question(question_request: QuestionRequest):
    answer = await process_question(question_request.pdf_id, question_request.question)
    return {"answer": answer}
