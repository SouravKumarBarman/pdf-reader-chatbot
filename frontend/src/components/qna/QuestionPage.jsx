import axios from "axios";
import {  useState } from "react";
import { useSelector } from "react-redux";

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
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="wrapper">
      {/* Question-Answer part */}
      {isShow && question && (
        <div className="question">
          <img alt="" />
          <p>{question}</p>
        </div>
      )}
      {loading ? (
        <h4>Loading.....</h4>
      ) : question && answer ? (
        <div className="answer">
          <img alt="" />
          <p>{answer}</p>
        </div>
      ) : (
        error && <h4>Something went wrong.</h4>
      )}

      {/* Input field part */}
      <div className="input-wrapper">
        <form onSubmit={handleAskQuestion}>
          <input
            type="text"
            value={question}
            placeholder="Type your question here..."
            onChange={handleQuestionChange}
          />
          <button
            type="submit"
            style={{ background: "none", border: "none", padding: 0 }}
          >
            <img alt="Send" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuestionPage;
