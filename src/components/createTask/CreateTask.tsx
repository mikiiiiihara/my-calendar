import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import styles from "../detailTask/DetailTask.module.css";
import { convertDateToJST } from "../../util/convertDateToJST";

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
  const [title, setTitle] = useState("");
  const [startValue, setStartValue] = useState<Date | null>(null);
  const [endValue, setEndValue] = useState<Date | null>(null);
  const [status, setStatus] = useState("");
  useEffect(() => {
    setStartValue(start);
    setEndValue(end);
  }, [end, start]);
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      {showFlag ? ( // showFlagがtrueだったらModalを表示する
        <div className={styles.overlay}>
          <div className={styles.card}>
            <div className={styles.content}>
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
              <Stack direction="row" component="form" noValidate spacing={3}>
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
                  <MenuItem value={"Done"}>Done</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="Memo"
                label="Memo"
                multiline
                fullWidth
                minRows={4}
                variant="outlined"
                style={{ marginTop: "20px" }}
              />
              <ul>
                <li>
                  <h2>サブタスク</h2>
                  <p>ステータス：ステータス</p>
                  <p>期間：start - end</p>
                </li>
              </ul>
            </div>
            <button onClick={closeModal} className="btn-secondary">
              Close
            </button>
          </div>
        </div>
      ) : (
        <></> // showFlagがfalseの場合はModalは表示しない
      )}
    </>
  );
};

export default CreateTask;
