import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
// import rootStore from "./store/rootStore";
import Dashboard from "./components/nodeBlocks/Dashboard";
import { Switch, Route } from "react-router";
import DialogDetails from "./components/nodeBlocks/DialogDetails";
import { observer } from 'mobx-react-lite'
import nodeStore from "./store/NodeStore";

function App() {
  const { nodeBlockCount } = useContext(nodeStore);

  return (
    <div className="App">
      <h2>We have {nodeBlockCount} blocks.</h2>
      <hr />
      <div className="container">
        <BrowserRouter>
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/blocks/:blockId" component={DialogDetails} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default observer(App);
