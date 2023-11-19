import React from "react";
import { useNavigate } from "react-router-dom";
import CardView from "./CardView";
import "./pages/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    navigate("/AddQuestion");
  };

  const handleListQuestion = () => {
    navigate("/ListQuestion");
  };

  const handleAddExam = () => {
    navigate("/AddExam");
  };

  const handleListExams = () => {
    navigate("/ListExam");
  };

  const handleResults= () => {
    navigate("/Results");
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <div className="home-page">
      <div className="header">
        <h1>Các tính năng cho giảng viên</h1>

        <div className="buttons">
          <button className="blob-btn" onClick={handleLogin}>
            Đăng Xuất
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
      </div>
      <h2>Quản lý câu hỏi</h2>

      <div className="card-container">
        <CardView
          imageSrc="https://img.freepik.com/premium-psd/add-new-3d-icon-transparent-background-3d-symbol-sign-modern-minimalist_510654-617.jpg"
          buttonText="Thêm Câu Hỏi"
          onClick={handleAddQuestion}
        />
        <CardView
          imageSrc="https://img.freepik.com/premium-psd/question-mark-3d-icon_565634-405.jpg"
          buttonText="Danh Sách Câu Hỏi"
          onClick={handleListQuestion}
        />
      </div>
      <h2>Quản lý đề thi</h2>
      <div className="card-container">
        <CardView
          imageSrc="https://img.freepik.com/premium-psd/add-new-3d-icon-transparent-background-3d-symbol-sign-modern-minimalist_510654-617.jpg"
          buttonText="Thêm Đề Thi"
          onClick={handleAddExam}
        />
        <CardView
          imageSrc="https://img.freepik.com/premium-psd/exam-result-3d-icon-illustrations_753728-430.jpg"
          buttonText="Danh Sách Đề Thi"
          onClick={handleListExams}
        />
      </div>
      <h2>Thống kê điểm số</h2>
      <div className="card-container">
        <CardView
          imageSrc="https://img.freepik.com/premium-psd/report-3d-render-illustration-premium-psd_418302-948.jpg"
          buttonText="Thống kê Điểm"
          onClick={handleResults}
        />
      </div>
    </div>
  );
};

export default Dashboard;
