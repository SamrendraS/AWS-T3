import formatDistance from "date-fns/formatDistance";
import Link from "next/link";

const TaskCard = ({ id, delay, name, url, status, date }) => {
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
        <span className="px-2 py-2 text-black bg-yellow-200 sm:px-6 sm:text-lg rounded-3xl">
          {status}
        </span>
        <div className="flex flex-row items-center space-x-12 sm:space-x-0 sm:items-start sm:flex-col">
          <span className="text-base josefin">{delay}ms</span>
          <span className="text-mda font-black inter">
            {formatDistance(new Date(date), Date.now(), {
              includeSeconds: true,
            })}
          </span>
        </div>
        <Link href={`/tasks/${id}`}>
          <div className="flex items-center justify-center w-full px-2 py-2 text-white bg-blue-500 sm:w-auto sm:px-6 sm:text-lg rounded-3xl hover:bg-gray-900">
            Modify
          </div>
        </Link>
      </div>
    </li>
  );
};

export default TaskCard;
