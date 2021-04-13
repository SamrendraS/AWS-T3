import FinishedTaskCard from "../components/AllTasksCards/FinishedTaskCard";
import ScheduledTaskCard from "../components/AllTasksCards/ScheduledTaskCard";
import PropagateLoader from "react-spinners/PropagateLoader";

import { useGetPosts } from "../useRequest";

const taskList = () => {
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
    <section className="container max-w-4xl py-20 mx-auto space-y-20 ">
      <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
        <h1 className=" title-font mb-2 text-4xl font-extrabold leading-10 tracking-tight text-left sm:text-5xl sm:leading-none md:text-6xl">
          {" "}
          All Tasks
        </h1>
        <p className="lg:w-1/2 w-full leading-relaxed text-lg">
          View details for all tasks here.
        </p>
      </div>
      <ul className="space-y-4 sm:space-y-2">
        {posts.map((element) =>
          element.status == "scheduled" ? (
            <ScheduledTaskCard
              name={element.taskName}
              status={element.status}
              id={element._id}
              delay={element.delay}
              date={element.createdAt}
              url={element.taskURL}
            />
          ) : (
            <FinishedTaskCard
              name={element.taskName}
              status={element.status}
              id={element._id}
              delay={element.delay}
              date={element.createdAt}
            />
          )
        )}
      </ul>
    </section>
  );
};

export default taskList;
