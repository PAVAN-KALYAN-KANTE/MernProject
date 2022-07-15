import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AdminDashboard() {
  const { data, setData } = useState({ loanData: [], loans: [], items: [] });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:1234/getLoans", {
        sessionId: localStorage.getItem("sessionId"),
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.isAuth === false) {
          navigate("/");
          localStorage.clear();
        } else {
          let response = res.data.content;
          setData({ ...data, loanData: response });

          data.loanData.forEach((element) => {
            data.loans.push(element.loans);
          });

          data.loans.forEach((element) => {
            element.forEach((item) => {
              data.items.push(item);
            });
          });
        }
      });
  }, []);

  const logOut = () => {};
  return (
    <div>
      <h1 className="text-danger">Admin Dashboard</h1>
      <div className="mb-3 mt-3">
        <button className="p-2 bg-primary text-white" onClick={logOut}>
          LOGOUT
        </button>
      </div>

      <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                loanId
              </th>
              <th scope="col" class="py-3 px-6">
                Amount
              </th>
              <th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Status
              </th>
              <th scope="col" class="py-3 px-6">
                Description
              </th>
              <th scope="col" class="py-3 px-6">
                Operation
              </th>
              <th scope="col" class="py-3 px-6">
                Operation
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Apple MacBook Pro 17"
              </th>
              <td class="py-4 px-6">Sliver</td>
              <td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">Laptop</td>
              <td class="py-4 px-6">$2999</td>
            </tr>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Microsoft Surface Pro
              </th>
              <td class="py-4 px-6">White</td>
              <td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">Laptop PC</td>
              <td class="py-4 px-6">$1999</td>
            </tr>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Magic Mouse 2
              </th>
              <td class="py-4 px-6">Black</td>
              <td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">Accessories</td>
              <td class="py-4 px-6">$99</td>
            </tr>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Google Pixel Phone
              </th>
              <td class="py-4 px-6">Gray</td>
              <td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">Phone</td>
              <td class="py-4 px-6">$799</td>
            </tr>
            <tr>
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                Apple Watch 5
              </th>
              <td class="py-4 px-6">Red</td>
              <td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">Wearables</td>
              <td class="py-4 px-6">$999</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
