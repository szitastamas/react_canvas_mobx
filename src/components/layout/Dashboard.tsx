import React, { useContext, useState, useRef, useEffect } from "react";
import { RootStoreContext } from "../../store/rootStore";
import INodeBlock from "../../interfaces/INodeBlock";
import NodeBlock from "../nodeBlocks/NodeBlock";
import Canvas from "../canvas/Canvas";
import { observer } from "mobx-react-lite";

const Dashboard = () => {
  const {
    nodeStore: { allBlocks, deepestPosition, rightestPosition, addBlock },
  } = useContext(RootStoreContext);

  const dashboardRef = useRef(null);

  useEffect(() => {
    const dsh = (dashboardRef.current as unknown) as HTMLDivElement;

    if (dsh) {
      dsh.style.height = deepestPosition + "px";
      dsh.style.width = rightestPosition + "px";
    }
  }, [deepestPosition, rightestPosition]);

  const recalculateDashboardSize = () => {
    const width = rightestPosition;
    const height = deepestPosition;
  };

  const createFakeBlock = () => {
    addBlock({
      id: "asdfuck",
      title: "Suck me",
      description: "You are very angering",
      dialogNodes: [],
      position: {
        x: 350,
        y: 250,
      },
    });
  };
  return (
    <div id="dashboard" ref={dashboardRef}>
      <div className="node-block-container">
        {allBlocks.map((block: INodeBlock) => (
          <NodeBlock
            key={block.id}
            block={block}
            recalculateDashboardSize={recalculateDashboardSize}
          />
        ))}
      </div>
      <div className="canvas-container">
        <Canvas />
      </div>
      <button onClick={createFakeBlock}>Add New Block</button>
    </div>
  );
};

export default observer(Dashboard);
