from fastapi import FastAPI
from app.routes import document_routes, question_routes
from app.db.database import init_db

app = FastAPI(title="PDF Question Answering API")

# Initialize the database
init_db()

# Include routes
app.include_router(document_routes.router)
app.include_router(question_routes.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the PDF Question Answering API"}
