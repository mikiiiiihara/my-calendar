import { createContext, FC, ReactNode, useContext } from "react";
import { CreateTaskDto } from "../hooks/dto/create-task.dto";
import { useSubTasks } from "../hooks/useSubTasks";
import { useTasks } from "../hooks/useTasks";
import { SubTask } from "../types/sub-task";
import { Task } from "../types/task";

type Props = {
  children: ReactNode;
};

type ContextType = {
  tasks: Task[];
  createTask: (createTaskDto: CreateTaskDto) => Promise<string>;
  deleteTask: () => Promise<void>;
  updateTask: () => Promise<void>;
  subTasks: SubTask[];
  createSubTask: (subTask: SubTask) => Promise<void>;
  deleteSubTask: () => Promise<void>;
  updateSubTask: () => Promise<void>;
};

export const TasksContext = createContext({} as ContextType);
/**
 * TasksProvider
 * @param children
 * @constructor
 */
export const TasksProvider: FC<Props> = ({ children }) => {
  // カスタムフックから状態とロジックを呼び出してコンテキストプロバイダーにあてがう
  const { tasks, createTask, deleteTask, updateTask } = useTasks();
  const { subTasks, createSubTask, deleteSubTask, updateSubTask } =
    useSubTasks();
  return (
    <TasksContext.Provider
      value={{
        tasks,
        createTask,
        deleteTask,
        updateTask,
        subTasks,
        createSubTask,
        deleteSubTask,
        updateSubTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

/**
 * useTickerContext
 */
export const useTasksContext = () => useContext(TasksContext);
