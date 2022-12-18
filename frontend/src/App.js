import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import NoteState from "./context/notes/NoteState";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
     <NoteState>
        <Router>
            <Switch>
                  <Route exact  path="/">
                    <Home />
                  </Route>
                  <Route exact  path="/login">
                    <Login/>
                  </Route>
                  <Route exact  path="/register">
                    <Register/>
                  </Route>
            </Switch>
        </Router>
     </NoteState>
  );
}

export default App;
