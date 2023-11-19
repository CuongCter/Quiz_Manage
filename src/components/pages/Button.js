import React from "react";
import "./Button.css";

export default function Button({ onClick }) {
  return (
    <div className="buttons">
      <button className="blob-btn" onClick={onClick}>
        Thêm Câu Hỏi
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
  );
}