<h1 align="center">
AWS-T3 <svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 30 21"><path d="M17 3v-2c0-.552.447-1 1-1s1 .448 1 1v2c0 .552-.447 1-1 1s-1-.448-1-1zm-12 1c.553 0 1-.448 1-1v-2c0-.552-.447-1-1-1-.553 0-1 .448-1 1v2c0 .552.447 1 1 1zm13 13v-3h-1v4h3v-1h-2zm-5 .5c0 2.481 2.019 4.5 4.5 4.5s4.5-2.019 4.5-4.5-2.019-4.5-4.5-4.5-4.5 2.019-4.5 4.5zm11 0c0 3.59-2.91 6.5-6.5 6.5s-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5zm-14.237 3.5h-7.763v-13h19v1.763c.727.33 1.399.757 2 1.268v-9.031h-3v1c0 1.316-1.278 2.339-2.658 1.894-.831-.268-1.342-1.111-1.342-1.984v-.91h-9v1c0 1.316-1.278 2.339-2.658 1.894-.831-.268-1.342-1.111-1.342-1.984v-.91h-3v21h11.031c-.511-.601-.938-1.273-1.268-2z"/></svg>
</h1>

<h3 align="center">Task Scheduler & Orchestrator Library</h3>
<p align="center">Team ID: AWS-T3 | Team Members: <a href="https://github.com/SamrendraS" target="_blank">Samrendra Singh</a></p>

## Introduction

The aim of our project is to create a Task Scheduler, that takes in a task in the form of a link to AWS lambda function & executes it on the specified time, & an Orchestrator that can schedule an orchestration. The orchestrator schedules a set of tasks collectively. These tasks are executed in a sequential manner, & after the successful execution of each task a condition check task is executed.
<br/>
Why do we need this? <br/>
Basically companies have multiple workflows that consist of a set of asynchronous tasks that need to be scheduled and executed based on events or other triggers. This is where a task orchestrator and scheduler comes in handy. <br/>
Here we expose an API through which users can schedule the tasks & modify them.

## Key Features

- Takes in Lambda URL & schedules it on the specified time.
- Users can cancel or modify the task before the start of it’s execution.
- Executes a task with an accuracy of under 1 second.
- Supports creation of orchestrations for any number of tasks.
- Users can cancel and modify the orchestration before the start of it’s execution.

## Task

Each task instance has the following properties:

- `id`: ID that uniquely identifies a Task instance.
- `taskURL`: The AWS Lambda Trigger API URL to be called.
- `delayInMS`: The delay in milliseconds that taken into account from the creation time will give the scheduled run time.
- `createdAt`: Timestamp storing the creation time of task instance.
- `status`: A Task instance can be one of the following:
  - <span style="margin:2px;padding:2px;background-color:dodgerblue; border-radius:3px">Scheduled</span>
  - <span style="margin:2px;padding:2px;background-color:goldenrod; border-radius:3px">Running</span>
  - <span style="margin:2px;padding:2px;background-color:green; border-radius:3px">Completed (Success)</span>
  - <span style="margin:2px;padding:2px;background-color:maroon; border-radius:3px">Failed</span>
  - <span style="margin:2px;padding:2px;background-color:black;border-radius:3px">Cancelled</span>

## Functionality

The Task Scheduler Library supports REST API endpoints which support the following functionality. Users can use these endpoints to schedule, retrieve, modify and cancel tasks (lambda functions).

- [x] `TaskId schedule(TaskURL, timeInMS)`

  - **Description:** Schedules a Task after an initial delay of timeInMS and returns the created Task Instance Id.
  - **API Endpoint:** `POST`: `/tasks` (Protected API Route)


- [x] `Boolean cancel(Taskid)`

  - **Description:** Takes in a Task Instance Id and cancels it. Returns a boolean value to confirm the task has been cancelled.
  - **API Endpoint:** `PUT`: `/tasks/<id>/cancel` (Protected API Route)


- [x] `TaskStatus checkStatus(Taskid)`

  - **Description:** Returns the status of the task instance.
  - **API Endpoint:** `GET`: `/tasks/:taskID/status`


- [x] `Boolean modify(TaskId, timeInMS)`

  - **Description:** Takes in a Task Instance Id and a new time delay and updates the task’s schedule to the new one. Return a boolean value to indicate a successful modification.
  - **API Endpoint:** `PATCH`: `/tasks/<id>` (Protected API Route)


- [x] `Task[] retrieveTaskInstances(TaskStatus)`

  - **Description:** Return list of all Task instances with a specific status.
  - **API Endpoint:** `GET`: `/tasks?status=<filterStatus>`


- [x] `Task[] retrieveAllTasks()`

  - **Description:** Retrieves all tasks, irrespective of status.
  - **API Endpoint:** `GET`: `/tasks`
