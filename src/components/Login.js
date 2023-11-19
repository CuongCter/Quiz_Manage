import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div >
      <div className="containerLogin">
        <form>
          <h3>HOME PAGE</h3>
          <div className="button-container">
            <div className="buttons">
              <Link to="/LoginStudent" className="blob-btn">
                SINH VIÊN
                <span className="blob-btn__inner">
                  <span className="blob-btn__blobs">
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                  </span>
                </span>
              </Link>
            </div>
            <div className="buttons">
              <Link to="/LoginTeacher" className="blob-btn">
                GIẢNG VIÊN
                <span className="blob-btn__inner">
                  <span className="blob-btn__blobs">
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
