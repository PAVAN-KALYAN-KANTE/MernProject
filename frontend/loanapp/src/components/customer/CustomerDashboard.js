import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CustomerDashboard() {
  const [userData, setUserData] = useState([]);
  var user = { p: [] };
  const [isData, setIsData] = useState(false);
  const navigate = useNavigate();
  const [hidden, setHide] = useState("hidden");
  const amount = useRef();
  const description = useRef();
  const [isloaded, setLoad] = useState(false);
  var info = [];

  useEffect(() => {
    console.log("useEff", localStorage.getItem("sessionId"));
    axios
      .post("http://localhost:8000/newLoan", {
        email: localStorage.getItem("email"),
        sessionId: localStorage.getItem("sessionId"),
        // sessionId: "uRPaIMuB_fS_OI1V3qIrd4Nf5_hWyq_e",
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.data.isAuth === false) {
          localStorage.clear();
          navigate("/expired");
        } else {
          var response = res.data.data;
          console.log("response", response);
          user.p = response;
          setUserData(response);
          setLoad(true);
          console.log("user", userData);
        }
      });
  }, []);

  const requestNewLoan = () => {
    if (amount.current.value && description.current.value) {
      axios
        .post(
          "http://localhost:8000/reqNewLoan",
          {
            email: localStorage.getItem("email"),
            amount: amount.current.value,
            description: description.current.value,
            sessionId: localStorage.getItem("sessionId"),
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log("req", res);
          if (res.data.isAuth === false) {
            localStorage.clear();
            navigate("/expired");
          } else if (res.data.isAdded === true) {
            let loanObject = res.data.loanObject;
            console.log("loanObject", loanObject);
            info = userData;
            info[0].loans.push(loanObject);
            setUserData(info);
          } else {
            alert("oops !loan could not be added");
          }
        });
    } else {
      alert("kindly fill all the credentials properly..");
    }
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="bg-black h-screen">
      <h1 className="text-4xl text-center text-red-700">Customer Dashboard</h1>

      <div className="flex justify-end">
        <button
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => logOut()}
        >
          LOGOUT
        </button>
      </div>

      <div>
        {isloaded && (
          <h1 className="text-4xl text-center font-mono text-cyan-500">
            Wallet:{userData[0].vallet}
          </h1>
        )}
      </div>
      <div className="flex justify-center">
        <button
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-5"
          data-modal-toggle="authentication-modal"
          onClick={() => setHide(hidden === "hidden" ? "visible" : "hidden")}
        >
          Register New Loan
        </button>

        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className={` ${hidden} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`}
        >
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-toggle="authentication-modal"
                onClick={() =>
                  setHide(hidden === "hidden" ? "visible" : "hidden")
                }
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="py-6 px-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Register New Loan
                </h3>
                <form className="space-y-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Amount
                    </label>
                    <input
                      type="text"
                      ref={amount}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Amount"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Description
                    </label>
                    <input
                      type="text"
                      ref={description}
                      placeholder="Description"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>

                  <button
                    onClick={() => requestNewLoan()}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="py-5 px-6 bg-gray-50 dark:bg-gray-800 border-2 border-blue-500"
                >
                  Loan
                </th>
                <th scope="col" className="py-6 px-6 border-2 border-blue-500">
                  Amount
                </th>
                <th
                  scope="col"
                  className="py-5 px-6 bg-gray-50 dark:bg-gray-800 border-2 border-blue-500"
                >
                  Description
                </th>
                <th scope="col" className="py-6 px-6 border-2 border-blue-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {console.log("map", userData[0])}
              {isloaded && localStorage.getItem("sessionId")
                ? userData[0].loans.map((data, id) => {
                    return (
                      <tr
                        key={id}
                        className={
                          data.status === "rejected"
                            ? "bg-red-900"
                            : data.status === "approved"
                            ? "bg-green-900"
                            : "border-b border-gray-200 dark:border-gray-700"
                        }
                      >
                        <td className="py-6 px-6 border-2 border-blue-500">
                          {data.loanid}
                        </td>
                        <td className="py-6 px-6 border-2 border-blue-500">
                          {data.amount}
                        </td>
                        <td className="py-6 px-6 border-2 border-blue-500">
                          {data.description}
                        </td>
                        <td className="py-6 px-6 border-2 border-blue-500">
                          {data.status}
                        </td>
                      </tr>
                    );
                  })
                : navigate("/")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
