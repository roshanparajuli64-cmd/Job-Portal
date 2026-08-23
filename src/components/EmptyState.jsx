import React from "react";
import { useNavigate } from "react-router-dom";

export default function EmptyState({
  title,
  message,
  buttonText,
  buttonLink = "/jobs",
}) {
  const navigate = useNavigate();

  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        ♡
      </div>

      <h2>{title}</h2>

      <p>{message}</p>

      {buttonText && (
        <button
          type="button"
          onClick={() => navigate(buttonLink)}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}
