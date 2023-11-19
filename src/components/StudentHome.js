import React, { useEffect, useState } from "react";
import "./pages/StudentHome.css";
import { useNavigate } from "react-router-dom";
const StudentHome = () => {
  const subjects = [
    {
      id: 1,
      name: "Lập Trình Web",
      key: "ltw",
      img: "https://vtiacademy.edu.vn/upload/images/lap-trinh-web.jpg",
    },
    {
      id: 2,
      name: "Cơ sở dữ liệu",
      key: "csdl",
      img: "https://images.fpt.shop/unsafe/filters:quality(5)/fptshop.com.vn/uploads/images/tin-tuc/151986/Originals/phan-mem-quan-ly-co-so-du-lieu%20(2).jpg",
    },
    {
      id: 3,
      name: "Cấu trúc dữ liệu và giải thuật",
      key: "ctdlvgt",
      img: "https://codelearn.io/Upload/Blog/lo-trinh-hoc-cau-truc-du-lieu-va-giai-thuat-phan-1-63723122442.7031.jpg",
    },
    {
      id: 4,
      name: "Công nghệ phần mềm",
      key: "cnpm",
      img: "https://admin.mit.vn/Uploads/images/banner-cong-nghe-phan-mem.png",
    },
    {
      id: 5,
      name: "Kỹ thuật lập trình",
      key: "ktlt",
      img: "https://www.shutterstock.com/image-vector/programming-code-coding-hacker-background-260nw-1714491562.jpg",
    },
  ];

  const navigate = useNavigate();

  const handleSubjectClick = (subject) => {
    navigate(`/Exams/${subject.key}`); // Chuyển hướng đến Exam với key của môn học
   
  };

  const handleSignOut = () =>{
    navigate(`/`)
  }
  return (
    <>
    <h2>Chọn môn thi:</h2>
    <button onClick={handleSignOut} style={{height:"32px", width: "120px", borderRadius:"10px",  position: "absolute", top:"20px" , right: "80px",height: "30px", margin: "5px"}}>Đăng Xuất</button>
    <div className="subject-container">
      {subjects.map((subject) => (
        <div key={subject.id} className="subject-item">
          <img
            src={subject.img}
            alt={subject.name}
            className="choonse-image"
            onClick={() => handleSubjectClick(subject)}
          />
          <p className="subject-name">{subject.name}</p>
        </div>
      ))}
  
    </div>
    
  </>
  );
};

export default StudentHome;
