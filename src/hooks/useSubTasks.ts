import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { db } from "../firebase";
import { SubTask } from "../types/sub-task";

export const useSubTasks = () => {
  /* subtasks */
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);

  /* actions */
  const fetchSubTasks = useCallback(async (): Promise<void> => {
    let currentSubTasks: SubTask[] = [];
    const documentData = query(collection(db, "subTasks"));
    await getDocs(documentData).then((q) => {
      // cloudstoreにはtimestampで保存されてしまうので、Date型への変換が必要
      currentSubTasks = q.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        start: doc.data().start.toDate(),
        end: doc.data().end.toDate(),
        parentTaskId: doc.data().parentTaskId,
        parentTaskName: doc.data().parentTaskName,
        status: doc.data().status,
        memo: doc.data().memo,
      }));
    });
    setSubTasks(currentSubTasks);
  }, []);

  /* create */
  const createSubTask = useCallback(
    async (subTask: SubTask): Promise<void> => {
      const { title, start, end, parentTaskId, parentTaskName, status, memo } =
        subTask;
      // DB登録
      const tasksCollectionRef = collection(db, "subTasks");
      const documentRef = await addDoc(tasksCollectionRef, {
        title,
        start,
        end,
        parentTaskId,
        parentTaskName,
        status,
        memo,
      });
      // 追加情報をstateに反映
      const newSubTasks: SubTask[] = [
        ...subTasks,
        {
          id: documentRef.id,
          title,
          start,
          end,
          parentTaskId,
          parentTaskName,
          status,
          memo,
        },
      ];
      setSubTasks(newSubTasks);
    },
    [subTasks]
  );

  /* delete */
  const deleteSubTask = useCallback(
    async (id: string): Promise<void> => {
      const userDocumentRef = doc(db, "subTasks", id);
      await deleteDoc(userDocumentRef);
      setSubTasks(subTasks.filter((task) => task.id !== id));
    },
    [subTasks]
  );
  /* update */
  const updateSubTask = useCallback(async (): Promise<void> => {}, []);

  useEffect(() => {
    fetchSubTasks();
  }, [fetchSubTasks]);

  return {
    subTasks,
    createSubTask,
    deleteSubTask,
    updateSubTask,
  };
};
