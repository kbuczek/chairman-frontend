import react from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div>Ładowanie...</div>
    </div>
  );
};

export default Loading;
