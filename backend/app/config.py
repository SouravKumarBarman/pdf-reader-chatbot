import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:Sourav7055@localhost/pdf_db")
UPLOAD_FOLDER = "uploaded_pdfs"  # Directory for uploaded PDFs
