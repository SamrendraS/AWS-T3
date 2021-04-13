import React from "react";

// components
import CardLineChart from "../components/Cards/CardLineChart.js";
import CardBarChart from "../components/Cards/CardBarChart.js";

import PropagateLoader from "react-spinners/PropagateLoader";

import { useGetPosts } from "../useRequest";
import ScheduledTable from "../components/DashboardCards/ScheduledTable";
import CompletedTable from "../components/DashboardCards/CompletedTable";

// layout for page
export default function Home() {
  const { posts, error } = useGetPosts("tasks");
  if (error)
    return (
      <div className="flex flex-wrap w-full flex-col items-center h-full mt-20">
        Something went wrong!
      </div>
    );
  if (!posts)
    return (
      <div className="flex flex-wrap w-full flex-col items-center h-full mt-20">
        <PropagateLoader color="teal" size="20px" />
      </div>
    );

  return (
    <div className="m-5 md:m-10">
      <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
        <h1 className=" title-font mb-2 text-4xl font-extrabold leading-10 tracking-tight text-left sm:text-5xl sm:leading-none md:text-6xl">
          {" "}
          Welcome Back,
        </h1>
        <h1 className=" title-font mb-2 text-4xl font-extrabold leading-10 tracking-tight text-left sm:text-5xl sm:leading-none md:text-6xl">
          SAMRENDRA!
        </h1>
        <p className="lg:w-1/2 w-full leading-relaxed text-lg">
          Use this Dashboard to oversee all your tasks.
        </p>
      </div>
      {/* <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div> */}
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-7/12 mb-12 xl:mb-0 px-4">
          {console.log(posts)}
          <ScheduledTable
            tasks={posts.filter(function (el) {
              return (
                el.status == "scheduled" ||
                el.status == "running" ||
                el.status == "modified"
              );
            })}
          />
        </div>
        <div className="w-full xl:w-5/12 px-4">
          <CompletedTable
            tasks={posts.filter(function (el) {
              return (
                el.status != "scheduled" &&
                el.status != "running" &&
                el.status != "modified"
              );
            })}
          />
        </div>
      </div>
    </div>
  );
}
