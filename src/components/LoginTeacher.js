import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { db } from "./data/firebbase-config";
import { collection, addDoc } from "@firebase/firestore";
import "./pages/Button.css";
import "./pages/Login.css";

export default function LoginTeacher() {
  const navigate = useNavigate();
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  
  function handleDashboard() {
    navigate('/Dashboard');
  }
  

  
  

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform login logic here
  };

  return (
    <div className="Login">
      <div className="container_login">
        <form onSubmit={handleSubmit}>
          <h3>ĐĂNG NHẬP</h3>

          
            <h2>Email:</h2>
            <input
              type="email"
              value={newEmail}
              onChange={handleEmailChange}
            />
          
          
            <h2>Mật khẩu:</h2>
            <input
              type="password"
              value={newPassword}
              onChange={handlePasswordChange}
            />
          
          <div className="buttons">
      <button className="blob-btn" onClick={handleDashboard}>
        Đăng nhập 
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