import { useState, useEffect } from "react";
import "./App.css";
import Authentication from "./Authentication/Authentication";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "./Store/AuthSlice";
import { Footer, Header } from "./Components";
import { Outlet } from "react-router-dom";

function App() {
  const [Loading, setLoading] = useState(true);
  const Dispatch = useDispatch();
  useEffect(() => {
    Authentication.getCurrentUser()
      .then((useData) => {
        useData ? Dispatch(logIn(useData)) : Dispatch(logOut());
      })
      .catch((response) => {
        console.log(
          "The Error will Checking that you Are logged IN ",
          response
        );
      })
      .finally(() => setLoading(false));
  });
  return !Loading ? (
    <div className=" min-h-screen flex flex-wrap content-between  bg-slate-600">
      <div className=" w-full block ">
        <Header />
        <main>
          {/* need to work on the Outlet */}
          {/* <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
