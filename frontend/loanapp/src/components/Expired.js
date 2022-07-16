import React from "react";
import { useNavigate } from "react-router-dom";

function Expired() {
  const navigate = useNavigate();
  return (
    <div className="bg-blue-700 h-screen">
      <div className="flex justify-center items-center">
        <div className="h-52 w-96 my-40">
          <p className="text-4xl font-serif m-2">
            Your Session has expired! Please Login again
          </p>
          <button
            className="m-4 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => navigate("/")}
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}

export default Expired;
