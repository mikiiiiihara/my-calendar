import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { Task } from "../types/task";
import { CreateTaskDto } from "./dto/create-task.dto";

export const useTasks = () => {
  /* subtasks */
  const [tasks, setTasks] = useState<Task[]>([]);

  /* actions */
  const fetchTasks = useCallback(async (): Promise<void> => {
    // ユーザー情報取得
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        // ログインしていれば中通る
        let currentTasks: Task[] = [];
        // ログインしているユーザーのuidで絞る
        const documentData = query(
          collection(db, "tasks"),
          where("userId", "==", user.uid)
        );
        await getDocs(documentData).then((q) => {
          // cloudstoreにはtimestampで保存されてしまうので、Date型への変換が必要
          currentTasks = q.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            start: doc.data().start.toDate(),
            end: doc.data().end.toDate(),
            status: doc.data().status,
            memo: doc.data().memo,
            userId: doc.data().userId,
          }));
        });
        setTasks(currentTasks);
      }
    });
  }, []);
  /* create(成功した場合、新規登録したデータのIDを返却する) */
  const createTask = useCallback(
    async (createTaskDto: CreateTaskDto): Promise<string> => {
      const { title, start, end, status, memo, userId } = createTaskDto;
      // DB登録
      const tasksCollectionRef = collection(db, "tasks");
      const documentRef = await addDoc(tasksCollectionRef, {
        title,
        start,
        end,
        status,
        memo,
        userId,
      });
      // 追加情報をstateに反映
      const newTasks: Task[] = [
        ...tasks,
        { id: documentRef.id, title, start, end, status, memo, userId },
      ];
      setTasks(newTasks);
      return documentRef.id;
    },
    [tasks]
  );

  /* delete */
  const deleteTask = useCallback(
    async (id: string): Promise<void> => {
      const userDocumentRef = doc(db, "tasks", id);
      await deleteDoc(userDocumentRef);
      setTasks(tasks.filter((task) => task.id !== id));
    },
    [tasks]
  );
  /* update */
  const updateTask = useCallback(
    async (task: Task): Promise<void> => {
      const { id, title, start, end, status, memo } = task;
      const userDocumentRef = doc(db, "tasks", id);
      await updateDoc(userDocumentRef, {
        title,
        start,
        end,
        status,
        memo,
      });
      // 更新情報をstateに反映
      const newTasks: Task[] = tasks.map((newTask) => {
        if (newTask.id === id) return task;
        return newTask;
      });
      setTasks(newTasks);
    },
    [tasks]
  );

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    createTask,
    deleteTask,
    updateTask,
  };
};
