import react from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div>Ładowanie...</div>
    </>
  );
};

export default Loading;
