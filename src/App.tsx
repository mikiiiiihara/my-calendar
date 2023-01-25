import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "./firebase";
//Firebase ver9 compliant
import { onAuthStateChanged } from "firebase/auth";
import Auth from "./components/auth/Auth";

const App: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

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
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);
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
