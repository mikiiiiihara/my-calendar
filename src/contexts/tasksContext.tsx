import { createContext, FC, ReactNode, useContext } from "react";
import { useSubTasks } from "../hooks/useSubTasks";
import { useTasks } from "../hooks/useTasks";
import { SubTask } from "../types/sub-task";
import { Task } from "../types/task";

type Props = {
  children: ReactNode;
};

type ContextType = {
  tasks: Task[];
  subTasks: SubTask[];
};

export const TasksContext = createContext({} as ContextType);
/**
 * TasksProvider
 * @param children
 * @constructor
 */
export const TasksProvider: FC<Props> = ({ children }) => {
  // カスタムフックから状態とロジックを呼び出してコンテキストプロバイダーにあてがう
  const { tasks } = useTasks();
  const { subTasks } = useSubTasks();
  return (
    <TasksContext.Provider value={{ tasks, subTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

/**
 * useTickerContext
 */
export const useTasksContext = () => useContext(TasksContext);
