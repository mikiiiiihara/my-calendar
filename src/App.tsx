import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "./firebase";
//Firebase ver9 compliant
import { onAuthStateChanged } from "firebase/auth";
import Auth from "./components/auth/Auth";
import Home from "./components/home/Home";

const App: React.FC = () => {
  // セッションからユーザー情報を取得
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Firebase ver9 compliant
    const unSub = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // stateにログイン情報をsetする
        dispatch(
          login({
            uid: authUser.uid,
            displayName: authUser.displayName,
          })
        );
        setLoading(false);
      } else {
        // stateの情報を全削除する
        dispatch(logout());
        setLoading(false);
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);

  if (loading) return <></>;
  return <>{user.uid ? <Home /> : <Auth />}</>;
};

export default App;
