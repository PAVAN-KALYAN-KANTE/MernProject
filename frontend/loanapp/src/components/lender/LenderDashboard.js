import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function LendorDashboard() {
  const myobj = { loanData: [], loans: [], items: [] };
  const { data, setData } = useState({ loanData: [], loans: [], items: [] });
  const [Items, setItems] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/getLoans", {
        sessionId: localStorage.getItem("sessionId"),
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.data.isAuth === false) {
          console.log("in useff");
          localStorage.clear();
          navigate("/");
        } else {
          let response = res.data.content;
          myobj.loanData = response;
          //  setData({ ...data, loanData: myobj.loanData });

          myobj.loanData.forEach((element) => {
            myobj.loans.push(element.loans);
          });

          // setData({ ...data, loans: myobj.loans });

          myobj.loans.forEach((element) => {
            element.forEach((item) => {
              myobj.items.push(item);
            });
          });
          console.log(myobj);
          setItems(myobj.items);
          console.log("items", Items);
          //  setData({ ...data, items: myobj.items });
        }
      });
  }, []);

  const approveLoan = (e) => {
    let myevent = e.taget.parentNode.parentNode;
    axios
      .post(
        "http://localhost:8000/approveLoan",
        {
          loanid: e.target.parentNode.parentNode.getAttribute("id"),
          sessionId: localStorage.getItem("sessionId"),
          amount: document
            .getElementById(e.target.parentNode.parentNode.getAttribute("id"))
            .getAttribute("amount"),
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.isAuth === false) {
          localStorage.clear();
          navigate("/");
        } else if (res.data.isApproved === true) {
          myobj.items.forEach((element) => {
            if (element.loanid === myevent.getAttribute("id")) {
              element.status = "approved";
            }
          });

          setData({
            ...data,
            loanData: myobj.loanData,
            loans: myobj.loans,
            items: myobj.items,
          });
        }
      });
  };

  const rejectLoan = (e) => {
    let myevent = e.taget.parentNode.parentNode;
    axios
      .post(
        "http://localhost:8000/rejectLoan",
        {
          loanid: e.target.parentNode.parentNode.getAttribute("id"),
          sessionId: localStorage.getItem("sessionId"),
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.isAuth === false) {
          localStorage.clear();
          navigate("/");
        } else if (res.data.isRejected === true) {
          myobj.items.forEach((element) => {
            if (element.loanid === myevent.getAttribute("id")) {
              element.status = "rejected";
            }
          });

          setData({
            ...data,
            loanData: myobj.loanData,
            loans: myobj.loans,
            items: myobj.items,
          });
        }
      });
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/");
    console.log("myobj", data.items);
  };

  return (
    <div>
      <h1 className="text-danger">Admin Dashboard</h1>
      <div className="mb-3 mt-3">
        <button className="p-2 bg-primary text-lg" onClick={logOut}>
          LOGOUT
        </button>
      </div>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                loanId
              </th>
              <th scope="col" className="py-3 px-6">
                Amount
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Status
              </th>
              <th scope="col" className="py-3 px-6">
                Description
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Operation
              </th>
              <th scope="col" className="py-3 px-6">
                Operation
              </th>
            </tr>
          </thead>
          <tbody>
            {myobj.items &&
              myobj.items.length > 0 &&
              myobj.items.map((data) => {
                console.log("table");
                return (
                  <tr
                    key={data._id}
                    amount={data.amount}
                    id={data.loanid}
                    className={
                      data.status === "rejected"
                        ? "bg-red-600"
                        : data.status === "approved"
                        ? "bg-green-500"
                        : "border-b border-gray-200 dark:border-gray-700"
                    }
                  >
                    <td className="py-4 px-6">{data.loanid}</td>
                    <td className="py-4 px-6" id={data.amount}>
                      {data.amount}
                    </td>
                    <td className="py-4 px-6">{data.status}</td>
                    <td className="py-4 px-6">{data.description}</td>
                    <td className="py-4 px-6">
                      <button
                        className="btn btn-success"
                        onClick={(e) => approveLoan(e)}
                        disabled={data.status === "pending" ? false : true}
                      >
                        approve
                      </button>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        className="btn btn-danger"
                        onClick={(e) => rejectLoan(e)}
                        disabled={data.status === "pending" ? false : true}
                      >
                        reject
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LendorDashboard;
