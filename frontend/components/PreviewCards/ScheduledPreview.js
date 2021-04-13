const axios = require("axios");
import Router from "next/router";
import { useForm } from "react-hook-form";

const ScheduledPreview = ({ id, taskName, taskURL, status, delay }) => {
  const { register, handleSubmit } = useForm();

  const onCancel = () => {
    console.log("Cancelling ");
    console.log(id);
    const url = `http://localhost:5000/cancel`;
    axios
      .patch(url, {
        task_id: id,
      })
      .then((response) => {
        Router.push("/");
      })
      .catch((error) => {
        alert("An error occured");
        console.log(error);
      });
  };

  const onUpdate = (data, e) => {
    console.log("Updating ");
    console.log(data.delay);
    const url = `http://localhost:5000/modify`;
    axios
      .patch(url, {
        timeInMs: data.delay,
        taskURL: taskURL,
        task_id: id,
      })
      .then((response) => {
        Router.push("/");
      })
      .catch((error) => {
        alert("An error occured");
        console.log(error);
      });
  };

  const onError = (errors, e) => {
    console.log(errors, e);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-sm w-full sm:w-full lg:w-full py-6 px-3">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-4">
            <p className="uppercase tracking-wide text-sm font-bold text-gray-700">
              {id}
            </p>
            <p className="text-3xl text-gray-900">{taskName}</p>
            <p className="text-gray-700">{taskURL}</p>
          </div>
          <form id="updateForm" onSubmit={handleSubmit(onUpdate, onError)}>
            <div className="flex p-4 border-t border-gray-300 text-gray-700">
              <div className="flex-1 inline-flex items-center">
                <p>
                  <span className="text-gray-900 font-bold">Delay</span>:{" "}
                  {delay} ms
                  <input
                    ref={register({ required: true })}
                    type="text"
                    name="delay"
                    placeholder={delay}
                    className="px-3 py-3 mt-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </p>
              </div>
              {/* <div className="flex-1 inline-flex items-center">
              <p>
                <span className="text-gray-900 font-bold">2</span> Bathrooms
              </p>
            </div> */}
            </div>
            <button
              className="w-full h-20 flex items-center justify-center bg-blue-400 shadow-lg hover:bg-green-400"
              type="submit"
            >
              <div className="text-gray-600 text-md font-bold">Update Task</div>
            </button>
          </form>
          <button
            className="w-full h-20 flex items-center justify-center bg-gray-400 rounded-b-lg shadow-lg hover:bg-red-400"
            onClick={onCancel}
          >
            <div className="text-gray-600 text-md font-bold">Cancel Task</div>
          </button>
          {/* <div className="px-4 pt-3 pb-4 border-t border-gray-300 bg-gray-100">
            <div className="text-xs uppercase font-bold text-gray-600 tracking-wide">
              Realtor
            </div>
            <div className="flex items-center pt-2">
              <div className="bg-cover bg-center w-10 h-10 rounded-full mr-3"></div>
              <div>
                <p className="font-bold text-gray-900">Catherine Heffner</p>
                <p className="text-sm text-gray-700">(111) 111-1111</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ScheduledPreview;
