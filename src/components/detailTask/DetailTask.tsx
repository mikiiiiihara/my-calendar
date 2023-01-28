import { Button, Grid, TextField } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import React from "react";
import { useTasksContext } from "../../contexts/tasksContext";
import { convertDateToJST } from "../../util/convertDateToJST";
import styles from "./DetailTask.module.css";

type Props = {
  showFlag: Boolean;
  setShowModal: Function;
  selectedTitle?: string;
};

const DetailTask: React.FC<Props> = ({
  showFlag,
  setShowModal,
  selectedTitle,
}) => {
  const { tasks, subTasks } = useTasksContext();
  const closeModal = () => {
    setShowModal(false);
  };
  if (selectedTitle !== "" && selectedTitle !== undefined) {
    const selectedTask = tasks.find((task) => task.title === selectedTitle);
    // 選択した親タスクがない場合、アラート出す
    if (selectedTask == null)
      throw new Error("親子タスクの紐付けを確認できませんでした。");
    const selectedSubTasks = subTasks.filter(
      (subTask) => subTask.parentTask === selectedTitle
    );
    return (
      <>
        {showFlag ? ( // showFlagがtrueだったらModalを表示する
          <div className={styles.overlay}>
            <div className={styles.card}>
              <div className={styles.content}>
                <h1>{selectedTask.title}</h1>
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
