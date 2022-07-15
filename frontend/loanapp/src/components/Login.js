import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    if (email === null || password === null) {
      alert("Please enter all details");
    } else {
      axios
        .post("http://localhost:1234/login", {
          email: email,
          password: password,
          role: role,
        })
        .then((res) => {
          console.log(res);
          var response = res.data;
          if (res.data.isUserAdded === true) {
            document.getElementById("hidden").setAttribute("id", "show");
          } else if (
            response.content[0] &&
            response.content[0].role === "admin"
          ) {
            localStorage.sessionId = response.sessionID;
            localStorage.email = response.content[0].email;
            navigate("/admin/dashboard");
          } else if (
            response.content[0] &&
            response.content[0].role === "customer"
          ) {
            console.log("response.sessionId", response.sessionID);
            console.log("inside cusstomer if login");
            localStorage.sessionId = response.sessionID;
            localStorage.email = response.content[0].email;
            navigate("/customer/dashboard");
          } else if (
            response.content[0] &&
            response.content[0].role === "lender"
          ) {
            console.log("response.sessionId", response.sessionID);
            console.log("inside lender if login");
            localStorage.sessionId = response.sessionID;
            localStorage.email = response.content[0].email;
            navigate("/lender/dashboard");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <h1 className="text-center text-5xl m-3 font-serif">Please Login</h1>
      <div className="flex items-center justify-center flex-col">
        <div className="w-full max-w-xs m-12">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Email"
                onChange={handleEmail}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="******************"
                onChange={handlePassword}
              />
              <p className="text-red-500 text-xs italic">
                Please choose a password.
              </p>
            </div>
            <div class="inline-block relative w-64 my-6">
              <select
                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                value={role}
                onChange={handleRoleChange}
              >
                <option value="admin">Admin</option>
                <option value="lender">Lender</option>
                <option value="customer">Customer</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSubmit}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
        <div className="bg-red-600 text-red-200 mt-4" id="hidden">
          We couldnt find you so you were registered...Login again to continue !
        </div>
      </div>
    </>
  );
}

export default Login;
