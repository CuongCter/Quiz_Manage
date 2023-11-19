import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./pages/ListQuestion.css";
import { API } from "../const.api";

export default function ListExam() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();
  const [examToDelete, setExamToDelete] = useState(null);
  useEffect(() => {
    const getExams = async () => {
      try {
        const response = await axios.get(`${API}/exams`);
        setExams(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu bài thi:", error.message);
      }
    };

    getExams();
  }, []);

  const formatTime = (time) => {
    if (time && time.seconds) {
      const date = new Date(time.seconds * 1000);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      return `${year}-${month}-${day}`;
    }
    return "";
  };

  const formatAPIStartTime = (time) => {
    const date = new Date(time);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    return formattedDate;
  };

  const handleDeleteClick = (examId) => {
    setExamToDelete(examId);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${API}/exams/${examToDelete}`);
      // Xóa đề thi khỏi danh sách sau khi xóa thành công
      setExams((prevExams) =>
        prevExams.filter((exam) => exam._id !== examToDelete)
      );
      // Đặt lại examToDelete để tránh hiển thị popup xác nhận khi không cần
      setExamToDelete(null);
      // Hiển thị thông báo hoặc cập nhật UI khác nếu cần
      // ...
    } catch (error) {
      console.error("Lỗi khi xóa đề thi:", error.message);
      // Xử lý lỗi, hiển thị thông báo hoặc cập nhật UI khác nếu cần
      // ...
    }
  };
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="ListQuestion">
      <button
        onClick={goBack}
        style={{
          borderRadius: "5px",
          padding: "5px 7px",
          backgroundColor: "yellow",
          margin: "5px",
        }}
      >
        Back
      </button>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Tên đề thi</th>
            <th style={{ textAlign: "center" }}>Ngày thi</th>
            <th style={{ textAlign: "center" }}>Môn thi</th>
            <th style={{ textAlign: "center" }}>Thời lượng</th>
            <th style={{ textAlign: "center" }}>Tổng số câu hỏi</th>
            <th style={{ textAlign: "center" }}>Dễ</th>
            <th style={{ textAlign: "center" }}>Bình thường</th>
            <th style={{ textAlign: "center" }}>Khó</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam._id}>
              <td>{exam.name}</td>
              <td>{formatAPIStartTime(exam.time_start)}</td>
              <td>{exam.subject}</td>
              <td>{exam.time_end}p</td>
              <td>{exam.total_question}</td>
              <td>{exam.easy_question}</td>
              <td>{exam.normal_question}</td>
              <td>{exam.difficult_question}</td>
              <td>
                <button onClick={() => handleDeleteClick(exam._id)}>Xóa</button>
                {examToDelete === exam._id && (
                  <div className="delete-confirmation">
                    <p>Bạn có chắc chắn muốn xóa đề thi này?</p>
                    <button onClick={handleConfirmDelete}>Đồng ý</button>
                    <button onClick={() => setExamToDelete(null)}>Hủy</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
