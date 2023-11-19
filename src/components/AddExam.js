import React, { useState } from "react";
import { db } from "./data/firebbase-config";
import { collection, addDoc } from "@firebase/firestore";
import axios from "axios";
import DatePicker from "react-datepicker";
import "./pages/Button.css";
import "./pages/AddQuestion.css";
import { API } from "../const.api";
import { toast } from "react-toastify";

export default function AddExam() {
  const [newNameExam, setNewNameExam] = useState("");
  const [newDateExam, setNewDateExam] = useState("");
  const [newTimeStart, setNewTimeStart] = useState(new Date());
  const [newNumQuestions, setNewNumQuestions] = useState(0);
  const [newSubjectID, setNewSubjectID] = useState("");
  const [newNumDifficult, setNewNumDifficult] = useState(0);
  const [newNumNormal, setNewNumNormal] = useState(0);
  const [newNumEasy, setNewNumEasy] = useState(0);
  const [newTimeEnd, setNewTimeEnd] = useState("");

  const handleSelectChangeSubject = (event) => {
    setNewSubjectID(event.target.value);
  };

  const examCollectionRef = collection(db, "Exams");

  const createExam = async () => {
    try {
      const response = await axios.post(`${API}/exams`, {
        name: newNameExam,
        time_start: newTimeStart.toISOString(),
        time_end: newTimeEnd,
        total_question: newNumQuestions,
        difficult_question: newNumDifficult,
        normal_question: newNumNormal,
        easy_question: newNumEasy,
        subject: newSubjectID,
      });

      toast.success("Thêm đề thi thành công");
      console.log("Đã thêm đề thi thành công:", response.data);

      // Đặt lại giá trị các trường về giá trị ban đầu sau khi thêm đề thi thành công
      resetForm();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      // console.error('Lỗi khi thêm đề thi:', error.message);
    }
  };

  // Hàm để đặt lại giá trị các trường về giá trị ban đầu
  const resetForm = () => {
    setNewNameExam("");
    setNewDateExam("");
    setNewTimeStart(new Date());
    setNewNumQuestions(0);
    setNewSubjectID("");
    setNewNumDifficult(0);
    setNewNumNormal(0);
    setNewNumEasy(0);
    setNewTimeEnd("");
  };

  return (
    <div className="AddExam">
      <div className="container">
        <form>
          <h3>THÊM ĐỀ THI</h3>
          <h2>Tên đề thi:</h2>
          <input
            placeholder="Question"
            value={newNameExam}
            onChange={(event) => setNewNameExam(event.target.value)}
          />

          <h2>Chọn ngày thi: {newDateExam}</h2>
          <input
            type="date"
            onChange={(event) => setNewDateExam(event.target.value)}
          />

          <h2>Thời gian:</h2>
          <div className="datepicker-container">
            <div className="datepicker-wrapper">
              <DatePicker
                selected={newTimeStart}
                onChange={(date) => setNewTimeStart(date)}
                shouldCloseOnSelect={false}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="h:mm aa"
              />
            </div>
            <div className="datepicker-wrapper">
              <input
                type="text"
                placeholder="Nhập thời lượng"
                value={newTimeEnd}
                onChange={(event) => setNewTimeEnd(event.target.value)}
              />
            </div>
          </div>

          <h2>Tổng số câu:</h2>
          <input
            type="number"
            placeholder="Nhập..."
            value={newNumQuestions}
            onChange={(event) => setNewNumQuestions(Number(event.target.value))}
          />
          <select value={newSubjectID} onChange={handleSelectChangeSubject}>
            <option value="">Môn học</option>
            <option value="csdl">Cơ Sở Dữ Liệu</option>
            <option value="ktlt">Kỹ Thuật Lập Trình</option>
            <option value="ctdlvgt">Cấu Trúc Dữ Liệu Và Giải Thuật</option>
            <option value="cnpm">Công Nghệ Phần Mềm</option>
            <option value="ltw">Lập Trình Web</option>
          </select>

          <h2>Số câu dễ:</h2>
          <input
            type="number"
            placeholder="Nhập..."
            value={newNumEasy}
            onChange={(event) => setNewNumEasy(Number(event.target.value))}
          />
          <h2>Số câu bình thường:</h2>
          <input
            type="number"
            placeholder="Nhập..."
            value={newNumNormal}
            onChange={(event) => setNewNumNormal(Number(event.target.value))}
          />
          <h2>Số câu khó:</h2>
          <input
            type="number"
            placeholder="Nhập..."
            value={newNumDifficult}
            onChange={(event) => setNewNumDifficult(Number(event.target.value))}
          />

          <div className="buttons">
            <button type="button" className="blob-btn" onClick={createExam}>
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
