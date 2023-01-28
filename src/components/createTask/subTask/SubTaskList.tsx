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
    const length = subTasks.length - 1;
    const latestSubTask = subTasks[length];
    setSubTasks([
      ...subTasks,
      {
        id: String(count),
        title: "",
        // 最新のサブタスクの日付
        start: latestSubTask.end,
        end: latestSubTask.end,
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
                  const newSubTasks = subTasks.map((value) => {
                    const {
                      id,
                      start,
                      end,
                      parentTaskId,
                      parentTaskName,
                      status,
                      memo,
                    } = subTask;
                    if (value.id === id)
                      return {
                        id,
                        title: e.target.value,
                        start,
                        end,
                        parentTaskId,
                        parentTaskName,
                        status,
                        memo,
                      };
                    return value;
                  });
                  setSubTasks(newSubTasks);
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
                    const newSubTasks = subTasks.map((value) => {
                      const {
                        id,
                        title,
                        end,
                        parentTaskId,
                        parentTaskName,
                        status,
                        memo,
                      } = subTask;
                      if (value.id === id)
                        return {
                          id,
                          title,
                          start: new Date(e.target.value),
                          end,
                          parentTaskId,
                          parentTaskName,
                          status,
                          memo,
                        };
                      return value;
                    });
                    setSubTasks(newSubTasks);
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
                    const newSubTasks = subTasks.map((value) => {
                      const {
                        id,
                        title,
                        start,
                        parentTaskId,
                        parentTaskName,
                        status,
                        memo,
                      } = subTask;
                      if (value.id === id)
                        return {
                          id,
                          title,
                          start,
                          end: new Date(e.target.value),
                          parentTaskId,
                          parentTaskName,
                          status,
                          memo,
                        };
                      return value;
                    });
                    setSubTasks(newSubTasks);
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
                  onChange={(e) => {
                    const newSubTasks = subTasks.map((value) => {
                      const {
                        id,
                        title,
                        start,
                        end,
                        parentTaskId,
                        parentTaskName,
                        memo,
                      } = subTask;
                      if (value.id === id)
                        return {
                          id,
                          title,
                          start,
                          end,
                          parentTaskId,
                          parentTaskName,
                          status: e.target.value as string,
                          memo,
                        };
                      return value;
                    });
                    setSubTasks(newSubTasks);
                  }}
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
                value={subTask.memo}
                placeholder="メモ"
                onChange={(e) => {
                  const newSubTasks = subTasks.map((value) => {
                    const {
                      id,
                      title,
                      start,
                      end,
                      parentTaskId,
                      parentTaskName,
                      status,
                    } = subTask;
                    if (value.id === id)
                      return {
                        id,
                        title,
                        start,
                        end,
                        parentTaskId,
                        parentTaskName,
                        status,
                        memo: e.target.value,
                      };
                    return value;
                  });
                  setSubTasks(newSubTasks);
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
