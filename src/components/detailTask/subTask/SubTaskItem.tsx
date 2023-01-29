import { Button, Grid, TextField } from "@material-ui/core";
import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTasksContext } from "../../../contexts/tasksContext";
import { SubTask } from "../../../types/sub-task";
import { convertDateToJST } from "../../../util/convertDateToJST";

type Props = {
  subTask: SubTask;
  isEditMode: boolean;
};

const SubTaskItem: React.FC<Props> = ({ subTask, isEditMode }) => {
  const { updateTask, deleteSubTask } = useTasksContext();
  // 画面項目
  const [title, setTitle] = useState("");
  const [startValue, setStartValue] = useState<Date | null>(null);
  const [endValue, setEndValue] = useState<Date | null>(null);
  const [status, setStatus] = useState("");
  const [memo, setMemo] = useState("");
  // 更新処理
  const executeUpdateSubTask = async (
    e: { preventDefault: () => void },
    subTask: SubTask
  ) => {
    e.preventDefault();
    const { id, parentTaskId, parentTaskName } = subTask;
    const newSubtask: SubTask = {
      id,
      title,
      start: startValue || new Date(),
      end: endValue || new Date(),
      status,
      parentTaskId,
      parentTaskName,
      memo,
    };
    console.log(newSubtask);
  };
  // 子タスク削除処理
  const executeDeleteSubTask = async (subTask: SubTask) => {
    if (window.confirm(`「${subTask.title}」のタスクを削除しますか？`)) {
      await deleteSubTask(subTask.id);
    }
  };
  useEffect(() => {
    setTitle(subTask.title);
    setStartValue(subTask.start);
    setEndValue(subTask.end);
    setStatus(subTask.status);
    setMemo(subTask.memo);
  }, [subTask.end, subTask.memo, subTask.start, subTask.status, subTask.title]);
  return (
    <li>
      <form onSubmit={(e) => executeUpdateSubTask(e, subTask)}>
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
            value={title}
            placeholder="タスク名を入力してください。"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
        ) : (
          <h2>{title}</h2>
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
              onClick={() => executeDeleteSubTask(subTask)}
            >
              削除
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
              setStartValue(new Date(e.target.value));
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
              setEndValue(new Date(e.target.value));
            }}
            style={{ width: 200 }}
          />
        </Stack>
        <TextField
          margin="normal"
          disabled={!isEditMode}
          id="Status"
          label="Status"
          name="Status"
          autoComplete="Status"
          autoFocus
          value={status}
          onChange={(e) => setStatus(e.target.value as string)}
          style={{ width: 200 }}
        />
        <TextField
          id="Memo"
          value={memo}
          disabled={!isEditMode}
          multiline
          fullWidth
          minRows={2}
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
                子タスク更新
              </Button>
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
      </form>
    </li>
  );
};

export default SubTaskItem;
