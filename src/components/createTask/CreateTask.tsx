import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import styles from "../detailTask/DetailTask.module.css";
import { convertDateToJST } from "../../util/convertDateToJST";
import SubTaskList from "./subTask/SubTaskList";
import { useTasksContext } from "../../contexts/tasksContext";
import { CreateTaskDto } from "../../hooks/dto/create-task.dto";

type Props = {
  showFlag: Boolean;
  setShowModal: Function;
  start: Date;
  end: Date;
};

const CreateTask: React.FC<Props> = ({
  showFlag,
  setShowModal,
  start,
  end,
}) => {
  // 追加関数をcontextから取得
  const { createTask } = useTasksContext();
  // 画面項目
  const [title, setTitle] = useState("");
  const [startValue, setStartValue] = useState<Date | null>(null);
  const [endValue, setEndValue] = useState<Date | null>(null);
  const [status, setStatus] = useState("");
  const [memo, setMemo] = useState("");
  // 親タスク新規登録後、レンダリングせずに子タスク追加できるように、親タスクID,Nameを保持する
  const [parentTaskId, setParentTaskId] = useState("");
  const [parentTaskName, setParentTaskName] = useState("");
  // 登録後継続して子タスク追加する際、親タスクを追加できないようにするための関数
  const [isRegistered, setIsRegistered] = useState(false);
  useEffect(() => {
    setStartValue(start);
    setEndValue(end);
  }, [end, start]);
  const closeModal = useCallback(() => {
    // モーダルが閉じられるたびに状態管理変数を初期化
    setTitle("");
    setStatus("");
    setMemo("");
    setParentTaskId("");
    setParentTaskName("");
    setIsRegistered(false);
    setShowModal(false);
  }, [setShowModal]);
  const registerNewTask = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // 親タスクを登録
    const createTaskDto: CreateTaskDto = {
      title,
      start: startValue || new Date(),
      end: endValue || new Date(),
      status,
      memo,
    };
    const newParentTaskId = await createTask(createTaskDto);
    // 親タスク登録後、連続して子タスクを追加できるように、親タスクIdを保持する
    setParentTaskId(newParentTaskId);
    setParentTaskName(title);
    setIsRegistered(true);
    alert("親タスクの登録が完了しました！");
  };

  return (
    <>
      {showFlag ? ( // showFlagがtrueだったらModalを表示する
        <div className={styles.overlay}>
          <div className={styles.card}>
            <div className={styles.content}>
              <form onSubmit={registerNewTask}>
                <h1>Create a new task</h1>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Title"
                  label="Title"
                  name="Title"
                  autoComplete="Title"
                  autoFocus
                  value={title}
                  placeholder="タスク名を入力してください。"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTitle(e.target.value);
                  }}
                />
                <Stack direction="row" spacing={3}>
                  <TextField
                    required
                    id="datetime-local"
                    label="Start"
                    type="datetime-local"
                    defaultValue={convertDateToJST(startValue || new Date())}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => {
                      setStartValue(new Date(e.target.value));
                    }}
                    style={{ width: 200 }}
                  />
                  <TextField
                    required
                    id="datetime-local"
                    label="End"
                    type="datetime-local"
                    defaultValue={convertDateToJST(endValue || new Date())}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => {
                      setEndValue(new Date(e.target.value));
                    }}
                    style={{ width: 200 }}
                  />
                </Stack>
                <FormControl>
                  <InputLabel id="Status">Status</InputLabel>
                  <Select
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
                  label="Memo"
                  multiline
                  fullWidth
                  value={memo}
                  placeholder="メモ"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setMemo(e.target.value);
                  }}
                  minRows={4}
                  variant="outlined"
                  style={{ marginTop: "20px" }}
                />
                {isRegistered ? (
                  <></>
                ) : (
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
                        親タスク登録
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </form>
              <SubTaskList
                parentStart={startValue || new Date()}
                parentEnd={endValue || new Date()}
                parentTaskEnd={endValue || new Date()}
                parentTaskId={parentTaskId}
                parentTaskName={parentTaskName}
              />
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
};

export default CreateTask;
