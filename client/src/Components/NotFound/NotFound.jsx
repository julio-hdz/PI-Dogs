import React from "react";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();
  function handleClick(e) {
    e.preventDefault();
    navigate("/home");
  }
  return (
    <div className="homepage">
      <h1>UPS, PAGE DOESN'T EXIST</h1>
      <button onClick={handleClick}>Back</button>
    </div>
  );
}
