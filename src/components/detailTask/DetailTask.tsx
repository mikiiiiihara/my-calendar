import { Button, Grid, TextField } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import React from "react";
import { useTasksContext } from "../../contexts/tasksContext";
import { SubTask } from "../../types/sub-task";
import { Task } from "../../types/task";
import { convertDateToJST } from "../../util/convertDateToJST";
import styles from "./DetailTask.module.css";

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

  const closeModal = () => {
    setShowModal(false);
  };
  // 親タスク削除処理
  const executeDeleteTask = async (parentTask: Task) => {
    if (window.confirm(`「${parentTask.title}」のtodoを削除しますか？`)) {
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

  // 子タスク削除処理
  const executeDeleteSubTask = async (subTask: SubTask) => {
    if (window.confirm(`「${subTask.title}」のtodoを削除しますか？`)) {
      await deleteSubTask(subTask.id);
    }
  };
  // TODO: 更新処理
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
                <h1>{selectedTask.title}</h1>
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
                <Stack direction="row" component="form" noValidate spacing={3}>
                  <TextField
                    disabled={true}
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
                    disabled={true}
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
                <TextField
                  margin="normal"
                  disabled={true}
                  id="Status"
                  label="Status"
                  name="Status"
                  autoComplete="Status"
                  autoFocus
                  value={selectedTask.status}
                  style={{ width: 200 }}
                />
                <TextField
                  id="Memo"
                  value={selectedTask.memo}
                  disabled={true}
                  multiline
                  fullWidth
                  minRows={4}
                  variant="outlined"
                  style={{ marginTop: "20px" }}
                />
                <h2>Sub Task List</h2>
                <ul>
                  {selectedSubTasks ? (
                    selectedSubTasks.map((subTask) => (
                      <li key={subTask.id}>
                        <h2>{subTask.title}</h2>
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
                              onClick={() => executeDeleteSubTask(subTask)}
                            >
                              削除
                            </Button>
                          </Grid>
                        </Grid>
                        <Stack
                          direction="row"
                          component="form"
                          noValidate
                          spacing={3}
                        >
                          <TextField
                            disabled={true}
                            id="datetime-local"
                            label="Start"
                            type="datetime-local"
                            defaultValue={convertDateToJST(subTask.start)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            style={{ width: 200 }}
                          />
                          <TextField
                            disabled={true}
                            id="datetime-local"
                            label="End"
                            type="datetime-local"
                            defaultValue={convertDateToJST(subTask.end)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            style={{ width: 200 }}
                          />
                        </Stack>
                        <TextField
                          margin="normal"
                          disabled={true}
                          id="Status"
                          label="Status"
                          name="Status"
                          autoComplete="Status"
                          autoFocus
                          value={subTask.status}
                          style={{ width: 200 }}
                        />
                        <TextField
                          id="Memo"
                          value={subTask.memo}
                          disabled={true}
                          multiline
                          fullWidth
                          minRows={2}
                          variant="outlined"
                          style={{ marginTop: "20px" }}
                        />
                      </li>
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
