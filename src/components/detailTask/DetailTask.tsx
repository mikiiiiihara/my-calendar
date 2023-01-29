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
import React, { useState } from "react";
import { useTasksContext } from "../../contexts/tasksContext";
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
  const { tasks, subTasks, deleteTask, deleteSubTask } = useTasksContext();
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
      // setSelectedTitle("");
      closeModal();
      await deleteTask(parentTask.id);
    }
  };
  if (showFlag && parentTitle !== "" && parentTitle !== undefined) {
    const selectedTask = tasks.find((task) => task.id === parentTitle);
    // 選択した親タスクがない場合、アラート出す
    if (selectedTask == null)
      throw new Error("親子タスクの紐付けを確認できませんでした。");
    const searchedSubTasks = subTasks.filter(
      (subTask) => subTask.parentTaskId === selectedTask.id
    );
    const selectedSubTasks = searchedSubTasks.sort(function (a, b) {
      if (a.start < b.start) return -1;
      if (a.start > b.start) return 1;
      return 0;
    });
    return (
      <>
        {showFlag ? ( // showFlagがtrueだったらModalを表示する
          <div className={styles.overlay}>
            <div className={styles.card}>
              <div className={styles.content}>
                <form>
                  {isEditMode ? (
                    <TextField
                      disabled={!isEditMode}
                      margin="normal"
                      required
                      fullWidth
                      id="Title"
                      label="Title"
                      name="Title"
                      autoComplete="Title"
                      autoFocus
                      value={selectedTask.title}
                      placeholder="タスク名を入力してください。"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        console.log(e.target.value);
                      }}
                    />
                  ) : (
                    <h1>{selectedTask.title}</h1>
                  )}
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
                      defaultValue={convertDateToJST(selectedTask.start)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{ width: 200 }}
                    />
                    <TextField
                      disabled={!isEditMode}
                      id="datetime-local"
                      label="End"
                      type="datetime-local"
                      defaultValue={convertDateToJST(selectedTask.end)}
                      InputLabelProps={{
                        shrink: true,
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
                      value={selectedTask.status}
                      onChange={(e) => console.log(e.target.value as string)}
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
                    value={selectedTask.memo}
                    multiline
                    fullWidth
                    minRows={4}
                    variant="outlined"
                    style={{ marginTop: "20px" }}
                  />
                </form>
                <h2>Sub Task List</h2>
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
