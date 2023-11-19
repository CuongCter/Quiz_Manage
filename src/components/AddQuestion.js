import { useState } from "react";
import { db } from "./data/firebbase-config";
import { collection, addDoc } from "@firebase/firestore";
import "./pages/Button.css";
import "./pages/AddQuestion.css";
import { API } from "../const.api";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddQuestion() {
  const defaultAnswers = [
    { id: 1, text: "", isCorrect: false },
    { id: 2, text: "", isCorrect: false },
    { id: 3, text: "", isCorrect: false },
    { id: 4, text: "", isCorrect: false },
  ];

  const [newQuestion, setNewQuestion] = useState("");
  const [newLevel, setNewLevel] = useState("");
  const [newSubjectID, setNewSubjectID] = useState("");
  const [answers, setAnswers] = useState(defaultAnswers);
  const [correctAnswerID, setCorrectAnswerID] = useState(0);

  const handleAnswerChange = (event, id) => {
    const { value } = event.target;
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.id === id ? { ...answer, text: value } : answer
      )
    );
  };

  const handleCorrectAnswerChange = (event) => {
    const { value } = event.target;
    setCorrectAnswerID(parseInt(value));
  };

  const handleSelectChangeLevel = (event) => {
    setNewLevel(parseInt(event.target.value, 10));
  };

  const handleSelectChangeSubject = (event) => {
    setNewSubjectID(event.target.value);
  };

  const clearForm = () => {
    setNewQuestion("");
    setNewLevel("");
    setNewSubjectID("");
    setAnswers(defaultAnswers);
    setCorrectAnswerID(0);
  };

  const createQuestion = async () => {
    try {
      const apiUrl = `${API}/questions`;
      const requestBody = {
        content: newQuestion,
        subject: newSubjectID,
        level: newLevel,
        answer1: answers[0].text,
        answer2: answers[1].text,
        answer3: answers[2].text,
        answer4: answers[3].text,
        correct_answer: correctAnswerID,
      };

      const response = await axios.post(apiUrl, requestBody);
      toast.success("Thêm thành công");

      // Clear form after successful addition
      clearForm();
    } catch (error) {
      toast.error("Lỗi")
      console.error("Error:", error);
    }
  };

  return (
    <div className="AddQuestion">
      <div className="container">
        <form>
          <h3>THÊM CÂU HỎI</h3>

          <h2>Nội dung câu hỏi</h2>
          <input
            placeholder="Question"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <select value={newLevel} onChange={handleSelectChangeLevel}>
            <option value="">Mức độ</option>
            <option value="1">Dễ</option>
            <option value="2">Trung bình</option>
            <option value="3">Khó</option>
          </select>

          <select value={newSubjectID} onChange={handleSelectChangeSubject}>
            <option value="">Môn học</option>
            <option value="csdl">Cơ Sở Dữ Liệu</option>
            <option value="ktlt">Kỹ Thuật Lập Trình</option>
            <option value="ctdlvgt">Cấu Trúc Dữ Liệu Và Giải Thuật</option>
            <option value="cnpm">Công Nghệ Phần Mềm</option>
            <option value="ltw">Lập Trình Web</option>
          </select>
          <h2>Các đáp án</h2>
          <ul className="nav flex-column">
            {answers.map((answer) => (
              <li className="nav-item" key={answer.id}>
                <div className="input-group-text">
                  <input
                    type="radio"
                    name="radAns"
                    className="mr-2"
                    aria-label="Radio button for following text input"
                    value={answer.id}
                    checked={correctAnswerID === answer.id}
                    onChange={handleCorrectAnswerChange}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Đáp án"
                    aria-label="Text input with radio button"
                    name={`ans${answer.id}`}
                    value={answer.text}
                    onChange={(event) => handleAnswerChange(event, answer.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="buttons">
            <button type="button" className="blob-btn" onClick={createQuestion}>
              Thêm
              <span className="blob-btn__inner">
                <span className="blob-btn__blobs">
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                </span>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
