import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="items-center justify-between flex py-4 mb-1 w-12/12 p-3 z-50 absolute top-0 right-0">
      <div>
        <ul className="flex text-white">
          {/* <li className="ml-5 px-2 py-1">
            <a href="">Link</a>
          </li>
          <li className="ml-5 px-2 py-1">
            <a href="">Connect Us</a>
          </li>
          <li className="ml-5 px-2 py-1">
            <a href="">Skillset</a>
          </li> */}
          {/* <li className="ml-5 px-2 py-1">
            <a href="">Projects</a>
          </li> */}
          <li className="ml-5 px-3 py-1 rounded font-semibold bg-gray-100 text-gray-800">
            <button onClick={() => router.push("/newTask")}>Create New!</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
