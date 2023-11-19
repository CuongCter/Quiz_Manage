import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../const.api";
import './pages/Exams.css'
const Exam = () => {
  const { subjectKey } = useParams();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(`${API}/exams?subject=${subjectKey}`);
        const examsData = response.data;
        setExams(examsData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu bài thi:", error.message);
      }
    };

    fetchExams();
  }, [subjectKey]);
  const navigate = useNavigate();
  const handleExamClick = (exam) => {
    navigate(`/Test/${exam._id}`); // Chuyển hướng đến Exam với key của môn học
   
  };
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <button onClick={goBack} style={{borderRadius: "5px", padding: "5px 7px", backgroundColor: "yellow", margin: "5px"}}>
        Back
      </button>
      <h2>Danh sách bài thi:</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên bài thi</th>
              <th>Thời gian bắt đầu</th>
              <th>Thời gian kết thúc</th>
              <th>Tổng số câu hỏi</th>
              <th>Câu khó</th>
              <th>Câu bình thường</th>
              <th>Câu dễ</th>
              <th>Môn học</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam._id} onClick={() => handleExamClick(exam)}>
                <td>{exam._id}</td>
                <td>{exam.name}</td>
                <td>{exam.time_start}</td>
                <td>{exam.time_end}p</td>
                <td>{exam.total_question}</td>
                <td>{exam.difficult_question}</td>
                <td>{exam.normal_question}</td>
                <td>{exam.easy_question}</td>
                <td>{exam.subject}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Exam;
