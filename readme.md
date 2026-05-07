# PDF QnA Application

This is a PDF QnA application that allows users to upload PDF files and ask questions about the content of the PDF. The application uses React for the frontend and communicates with a backend server to process the PDF files.

## Features

- Upload PDF files
- Ask questions about the content of the PDF
- Display answers to the questions
- Responsive design with Tailwind CSS

## Technologies Used

### Backend
- Python
- FastAPI
- FAISS (for vector storage)
- Google Generative AI (Gemini)
- PyMuPDF (fitz for PDF text extraction)

### Frontend
- React
- Tailwind CSS
- Axios
- Redux Toolkit 
- Markdown rendering

## Local Setup Instructions

### 1. Prerequisites
- **Node.js** (v18+)
- **Python** (v3.10+)

### 2. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   
   # On Windows:
   .venv\Scripts\activate
   # On Linux/macOS:
   source .venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up environment variables:
   - Create a `.env` file and fill in your `API_KEY` (from Google AI Studio).
     ```env
     API_KEY="your_google_api_key_here"
     ```
5. Run the FastAPI server:
   ```bash
   fastapi run app/main.py
   ```
   The backend will be available at `http://localhost:8000`.

### 3. Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

## Screenshot
![image alt](https://github.com/SouravKumarBarman/pdf-reader-chatbot/blob/main/mobile.png?raw=true)
![image alt](https://github.com/SouravKumarBarman/pdf-reader-chatbot/blob/main/desktop.png?raw=true)
