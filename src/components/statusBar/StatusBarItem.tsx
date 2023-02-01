import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { STATUS_COLOR, STATUS_COLOR_NAME } from "../../consts/StatusColor";
import { useTasksContext } from "../../contexts/tasksContext";
import { selectUser } from "../../features/userSlice";
import { AddStatusTypeDto } from "../../hooks/dto/add-status-type.dto";
import { StatusType } from "../../types/option";

type Props = {
  statusType: StatusType;
};

const StatusBarItem: React.FC<Props> = ({ statusType }) => {
  const { name, color } = statusType;
  const { changeStatusColor } = useTasksContext();
  const [showFlag, setShowFlag] = useState(false);
  const [statusColor, setStatusColor] = useState("");
  // セッションからユーザー情報を取得
  const { uid } = useSelector(selectUser);

  // 編集画面表示
  const displayDetail = () => {
    setShowFlag(!showFlag);
  };

  // 色変更
  const changeColor = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newStatusType: StatusType = { name, color: statusColor };
    const addStatusTypeDto: AddStatusTypeDto = {
      uid,
      statusType: newStatusType,
    };
    await changeStatusColor(addStatusTypeDto);
    alert("更新が完了しました！");
  };
  //   // 削除
  //   const deleteStatus = () => {
  //     console.log(name);
  //   };
  useEffect(() => {
    setStatusColor(color);
  }, [color]);
  return (
    <>
      {showFlag ? (
        <div className="container">
          <div className="card">
            <form onSubmit={(e) => changeColor(e)}>
              <Stack direction="row" spacing={3}>
                <h3
                  style={{
                    backgroundColor: statusColor,
                    borderRadius: "4px",
                    margin: "2px",
                    color: "white",
                    padding: "10px",
                    textAlign: "center",
                    display: "inline-block",
                  }}
                >
                  {name}
                </h3>
                <FormControl>
                  <InputLabel id="Status">Status</InputLabel>
                  <Select
                    labelId="Color"
                    id="Color"
                    value={statusColor}
                    onChange={(e) => setStatusColor(e.target.value as string)}
                    label="Color"
                    style={{ width: 120 }}
                  >
                    {STATUS_COLOR.map((colorItem) => (
                      <MenuItem value={colorItem} key={colorItem}>
                        {
                          STATUS_COLOR_NAME.find(
                            (colorName) => colorName.code === colorItem
                          )?.name
                        }
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: 40 }}
                  type="submit"
                >
                  更新
                </Button>
              </Stack>
            </form>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              direction="column"
            >
              <Grid item xs={12}>
                {/* <Button
                  variant="contained"
                  style={{
                    width: 40,
                    margin: 4,
                    backgroundColor: "rgb(48, 61, 78)",
                    color: "white",
                  }}
                  onClick={deleteStatus}
                >
                  Delete
                </Button> */}
                <Button
                  variant="contained"
                  color="inherit"
                  style={{ width: 40, margin: 4 }}
                  onClick={displayDetail}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      ) : (
        <></>
      )}
      <span
        style={{
          backgroundColor: color,
          borderRadius: "4px",
          margin: "2px",
          color: "white",
          padding: "10px",
          textAlign: "center",
          display: "inline-block",
        }}
        onClick={displayDetail}
      >
        {name}
      </span>
    </>
  );
};

export default StatusBarItem;
