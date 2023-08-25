import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BASE_API } from "../configs/data";

const formFields = { first_name: "", last_name: "", address: "" };

const UserForm = () => {
  const { id } = useParams();
  const [data, setData] = useState(formFields);
  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get(`${BASE_API}/users/${id}`)
      .then((resp) => {
        setData(resp.data);
      })
      .catch((e) => {
        console.log("error ", e);
      });
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_API}/users`, data)
      .then((resp) => {
        navigate("/");
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  return (
    <>
      <div className="container m-10">
        <Link to="/">Back to home</Link>
        <form onSubmit={handleSubmit} className="flex justify-center">
          <div className="pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can store.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first_name"
                    onChange={handleChange}
                    value={data.first_name}
                    id="txt_first_name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last_name"
                    onChange={handleChange}
                    value={data.last_name}
                    id="txt_last_name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="address"
                    onChange={handleChange}
                    value={data.address}
                    id="txt_address"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <button className="bg-green-600 text-white font-samibold px-2 py-2 rounded-md w-full">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserForm;
