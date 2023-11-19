import React from "react";

const CardView = ({ imageSrc, buttonText, onClick }) => {
  const handleClick = () => {
    if (typeof onClick === "function") {
      onClick();
    }
  };

  return (
    <div className="card">
      <img src={imageSrc} alt="Card" className="card-image" />
      <div className="buttons">
        <button className="blob-btn" onClick={handleClick}>
          {buttonText}
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
  );
};

export default CardView;