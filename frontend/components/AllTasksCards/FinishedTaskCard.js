import formatDistance from "date-fns/formatDistance";

const FinishedTaskCard = ({ id, name, status, date, delay }) => {
  return (
    <li
      key={id}
      className="grid items-center grid-cols-5 p-5 border border-gray-200"
    >
      <div className="w-full col-span-5 mx-auto text-2xl text-center sm:text-xl josefin sm:text-left sm:col-span-2">
        <span>{name}</span>
        <div className="text-sm">{id}</div>
      </div>
      <div className="flex flex-col items-center justify-between col-span-5 mt-4 space-y-4 sm:mt-0 sm:space-y-0 sm:flex-row sm:col-span-3">
        <div className="flex flex-row items-center space-x-12 sm:space-x-0 sm:items-start sm:flex-col">
          <span className="text-base josefin">{delay} ms</span>
          <span className="text-md font-black inter">
            {formatDistance(new Date(date), Date.now(), {
              includeSeconds: true,
            })}{" "}
            ago
          </span>
        </div>
        {status == "completed" ? (
          <div className="flex items-center justify-center w-full px-2 py-2 text-white bg-green-500 sm:w-auto sm:px-6 sm:text-lg rounded-3xl">
            <svg
              className="w-4 h-4 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            {status}
          </div>
        ) : status == "failed" ? (
          <div className="flex items-center justify-center w-full px-2 py-2 text-white bg-red-500 sm:w-auto sm:px-6 sm:text-lg rounded-3xl">
            <div className="mr-3">X</div>
            <span>{status}</span>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full px-2 py-2 text-white bg-blue-500 sm:w-auto sm:px-6 sm:text-lg rounded-3xl">
            <div className="mr-3">X</div>
            <span>{status}</span>
          </div>
        )}
      </div>
    </li>
  );
};

export default FinishedTaskCard;
