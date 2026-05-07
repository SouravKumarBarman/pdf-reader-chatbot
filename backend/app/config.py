import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    UPLOAD_FOLDER: str = "uploaded_pdfs"
    FAISS_FOLDER: str = "faiss_indices"
    API_KEY: str = ""
    CORS_ORIGINS: list[str] = ["*"]

    class Config:
        env_file = ".env"

settings = Settings()
