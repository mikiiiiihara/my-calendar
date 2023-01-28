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
import { SubTask } from "../../../types/sub-task";
import { convertDateToJST } from "../../../util/convertDateToJST";

type Props = {
  subTasks: SubTask[];
  setSubTasks: Function;
};

const SubTaskList: React.FC<Props> = ({ subTasks, setSubTasks }) => {
  // 連番管理用
  const [count, setCount] = useState(2);
  // 項目を追加
  const addSubTaskDisplay = () => {
    setSubTasks([
      ...subTasks,
      {
        id: String(count),
        title: "",
        start: new Date(),
        end: new Date(),
        // 登録時、まとめて代入する
        parentTask: "",
        status: "Todo",
        memo: "",
      },
    ]);
    setCount(count + 1);
  };

  // 指定の項目を削除
  const deleteSubtaskDisplay = (subTask: SubTask) => {
    const newSubTask = subTasks.filter((task) => task.id !== subTask.id);
    setSubTasks(newSubTask);
  };
  return (
    <>
      <h2>Create Sub Tasks</h2>
      <button className="add-button" onClick={addSubTaskDisplay}>
        Add Sub Task
      </button>
      <ul>
        {subTasks ? (
          subTasks.map((subTask) => (
            <li className="border-secondary" key={subTask.id}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="Title"
                label="Title"
                name="Title"
                autoComplete="Title"
                autoFocus
                value={subTask.title}
                placeholder="タスク名を入力してください。"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  console.log(e.target.value);
                }}
              />
              <Stack direction="row" spacing={3}>
                <TextField
                  required
                  id="datetime-local"
                  label="Start"
                  type="datetime-local"
                  defaultValue={convertDateToJST(subTask.start || new Date())}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    console.log(new Date(e.target.value));
                  }}
                  style={{ width: 200 }}
                />
                <TextField
                  required
                  id="datetime-local"
                  label="End"
                  type="datetime-local"
                  defaultValue={convertDateToJST(subTask.end || new Date())}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    console.log(new Date(e.target.value));
                  }}
                  style={{ width: 200 }}
                />
              </Stack>
              <FormControl>
                <InputLabel id="Status">Status</InputLabel>
                <Select
                  labelId="Status"
                  id="Status"
                  value={subTask.status}
                  onChange={(e) => console.log(e.target.value as string)}
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
                value={subTask.memo}
                placeholder="メモ"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  console.log(e.target.value);
                }}
                minRows={4}
                variant="outlined"
                style={{ marginTop: "20px" }}
              />
              {subTask.id !== "1" ? (
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
                      onClick={() => deleteSubtaskDisplay(subTask)}
                    >
                      削除
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <></>
              )}
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </>
  );
};

export default SubTaskList;
