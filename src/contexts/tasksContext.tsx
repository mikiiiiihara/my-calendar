import { createContext, FC, ReactNode, useContext } from "react";
import { CreateTaskDto } from "../hooks/dto/create-task.dto";
import { useOption } from "../hooks/useOption";
import { useSubTasks } from "../hooks/useSubTasks";
import { useTasks } from "../hooks/useTasks";
import { SubTask } from "../types/sub-task";
import { Task } from "../types/task";
import { Option } from "../types/option";
import { AddStatusTypeDto } from "../hooks/dto/add-status-type.dto";
import { CreateOptionDto } from "../hooks/dto/create-option.dto";

type Props = {
  children: ReactNode;
};

type ContextType = {
  tasks: Task[];
  createTask: (createTaskDto: CreateTaskDto) => Promise<string>;
  deleteTask: (id: string) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  subTasks: SubTask[];
  createSubTask: (subTask: SubTask) => Promise<void>;
  deleteSubTask: (id: string) => Promise<void>;
  updateSubTask: (subTask: SubTask) => Promise<void>;
  option: Option;
  createOption: (createOptionDto: CreateOptionDto) => Promise<void>;
  addStatusType: (addStatusTypeDto: AddStatusTypeDto) => Promise<void>;
  changeStatusColor: (addStatusTypeDto: AddStatusTypeDto) => Promise<void>;
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
  const { option, createOption, addStatusType, changeStatusColor } =
    useOption();
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
        option,
        createOption,
        addStatusType,
        changeStatusColor,
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
