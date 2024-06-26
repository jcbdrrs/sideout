// eslint-disable-next-line no-unused-vars
import React from 'react';
import "./splash.css";
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

export const SplashPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="splash-container">
        <div className="splash-image-container">
          <img
            src={"src/assets/sideout! logo.png"}
            alt="Sideout Logo"
            className="centered-image"
            onClick={() => navigate("/login")}
          />
          <div>
          <h2 onClick={() => navigate("/login")}>SEE YOU ON THE COURT</h2>
          </div>
        </div>
      </div>
    </>
  );
};
