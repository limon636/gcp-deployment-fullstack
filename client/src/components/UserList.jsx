import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_API } from "../configs/data";

function UserList() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get(`${BASE_API}/users`)
      .then((resp) => {
        setData(resp.data);
      })
      .catch((e) => {
        console.log("error ", e);
      });
  };

  const deleteUser = (id) => {
    if (!confirm("Confirm Delete?")) {
      return false;
    }
    axios
      .delete(`${BASE_API}/users/${id}`)
      .then((resp) => {
        console.log("deleted");
        fetchData();
      })
      .catch((e) => {
        console.log("error ", e);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    data && (
      <>
        <div className="w-full p-4 text-center bg-white rounded-lg sm:p-8 dark:bg-gray-800 ">
          <div className="my-8">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                GCP Microservice
              </span>{" "}
              Example
            </h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              A Fullstack Application that will be deployed in Google Cloud.
            </p>
          </div>
          <div className="flex justify-center mt-4">
            <div className="w-1/2 text-right mr-1">
              <Link
                to={"/add"}
                className="bg-lime-700 font-semibold rounded-sm text-white px-4 py-2">
                Add New
              </Link>
            </div>
          </div>
          <div className="relative overflow-x-auto sm:rounded-lg mt-4 ">
            <div className="flex justify-center">
              <table className="w-1/2 text-sm text-left text-gray-500 dark:text-gray-400 border shadow-md rounded-lg table-collapse">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      First name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">Last Name</div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">Address</div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-right">
                      <p>Action</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((item, index) => (
                      <tr className="bg-white dark:bg-gray-800" key={index}>
                        <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {item.first_name}
                        </th>
                        <td className="px-6 py-4">{item.last_name}</td>
                        <td className="px-6 py-4">{item.address}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Link
                            to={"/edit/" + item.id}
                            className="text-xs h-6 bg-blue-600 hover:bg-blue-400 text-white p-2 rounded-sm">
                            Edit
                          </Link>
                          <button
                            onClick={() => {
                              deleteUser(item.id);
                            }}
                            className="text-xs bg-red-600 hover:bg-red-400 text-white p-2 rounded-sm">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default UserList;
