from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.routes import document_routes, question_routes
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.utils.file_util import create_upload_folder

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create necessary directories
    create_upload_folder(settings.UPLOAD_FOLDER)
    create_upload_folder(settings.FAISS_FOLDER)
    yield
    # Shutdown logic can go here

app = FastAPI(title="PDF Question Answering API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(document_routes.router)
app.include_router(question_routes.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the PDF Question Answering API"}

if __name__ == "__main__":
    import uvicorn
    # Run the server on localhost only (127.0.0.1) instead of 0.0.0.0
    uvicorn.run(app, host="127.0.0.1", port=8000)
