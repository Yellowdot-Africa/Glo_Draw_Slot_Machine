// import React from "react";
// import BackgroundImg from "../assets/Images/Glo-Sn-Img.png";
// import DrawMachine from "../Component/DrawMachine";

// const LandingPage = () => {
//   return (
//     <>
//       <div className="w-full h-screen min-h-[700px]">
//         <img src={BackgroundImg} alt="bg-img" className="w-full h-screen" />
//         <div className="mx-auto">
//           <DrawMachine />
//         </div>
//       </div>
//     </>
//   );
// };

// export default LandingPage;










// import React, { useState, useEffect } from "react";
// import Arrow from "../assets/Images/Arrow.png";
// import BackgroundImage from "../assets/Images/Glo-sn-Img.png";
// import "../Styles/DrawMachine.css";
// import axios from "axios";

// const DrawMachine = () => {
//   const [drawNumber, setDrawNumber] = useState("0000000000");
//   const [rolling, setRolling] = useState(false);
//   const [message, setMessage] = useState("Fetching data...");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           "http://69.197.174.35:3005/api/v1/slotmachine/msisdn"
//         );
//         if (response.data.msisdn) {
//           setMessage("The Lucky Winner Is");
//           setDrawNumber(response.data.msisdn);
//         } else {
//           setMessage(response.data.message || "No phone numbers available");
//           setDrawNumber("0000000000");
//         }
//       } catch (error) {
//         if (error.response?.status === 404) {
//           setMessage(error.response.data.message || "No phone numbers available");
//         } else {
//           setMessage("An error occurred. Please try again later.");
//         }
//         setDrawNumber("0000000000");
//         console.error("API Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const startDraw = () => {
//     setRolling(true);
//     setMessage("Loading..."); // Show loading message during the draw
//     const duration = 10000;
//     const intervalSpeed = 100;
//     const totalIntervals = duration / intervalSpeed;

//     let counter = 0;

//     const interval = setInterval(() => {
//       if (counter < totalIntervals) {
//         setDrawNumber(
//           Math.floor(Math.random() * 10000000000)
//             .toString()
//             .padStart(10, "0")
//         );
//         counter++;
//       } else {
//         clearInterval(interval);
//         setRolling(false);
//         setMessage("The Lucky Winner Is"); // Restore final message
//       }
//     }, intervalSpeed);
//   };

//   return (
//     <div className="draw-container">
//       <div className={`draw-machine ${rolling ? "rolling" : ""}`}>
//         <div
//           className="draw-image-container"
//           style={{ backgroundImage: `url(${BackgroundImage})` }}
//         >
//           <div className="draw-overlay">
//             <h3 className="winning-num">
//               {loading ? "Loading..." : message} {/* Show loading state */}
//             </h3>
//             <div className="draw-number-card">
//               {drawNumber.split("").map((digit, index) => (
//                 <div key={index} className="draw-number-button">
//                   <span className="draw-number">{digit}</span>
//                 </div>
//               ))}
//             </div>

//             <button
//               className="draw-button"
//               onClick={startDraw}
//               disabled={rolling || loading} // Disable button during loading or rolling
//             >
//               {rolling ? "LET'S GO..." : "LET'S ROLL"}
//               <img className="arrow-img" src={Arrow} alt="" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DrawMachine;
