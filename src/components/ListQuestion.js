import { useState, useEffect } from "react";
import { db } from "./data/firebbase-config";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "@firebase/firestore";
import { API } from "../const.api";
import axios from "axios";
import { toast } from "react-toastify";
// import { log } from "react-modal/lib/helpers/ariaAppHider";

export default function ListQuestion() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [deletePopupVisible, setDeletePopupVisible] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const questionsCollectionRef = collection(db, "Question");

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axios.get(`${API}/questions`);
        if (response.status >= 200 && response.status < 300) {
          setQuestions(response.data);
          console.log(response.data);
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getQuestions();
  }, []);

  const showDeletePopup = (questionId) => {
    setQuestionToDelete(questionId);
    setDeletePopupVisible(true);
  };

  const hideDeletePopup = () => {
    setQuestionToDelete(null);
    setDeletePopupVisible(false);
  };

  const handleDelete = async (questionId) => {
    try {
      await axios.delete(`${API}/questions/${questionId}`);

      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question._id !== questionId)
      );
      toast.success("Xóa thành công")
      hideDeletePopup();
    } catch (error) {
      console.error("Error:", error);
      toast.error(error)
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="ListQuestion">
      <button onClick={goBack} style={{borderRadius: "5px", padding: "5px 7px", backgroundColor: "yellow", margin: "5px"}}>
        Back
      </button>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Câu hỏi</th>
            <th style={{ textAlign: "center" }}>Đáp án</th>
            <th style={{ textAlign: "center" }}>Level</th>
            <th style={{ textAlign: "center" }}>CorrectID</th>
            <th style={{ textAlign: "center" }}>Môn học </th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question._id}>
              <td>{question.content}</td>
              <td>
                <ol align="left" >
                  {[1, 2, 3, 4].map((answerNumber) => (
                    <li key={answerNumber}>
                      {question.correct_answer === answerNumber ? (
                        <strong>{question[`answer${answerNumber}`]}</strong>
                      ) : (
                        question[`answer${answerNumber}`]
                      )}
                    </li>
                  ))}
                </ol>
              </td>
              <td>{question.level}</td>
              <td>{question.correct_answer}</td>
              <td>{question.subject}</td>
              <td>
                <button onClick={() => showDeletePopup(question._id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {deletePopupVisible && (
        <div className="confirm-popup">
          <p>Bạn có chắc chắn muốn xóa câu hỏi này?</p>
          <button onClick={() => handleDelete(questionToDelete)}>Xóa</button>
          <button className="cancel-button" onClick={hideDeletePopup}>
            Không
          </button>
        </div>
      )}
    </div>
  );
}
