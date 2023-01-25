import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "./firebase";
//Firebase ver9 compliant
import { onAuthStateChanged } from "firebase/auth";
import Auth from "./components/auth/Auth";

const App: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Firebase ver9 compliant
    const unSub = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            displayName: authUser.displayName,
          })
        );
        setLoading(false);
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);
  if (loading) return <></>;
  return (
    <>
      {user.uid ? (
        <div>
          <p>ログインしますた</p>
          <button onClick={() => auth.signOut()}>Logout</button>
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default App;
