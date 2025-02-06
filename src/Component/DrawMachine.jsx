import React, { useState } from "react";
import Arrow from "../assets/Images/Arrow.png";
import BackgroundImage from "../assets/Images/slotimg.png";
// import BackgroundImage from "../assets/Images/Glo-sn-Img.png";
import "../Styles/DrawMachine.css";
import axios from "axios";

const DrawMachine = () => {
  const [drawNumber, setDrawNumber] = useState("0000000000000");
  const [rolling, setRolling] = useState(false);
  const [message, setMessage] = useState("Click 'LET'S ROLL' to start");
  const [loading, setLoading] = useState(false);

  const startDraw = () => {
    setRolling(true);
    setMessage("Rolling...");

    const duration = 10000;
    const intervalSpeed = 100;
    const totalIntervals = duration / intervalSpeed;

    let counter = 0;

    const interval = setInterval(() => {
      if (counter < totalIntervals) {
        setDrawNumber(
          Math.floor(Math.random() * 10000000000000)
            .toString()
            .padStart(13, "0")
        );
        counter++;
      } else {
        clearInterval(interval);
        fetchLuckyNumber();
      }
    }, intervalSpeed);
  };

  const fetchLuckyNumber = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://slotmachine.ydaplatform.com/api/v1/slotmachine/msisdn"
      );

      if (response.data.msisdn) {
        setMessage("The Lucky Winner Is:");
        setDrawNumber(response.data.msisdn);
      } else {
        setMessage(response.data.message || "No winner");
        setDrawNumber("0000000000000");
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setMessage(error.response.data.message || "No winner found");
      } else {
        setMessage("An error occurred. Please try again later.");
      }
      console.error("API Error:", error);
      setDrawNumber("0000000000000");
    } finally {
      setRolling(false);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="draw-container">
        <div className={`draw-machine ${rolling ? "rolling" : ""}`}>
          <div
            className="draw-image-container"
            style={{ backgroundImage: `url(${BackgroundImage})` }}
          >
            <div className="draw-overlay">
              <h3 className="winning-num">
                {loading ? "Loading..." : message}
              </h3>
              <div className="draw-number-card">
                {drawNumber.split("").map((digit, index) => (
                  <div key={index} className="draw-number-button">
                    <span className="draw-number">{digit}</span>
                  </div>
                ))}
              </div>

              <button
                className="draw-button"
                onClick={startDraw}
                disabled={rolling || loading}
              >
                {rolling ? "LET'S GO..." : "LET'S ROLL"}
                <img className="arrow-img" src={Arrow} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrawMachine;
