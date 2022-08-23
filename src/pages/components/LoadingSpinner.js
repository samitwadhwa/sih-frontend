import React from "react";
import "./spinner.css";

export default function LoadingSpinner({ style = {}, h }) {
  return (
    <div className="spinner-container" style={{ ...style, height: h }}>
      <div className="loading-spinner">
      </div>
    </div>
  );
}