import Link from "next/link";

const CompletedTask = ({ name, id, status }) => {
  return (
    <Link href={`/completedTasks/${id}`}>
      <tr className="cursor-pointer hover:bg-gray-200">
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
          {name}
        </th>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {id}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <div className="flex items-center">
            <span className="mr-2">{status}</span>
          </div>
        </td>
      </tr>
    </Link>
  );
};

export default CompletedTask;
