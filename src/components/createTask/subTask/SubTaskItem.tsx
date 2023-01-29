import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Stack } from "@mui/material";
import React, { useState } from "react";
import { SubTask } from "../../../types/sub-task";
import { convertDateToJST } from "../../../util/convertDateToJST";

type Props = {
  subTask: SubTask;
  deleteItem: Function;
};

const SubTaskItem: React.FC<Props> = ({ subTask, deleteItem }) => {
  const [title, setTitle] = useState("");
  const [startValue, setStartValue] = useState<Date | null>(null);
  const [endValue, setEndValue] = useState<Date | null>(null);
  const [status, setStatus] = useState("");
  const [memo, setMemo] = useState("");
  return (
    <li className="border-secondary">
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
              onClick={() => deleteItem(subTask)}
            >
              削除
            </Button>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </li>
  );
};

export default SubTaskItem;
