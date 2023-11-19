import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../const.api";
import "./pages/Test.css";
import { toast } from "react-toastify";

const Test = () => {
  const { examKey } = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [name, setName] = useState("");
  const [totalQuestions, setTotalQuestions] = useState("");
  const [time, setTime] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [enteredFullName, setEnteredFullName] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${API}/exams/${examKey}`);
        const questionsData = response.data;
        setQuestions(questionsData.questions);
        setName(questionsData.name);
        setTotalQuestions(questionsData.total_question);
        setTime(questionsData.time_end * 60);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu câu hỏi:", error.message);
      }
    };

    fetchQuestions();
  }, [examKey]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (time > 0) {
        setTime((prevTime) => prevTime - 1);
      } else {
        setCompleted(true);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  const handleAnswerChange = (questionId, selectedAnswer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: selectedAnswer,
    });
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((question) => {
      if (selectedAnswers[question._id] === question.correct_answer) {
        score += 1;
      }
    });

    setCompleted(true);
  };

  const handleFullNameChange = (event) => {
    setEnteredFullName(event.target.value);
  };

  const handleSubmitFullName = async () => {
    try {
      const res = await axios.post(`${API}/exams/${examKey}`, {
        full_name: enteredFullName,
        answers: Object.keys(selectedAnswers).map((questionId) => ({
          _id: questionId,
          answer: selectedAnswers[questionId],
        })),
      });
      toast.success(res.data.message);

      // Reset the form
      resetForm();
    } catch (error) {
      console.error("Lỗi khi nộp bài:", error.message);
      toast.error("Có lỗi xảy ra khi nộp bài!");
    }
  };

  const resetForm = () => {
    setCompleted(false);
    setEnteredFullName("");
    setSelectedAnswers({});
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="test">
      <h2 className="test-title">{name}</h2>
      <p className="test-time">Thời gian còn lại: {formatTime(time)}</p>
      <form>
        {questions.map((question) => (
          <div key={question._id}>
            <p>{question.content}</p>
            <ul>
              <li>
                <label>
                  <input
                    type="radio"
                    name={`question_${question._id}`}
                    value={1}
                    onChange={() => handleAnswerChange(question._id, 1)}
                  />
                  {question.answer1}
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="radio"
                    name={`question_${question._id}`}
                    value={2}
                    onChange={() => handleAnswerChange(question._id, 2)}
                  />
                  {question.answer2}
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="radio"
                    name={`question_${question._id}`}
                    value={3}
                    onChange={() => handleAnswerChange(question._id, 3)}
                  />
                  {question.answer3}
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="radio"
                    name={`question_${question._id}`}
                    value={4}
                    onChange={() => handleAnswerChange(question._id, 4)}
                  />
                  {question.answer4}
                </label>
              </li>
            </ul>
          </div>
        ))}
        {!completed ? (
          <button className="test-button" type="button" onClick={handleSubmit}>
            Hoàn thành
          </button>
        ) : (
          <>
            <h2>Nhập họ tên của bạn:</h2>
            <input
              type="text"
              value={enteredFullName}
              onChange={handleFullNameChange}
            />
            <button type="button" onClick={handleSubmitFullName}>
              Xác nhận
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Test;
