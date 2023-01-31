import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTasksContext } from "../../contexts/tasksContext";
import { selectUser } from "../../features/userSlice";
import { SubTask } from "../../types/sub-task";
import { Task } from "../../types/task";
import { convertDateToJST } from "../../util/convertDateToJST";
import styles from "./DetailTask.module.css";
import SubTaskItem from "./subTask/SubTaskItem";

type Props = {
  showFlag: Boolean;
  setShowModal: Function;
  // 親タスクのID
  parentTitle?: string;
};

const DetailTask: React.FC<Props> = ({
  showFlag,
  setShowModal,
  parentTitle,
}) => {
  const { tasks, subTasks, updateTask, deleteTask, deleteSubTask } =
    useTasksContext();
  // セッションからユーザー情報を取得
  const { uid } = useSelector(selectUser);
  // 画面項目
  const [title, setTitle] = useState("");
  const [startValue, setStartValue] = useState<Date | null>(null);
  const [endValue, setEndValue] = useState<Date | null>(null);
  const [status, setStatus] = useState("");
  const [memo, setMemo] = useState("");
  const [selectedSubTasks, setSelectedSubTasks] = useState<SubTask[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task>({
    id: "",
    title: "",
    start: new Date(),
    end: new Date(),
    status: "",
    memo: "",
    userId: "",
  });
  // 連番管理用
  const [count, setCount] = useState(2);
  // 更新モードかどうか？
  const [isEditMode, setIsEditMode] = useState(false);
  const closeModal = () => {
    setIsEditMode(false);
    setShowModal(false);
  };
  // 親タスク削除処理
  const executeDeleteTask = async (parentTask: Task) => {
    if (window.confirm(`「${parentTask.title}」のタスクを削除しますか？`)) {
      // 子を最初に削除(そうしないと子に紐付く親がなくなってしまうため)
      const executeDeleteSubTask = (subTasks: SubTask[]) => {
        // 削除したい親タスクのIdを持つ子タスクを抽出
        const toDeleteSubTasks = subTasks.filter(
          (subTask) => subTask.parentTaskId === parentTask.id
        );
        toDeleteSubTasks.map(
          async (subTask) => await deleteSubTask(subTask.id)
        );
      };
      executeDeleteSubTask(subTasks);
      closeModal();
      await deleteTask(parentTask.id);
    }
  };

  // 親タスク更新処理
  const executeUpdateTask = async (
    e: { preventDefault: () => void },
    id: string
  ) => {
    e.preventDefault();
    const newTask: Task = {
      id,
      title,
      start: startValue || new Date(),
      end: endValue || new Date(),
      status,
      memo,
      userId: uid,
    };
    await updateTask(newTask);
    alert(`タスク「${title}」の更新が完了しました！`);
  };
  // 項目を追加
  const addSubTaskDisplay = () => {
    const length = selectedSubTasks.length - 1;
    // 最新のサブタスク
    const latestSubTask = selectedSubTasks[length];
    setSelectedSubTasks([
      ...selectedSubTasks,
      {
        id: String(count),
        title: "",
        // 最新のサブタスクの終了日付
        start: latestSubTask ? latestSubTask.end : selectedTask.start,
        // 親タスクの終了日付
        end: selectedTask.end,
        parentTaskId: selectedTask.id,
        parentTaskName: selectedTask.title,
        status: "Todo",
        memo: "",
        userId: uid,
      },
    ]);
    setCount(count + 1);
  };
  useEffect(() => {
    const selectedTask = tasks.find((task) => task.id === parentTitle);
    if (selectedTask !== undefined) setSelectedTask(selectedTask);
    setTitle(selectedTask ? selectedTask.title : "");
    setStartValue(selectedTask ? selectedTask.start : new Date());
    setEndValue(selectedTask ? selectedTask.end : new Date());
    setStatus(selectedTask ? selectedTask.status : "");
    setMemo(selectedTask ? selectedTask.memo : "");
    const searchedSubTasks = selectedTask
      ? subTasks
          .filter((subTask) => subTask.parentTaskId === selectedTask.id)
          .sort(function (a, b) {
            if (a.start < b.start) return -1;
            if (a.start > b.start) return 1;
            return 0;
          })
      : [];
    setSelectedSubTasks(searchedSubTasks);
  }, [parentTitle, subTasks, tasks]);

  if (showFlag && parentTitle !== "" && parentTitle !== undefined) {
    return (
      <>
        {showFlag ? ( // showFlagがtrueだったらModalを表示する
          <div className={styles.overlay}>
            <div className={styles.card}>
              <div className={styles.content}>
                <form onSubmit={(e) => executeUpdateTask(e, selectedTask.id)}>
                  <h1>{title}</h1>
                  {selectedSubTasks.length === 0 ? (
                    <Grid
                      container
                      alignItems="flex-end"
                      justifyContent="flex-end"
                      direction="column"
                    >
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="inherit"
                          onClick={() => executeDeleteTask(selectedTask)}
                        >
                          削除
                        </Button>
                      </Grid>
                    </Grid>
                  ) : (
                    <></>
                  )}
                  <Grid
                    container
                    alignItems="flex-end"
                    justifyContent="flex-end"
                    direction="column"
                  >
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="inherit"
                        onClick={() => setIsEditMode(!isEditMode)}
                      >
                        {isEditMode ? "編集を終える" : "編集する"}
                      </Button>
                    </Grid>
                  </Grid>
                  <Stack direction="row" spacing={3}>
                    <TextField
                      disabled={!isEditMode}
                      id="datetime-local"
                      label="Start"
                      type="datetime-local"
                      defaultValue={convertDateToJST(startValue || new Date())}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        if (e.target.value !== "") {
                          setStartValue(new Date(e.target.value));
                        } else {
                          alert(
                            "適切な日付または空でない日付を入力してください"
                          );
                        }
                      }}
                      style={{ width: 200 }}
                    />
                    <TextField
                      disabled={!isEditMode}
                      id="datetime-local"
                      label="End"
                      type="datetime-local"
                      defaultValue={convertDateToJST(endValue || new Date())}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        if (e.target.value !== "") {
                          setEndValue(new Date(e.target.value));
                        } else {
                          alert(
                            "適切な日付または空でない日付を入力してください"
                          );
                        }
                      }}
                      style={{ width: 200 }}
                    />
                  </Stack>
                  <FormControl>
                    <InputLabel id="Status">Status</InputLabel>
                    <Select
                      disabled={!isEditMode}
                      labelId="Status"
                      id="Status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value as string)}
                      label="Status"
                      style={{ width: 200 }}
                    >
                      <MenuItem value={"Todo"}>Todo</MenuItem>
                      <MenuItem value={"In Progress"}>In Progress</MenuItem>
                      <MenuItem value={"In Review"}>In Review</MenuItem>
                      <MenuItem value={"Done"}>Done</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    id="Memo"
                    disabled={!isEditMode}
                    value={memo}
                    multiline
                    fullWidth
                    minRows={4}
                    variant="outlined"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setMemo(e.target.value);
                    }}
                    style={{ marginTop: "20px" }}
                  />
                  {isEditMode ? (
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="center"
                      direction="column"
                    >
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ width: 300 }}
                          type="submit"
                        >
                          親タスク更新
                        </Button>
                      </Grid>
                    </Grid>
                  ) : (
                    <></>
                  )}
                </form>
                <h2>Sub Task List</h2>
                {isEditMode ? (
                  <button className="add-button" onClick={addSubTaskDisplay}>
                    Add Sub Task
                  </button>
                ) : (
                  <></>
                )}
                <ul>
                  {selectedSubTasks ? (
                    selectedSubTasks.map((subTask) => (
                      <SubTaskItem
                        subTask={subTask}
                        isEditMode={isEditMode}
                        key={subTask.id}
                      />
                    ))
                  ) : (
                    <></>
                  )}
                </ul>
              </div>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                direction="column"
              >
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="inherit"
                    style={{ width: 300, marginTop: 10 }}
                    onClick={closeModal}
                  >
                    Close
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        ) : (
          <></> // showFlagがfalseの場合はModalは表示しない
        )}
      </>
    );
  }
  return <></>;
};

export default DetailTask;
