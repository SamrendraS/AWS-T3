import FinishedPreview from "../../components/PreviewCards/FinishedPreview";

export default function TaskModal(task) {
  console.log(task);
  return (
    <div className="p-5">
      <FinishedPreview
        id={task.task._id}
        taskURL={task.task.taskURL}
        taskName={task.task.taskName}
        status={task.task.status}
        delay={task.task.delay}
        result={task.task.result ? task.task.result : {}}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const url = "http://localhost:5000";

  // Get external data from the file system, API, DB, etc.
  const res = await fetch(`${url}/${id}`);
  const task = await res.json();
  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: {
      task: task,
    },
  };
}
