import Link from "next/link";

const RemainingTask = ({ name, status, id, delay, date, url }) => {
  return (
    <Link href={`/tasks/${id}`}>
      <tr className="cursor-pointer hover:bg-gray-200">
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
          {name}
        </th>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {id}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {status}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
          {delay}
        </td>
      </tr>
    </Link>
  );
};

export default RemainingTask;
