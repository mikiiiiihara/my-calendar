import React from "react";
import { auth } from "../../firebase";

const Home: React.FC = () => {
  return (
    <div>
      <p>ログインしますた</p>
      <button onClick={() => auth.signOut()}>Logout</button>
    </div>
  );
};

export default Home;
