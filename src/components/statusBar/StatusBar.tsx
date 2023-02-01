import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { STATUS_COLOR } from "../../consts/StatusColor";
import { useTasksContext } from "../../contexts/tasksContext";
import { selectUser } from "../../features/userSlice";
import { AddStatusTypeDto } from "../../hooks/dto/add-status-type.dto";
import { CreateOptionDto } from "../../hooks/dto/create-option.dto";
import StatusBarItem from "./StatusBarItem";

const StatusBar: React.FC = () => {
  const { option, createOption, addStatusType } = useTasksContext();
  // セッションからユーザー情報を取得
  const { uid } = useSelector(selectUser);
  // 画面項目
  const [status, setStatus] = useState("");
  const registerStatusType = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      option.statusTypeList === undefined ||
      option.statusTypeList.length === 0
    ) {
      // まだタグが登録されてない場合、createする
      const createOptionDto: CreateOptionDto = {
        uid,
        statusType: { name: status, color: STATUS_COLOR[0] },
      };
      // 登録処理
      await createOption(createOptionDto);
    } else {
      // すでに同名のステータスが存在しないかチェックする
      const existStatusType = option.statusTypeList.find(
        (statusType) => statusType.name === status
      );
      if (existStatusType === undefined) {
        const index = option.statusTypeList.length;
        const maxIndex = STATUS_COLOR.length;
        const addStatusTypeDto: AddStatusTypeDto = {
          uid,
          statusType: {
            name: status,
            color:
              maxIndex >= index
                ? STATUS_COLOR[index]
                : STATUS_COLOR[index - maxIndex],
          },
        };
        // 更新処理
        await addStatusType(addStatusTypeDto);
      } else {
        alert("入力されたステータスはすでに存在しています");
      }
    }
  };
  return (
    <>
      <h2>ステータスを追加</h2>
      <form onSubmit={(e) => registerStatusType(e)}>
        <Stack direction="row" spacing={3}>
          <TextField
            required
            id="name"
            value={status}
            size="small"
            multiline
            variant="outlined"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setStatus(e.target.value);
            }}
          />
          <Button
            variant="contained"
            style={{
              width: 80,
              backgroundColor: "rgb(48, 61, 78)",
              color: "white",
            }}
            type="submit"
          >
            登録
          </Button>
        </Stack>
      </form>
      <h2>ステータス一覧</h2>
      <div style={{ margin: "10px" }}>
        {option.statusTypeList === undefined ||
        option.statusTypeList.length === 0 ? (
          <></>
        ) : (
          option.statusTypeList.map((statusType) => (
            <StatusBarItem statusType={statusType} key={statusType.name} />
          ))
        )}
      </div>
    </>
  );
};

export default StatusBar;
