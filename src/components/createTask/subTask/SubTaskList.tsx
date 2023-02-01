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
import { useTasksContext } from "../../../contexts/tasksContext";
import { selectUser } from "../../../features/userSlice";
import { SubTask } from "../../../types/sub-task";
import { convertDateToJST } from "../../../util/convertDateToJST";

type Props = {
  parentStart: Date;
  parentEnd: Date;
  parentTaskEnd: Date;
  parentTaskId: string;
  parentTaskName: string;
  isRegistered: boolean;
};

const SubTaskList: React.FC<Props> = ({
  parentStart,
  parentEnd,
  parentTaskEnd,
  parentTaskId,
  parentTaskName,
  isRegistered,
}) => {
  // 追加関数をcontextから取得
  const { createSubTask, option } = useTasksContext();
  // セッションからユーザー情報を取得
  const { uid } = useSelector(selectUser);
  // 連番管理用
  const [count, setCount] = useState(2);
  // 子タスク
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);
  // 登録済idリスト
  const [registeredIdList, setRegisteredIdList] = useState<string[]>([]);
  // 項目を追加
  const addSubTaskDisplay = () => {
    const length = subTasks.length - 1;
    // 最新のサブタスク
    const latestSubTask = subTasks[length];
    setSubTasks([
      ...subTasks,
      {
        id: String(count),
        title: "",
        // 最新のサブタスクの終了日付
        start: latestSubTask.end,
        // 親タスクの終了日付
        end: parentTaskEnd,
        // 登録時、まとめて代入する
        parentTaskId: "",
        parentTaskName: "",
        status: "Todo",
        memo: "",
        userId: uid,
      },
    ]);
    setCount(count + 1);
  };

  // 指定の項目を削除
  const deleteSubtaskDisplay = (subTask: SubTask) => {
    const newSubTask = subTasks.filter((task) => task.id !== subTask.id);
    setSubTasks(newSubTask);
  };

  // 登録処理
  const registerNewSubTask = async (
    e: { preventDefault: () => void },
    subTask: SubTask
  ) => {
    e.preventDefault();
    // 親タスクのIdが見つからない場合、親タスクが存在しないことになるので、処理中止
    if (parentTaskId === "" && parentTaskName === "") {
      alert(
        "親タスクが登録されていません。親タスク登録後、子タスクを登録してください。"
      );
    } else {
      const { id, title, start, end, status, memo } = subTask;
      const newSubTask: SubTask = {
        id,
        title,
        start,
        end,
        status,
        memo,
        parentTaskId,
        parentTaskName,
        userId: uid,
      };
      if (start.getTime() >= end.getTime()) {
        alert("開始日時より後の日時を、終了日付に入力してください");
      } else {
        await createSubTask(newSubTask);
        // 登録したことを画面側で認識するために、stateに反映する
        setRegisteredIdList([...registeredIdList, newSubTask.id]);
        alert("子タスクの登録が完了しました！");
      }
    }
  };
  useEffect(() => {
    setSubTasks([
      {
        id: "1",
        title: "",
        start: parentStart,
        end: parentEnd,
        // 親タスクは、登録時まとめて代入する
        parentTaskId: "",
        parentTaskName: "",
        status: "Todo",
        memo: "",
        userId: uid,
      },
    ]);
  }, [parentEnd, parentStart, uid]);
  return (
    <>
      <h2>Create Sub Tasks</h2>
      {isRegistered ? (
        <button className="add-button" onClick={addSubTaskDisplay}>
          Add Sub Task
        </button>
      ) : (
        <></>
      )}
      <ul>
        {subTasks ? (
          subTasks.map((subTask) => (
            <li className="border-secondary" key={subTask.id}>
              <form onSubmit={(e) => registerNewSubTask(e, subTask)}>
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
                        userId,
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
                          userId,
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
                          userId,
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
                            userId,
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
                          userId,
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
                            userId,
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
                          userId,
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
                            userId,
                          };
                        return value;
                      });
                      setSubTasks(newSubTasks);
                    }}
                    label="Status"
                    style={{ width: 200 }}
                  >
                    {option.statusTypeList ? (
                      option.statusTypeList.map((status) => (
                        <MenuItem
                          value={status.name}
                          key={`${status.name} ${status.color}`}
                        >
                          {status.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value={""}></MenuItem>
                    )}
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
                        userId,
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
                          userId,
                        };
                      return value;
                    });
                    setSubTasks(newSubTasks);
                  }}
                  minRows={4}
                  variant="outlined"
                  style={{ marginTop: "20px" }}
                />
                {registeredIdList.find((s) => s === subTask.id) ? (
                  <></>
                ) : (
                  <>
                    {" "}
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
                    {parentTaskId !== "" ? (
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
                            子タスク登録
                          </Button>
                        </Grid>
                      </Grid>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </form>
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
