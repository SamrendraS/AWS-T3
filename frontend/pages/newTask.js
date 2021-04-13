import { useForm } from "react-hook-form";

import Router from "next/router";
const axios = require("axios");

const onSubmit = (data, e) => {
  if (data.name && data.url && data.delay) {
    const url = "http://localhost:5000/schedule";
    console.log(data);
    axios
      .post(url, {
        taskName: data.name,
        taskURL: data.url,
        timeInMs: data.delay,
      })
      .then((response) => {
        e.target.reset(); // reset after form submit
        Router.push("/");
      })
      .catch((error) => {
        alert("An error occured");
        // console.log(error);
      });
  }
};

const onError = (errors, e) => {
  console.log(errors, e);
};

const newTask = () => {
  const { register, handleSubmit, required } = useForm();

  return (
    <div className="flex items-center min-h-screen">
      <div className="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-sm container mx-auto">
        <div className="text-center">
          <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
            Create a New Task!
          </h1>
          <p className="text-gray-400 dark:text-gray-400">
            Fill up the form below to schedule a new task.
          </p>
        </div>
        <div className="m-7">
          <form id="form" onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="mb-6">
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                Task Name
              </label>
              <input
                ref={register({ required: true })}
                name="name"
                type="text"
                placeholder="Task 1"
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                Task Delay (ms)
              </label>
              <input
                ref={register({ required: true })}
                name="delay"
                type="text"
                placeholder="200 ms"
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                Task URL
              </label>

              <textarea
                rows="2"
                ref={register({ required: true })}
                name="url"
                type="text"
                placeholder="https://a6ilch6fb5.execute-api.ap-south-1.amazonaws.com/default/trial"
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                required
              ></textarea>
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
              >
                Schedule Task
              </button>
            </div>
            <p className="text-base text-center text-gray-400" id="result"></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default newTask;
