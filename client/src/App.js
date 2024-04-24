import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { ValidateUser } from "./redux/action/auth";
import { ModalProvider } from "./context/ModalContext";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ValidateUser());
    
  }, [dispatch]);

  return (
    <div className="App">
      <ModalProvider>
      <Router>
        <AllRoutes />
      </Router>
      </ModalProvider>
    </div>
  );
}

export default App;
