import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import rootStore from "./store/rootStore";
import Dashboard from "./components/layout/Dashboard";
import { Switch, Route } from "react-router";
import DialogDetails from "./components/nodeBlocks/DialogDetails";
import { observer } from "mobx-react-lite";
import Home from "./components/layout/Home";
import Navbar from "./components/layout/Navbar";

function App() {
  const { nodeBlockCount } = useContext(rootStore).nodeStore;

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/blocks/:blockId" component={DialogDetails} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default observer(App);
