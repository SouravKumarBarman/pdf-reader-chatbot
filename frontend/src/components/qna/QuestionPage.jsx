import axios from "axios";
import {  useState } from "react";
import { useSelector } from "react-redux";
import Markdown from 'react-markdown'

const QuestionPage = () => {
  const pdf_id = useSelector(state=> state.pdf_id);
 
  // All States
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isShow, setIsShow] = useState(false);

  // handler method for input field
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
    setError(false);
  };

  // handler method to send question and receive answer
  const handleAskQuestion = async (e) => {
    e.preventDefault();
    setIsShow(true);
    try {
      setLoading(true);
      await axios
        .post(
          "http://127.0.0.1:8000/ask",
          {
            pdf_id: pdf_id,
            question: question,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setAnswer(response.data.answer);
          setAnswer(response.dota.answer);
        });

      setLoading(false);
      setError(false);
      
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="px-auto">
      {/* Question-Answer part */}
      {isShow && question && (
        <div className="flex mt-4">
          <img src="./question_icon.png" alt="client" className="inline-block mr-2 w-14 h-12 ml-5"/>
          <div className=" bg-blue-100 text-blue-800 p-4 rounded-lg shadow-md max-w-lg mr-auto my-2">
          <p>{question}</p>
          </div>
        </div>
      )}
      {loading ? (
        <h4>Loading.....</h4>
      ) : question && answer ? (
        <div className="flex justify-center">
          <img src="./answer_logo.png" alt="gemini" className="inline-block mr-2 w-14 h-12 ml-5"/>
          <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow-md max-w-6xl mr-auto my-2">
            <Markdown>{answer}</Markdown>
          </div>
        </div>
      ) : (
        error && <h4>Something went wrong.</h4>
      )}

      {/* Input field part */}
      <div className="flex justify-center fixed bottom-0 left-0 w-full bg-white p-4">
        <form className="flex justify-center items-center w-full max-w-lg mx-auto" onSubmit={handleAskQuestion}>
          <input
            className="shadow-md w-full border border-gray-300 bg-white text-black placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={question}
            placeholder="Type your question here..."
            onChange={handleQuestionChange}
          />
          <button
            type="submit"
            className="shadow-md ml-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            // style={{ background: "none", border: "none", padding: 0 }}
          >
            <img src="./send-icon.png" alt="Send" width="45px"/>
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuestionPage;
