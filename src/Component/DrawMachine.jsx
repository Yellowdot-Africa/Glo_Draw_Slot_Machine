import React, { useState, useEffect } from "react";
import Arrow from "../assets/Images/Arrow.png";
import BackgroundImage from "../assets/Images/Glo-sn-Img.png";
// import DrawImage from "../assets/Images/mobile1.png";
import "../Styles/DrawMachine.css";
// import axios from "axios";

const DrawMachine = () => {
  const [drawNumber, setDrawNumber] = useState("0000000000");
  const [rolling, setRolling] = useState(false);
  const [drawDate, setDrawDate] = useState("");
  const [preloadedNumber, setPreloadedNumber] = useState("0000000000");

  //   useEffect(() => {
  //     const preloadDrawnNumber = async () => {
  //       try {
  //         const response = await axios.get(
  //           "https://glodraw.ydplatform.com/api/winners/DrawnNumber"
  //         );
  //         const drawnNumber = response.data.drawnNumber;
  //         const drawDate = response.data.drawDate;

  //         setPreloadedNumber(drawnNumber === "00000" ? "00000" : drawnNumber);
  //         setDrawDate(drawDate);
  //       } catch (error) {
  //         console.error(error);
  //         setPreloadedNumber("00000");
  //       }
  //     };

  //     preloadDrawnNumber();
  //   }, []);

  const startDraw = () => {
    setRolling(true);
    const duration = 10000;
    const intervalSpeed = 100;
    const totalIntervals = duration / intervalSpeed;

    let counter = 0;

    const interval = setInterval(() => {
      if (counter < totalIntervals) {
        setDrawNumber(
          Math.floor(Math.random() * 10000000000)
            .toString()
            .padStart(10, "0")
        );
        counter++;
      } else {
        clearInterval(interval);
        setRolling(false);

        setDrawNumber(preloadedNumber);
      }
    }, intervalSpeed);
  };

  return (
    <>
      <div className="draw-container">
        <div className={`draw-machine ${rolling ? "rolling" : ""}`}>
          <div
            className="draw-image-container"
            style={{ backgroundImage: `url(${BackgroundImage})` }}
          >
            <div className="draw-overlay ">
              <h3 className="winning-num">The Lucky Winner Is</h3>
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
                disabled={rolling}
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
