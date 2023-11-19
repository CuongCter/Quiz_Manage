import React, { useState, useEffect } from "react";
import axios from "axios";
import "./pages/Results.css"; // Tạo một file CSS riêng để quản lý các quy tắc kiểu

const ResultsTable = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://thi.gorokiapp.com/api/results");
        setResults(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="results-container">
      <h1>Danh Sách Kết Quả</h1>
      <div className="table-container">
        <table className="results-table">
          <thead>
            <tr>
              <th>Họ và Tên</th>
              <th>Số Câu Đúng/Tổng</th>
              <th>Tên Đề Thi</th>
              <th>Ngày Thi</th>
              <th>Thời Gian Làm Bài</th>
              <th>Câu Khó</th>
              <th>Câu Bình Thường</th>
              <th>Câu Dễ</th>
              <th>Môn Học</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result._id}>
                <td>{result.full_name}</td>
                <td>{result.number_correct_answer} / {result.exam.total_question}</td>
                <td>{result.exam.name}</td>
                <td>{result.exam.time_start}</td>
                <td>{result.exam.time_end} phút</td>
                <td>{result.exam.difficult_question}</td>
                <td>{result.exam.normal_question}</td>
                <td>{result.exam.easy_question}</td>
                <td>{result.exam.subject}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
