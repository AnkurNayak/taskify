"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { IoCheckmarkCircle, IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  addTask,
  deleteTask,
  toggleTaskCompletion,
} from "@/features/slices/tasksSlice";
import { Badge } from "@/components/ui/badge";
import FormField, { FormData } from "@/components/FormFields";
import { AppDispatch } from "@/features/store";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface TaskRootState {
  tasks: {
    tasks: Task[];
  };
}

const taskSchema = z.object({
  taskTitle: z
    .string()
    .min(1, "Task title is required")
    .max(100, "Title is too long"),
  taskNote: z.string().optional(),
});

const TaskManager = () => {
  const [isNewTask, setIsNewTask] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(taskSchema) });
  const dispatch = useDispatch();
  const tasks = useSelector((state: TaskRootState) => state.tasks.tasks);

  const onSubmit = handleSubmit((data) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: data.taskTitle,
      description: data.taskNote,
      completed: false,
    };
    dispatch(addTask(newTask));
    setIsNewTask(false);
  });

  const handleNewTask = () => setIsNewTask((pv) => !pv);

  return (
    <div className="flex flex-col flex-auto relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between py-8 px-4">
        <div>
          <div className="text-4xl font-extrabold tracking-tight leading-none">
            Tasks
          </div>
          <div className="ml-0.5 font-medium">
            {tasks.length} remaining tasks
          </div>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button onClick={handleNewTask}>Add Task</Button>
        </div>
      </div>

      <div className="divide-y px-4">
        {tasks.map((task) => (
          <TaskInfo key={task.id} task={task} dispatch={dispatch} />
        ))}
      </div>

      <AnimatePresence>
        {isNewTask && (
          <motion.div
            initial={{ marginRight: -512 }}
            animate={{ marginRight: 0 }}
            exit={{ marginRight: -512 }}
            transition={{ duration: 0.4, ease: easeInOut }}
            className="absolute sm:w-[512px] w-full top-0 right-0 bottom-0 bg-white dark:bg-neutral-900 z-[60] border-l border-border"
          >
            <div className="flex flex-col flex-auto p-6 pt-10 sm:p-8 sm:pt-10 overflow-y-auto">
              <div className="flex w-full items-end justify-end">
                <button
                  className="rounded-full h-8 w-8 hover:bg-gray-200 dark:hover:bg-background  flex items-center justify-center"
                  onClick={handleNewTask}
                >
                  <IoCloseOutline size={24} />
                </button>
              </div>

              <form onSubmit={onSubmit} className="space-y-8">
                <FormField
                  label="Task Title"
                  inputType="input"
                  type="string"
                  // placeholder="taskTitle"
                  name="taskTitle"
                  register={register}
                  error={errors.taskTitle}
                />
                <FormField
                  label="Task Note"
                  inputType="textarea"
                  type="string"
                  // placeholder="Task Note"
                  name="taskNote"
                  register={register}
                  error={errors.taskNote}
                />
                <Button>Add Task</Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface TaskInfoProps {
  task: Task;
  dispatch: AppDispatch;
}

const TaskInfo: React.FC<TaskInfoProps> = ({ task, dispatch }) => {
  const handleTaskCheck = () => {
    dispatch(toggleTaskCompletion(task.id));
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id));
  };

  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "IST",
  });

  return (
    <div className="relative flex items-start py-4">
      <button onClick={handleTaskCheck} className="flex items-center">
        <IoCheckmarkCircle
          size={24}
          className={task.completed ? "text-green-500" : "text-gray-500"}
        />
      </button>
      <div className="ml-4 w-full">
        <div className="flex w-full justify-between">
          <Badge>Created At : {formatter.format(Number(task.id))}</Badge>
        </div>
        <div className="font-semibold text-lg">{task.title}</div>
        <div className="text-sm text-gray-500">{task.description}</div>
        <Button
          className="text-xs font-medium text-white bg-red-500 mt-2"
          onClick={handleDeleteTask}
        >
          Delete Task
        </Button>
      </div>
    </div>
  );
};

export default TaskManager;
