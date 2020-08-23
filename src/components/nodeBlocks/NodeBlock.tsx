import React, { useRef, useEffect, useContext } from "react";
import INodeBlock from "../../interfaces/INodeBlock";
import nodeStore from "../../store/NodeStore";
import { Link } from "react-router-dom";
import { observer } from 'mobx-react-lite'

const NodeBlock: React.FC<{ block: INodeBlock }> = ({ block }) => {

  const { getReferencesCount } = useContext(nodeStore);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {};
  
  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
  }

  return (
    <div 
      className="node-block" 
      draggable="true" 
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      >
      <div className="node-block-header">
        <div className="node-block-header-title">{block.title}</div>
        <div className="node-block-header-meta">
          ...has: {block.dialogNodes.length} dialog nodes
        </div>
      </div>
      <div className="node-block-body">
        <div className="node-block-body-description">{block.description}</div>
        <div className="node-block-body-references">
          <h5>Has reference to {getReferencesCount(block!.id!)} node(s).</h5>
        </div>
      </div>
      <div className="node-block-footer">
        <Link to={`blocks/${block!.id!}`} className="node-block-footer-link">Open Block</Link>
      </div>
    </div>
  );
};

export default observer(NodeBlock);
