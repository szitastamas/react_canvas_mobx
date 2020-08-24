import React, { useRef, useEffect, useContext, useState } from "react";
import INodeBlock from "../../interfaces/INodeBlock";
import rootStore from "../../store/rootStore";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

const NodeBlock: React.FC<{ block: INodeBlock }> = ({ block }) => {
  const {
    nodeStore: { getReferencesCount, updateBlockPosition },
  } = useContext(rootStore);

  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });

  const [mouseRel, setMouseRel] = useState({
    x: 0,
    y: 0
  });

  const [isDragging, setIsDragging] = useState(false);

  const blockRef = useRef(null);

  useEffect(() => {
    calculatePosition()
    console.log(block)
  }, [block.position, updateBlockPosition])

  const handleDragStart = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const draggedElement = (blockRef.current as unknown) as HTMLElement;
    setMouseRel({
      x: event.clientX - draggedElement.offsetLeft,
      y: event.clientY - draggedElement.offsetTop
    })
    
    setIsDragging(true);

    // setTimeout(()=>{
    //   draggedElement.style.display = "none"
    // }, 0)

    event.stopPropagation();
    // event.preventDefault();
  }
  
  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    if(!isDragging) return;
    
    setPosition({
      x: event.pageX - mouseRel.x,
      y: event.pageY - mouseRel.y
    })

    updateBlockPosition(block.id!, position.x, position.y)
    calculatePosition();
    event.stopPropagation();
    event.preventDefault();
  };

  const calculatePosition = () => {
    const draggedElement = (blockRef.current as unknown) as HTMLElement;
    
    draggedElement.style.top = (block.position.y) + "px";
    draggedElement.style.left = (block.position.x) + "px";
  }

  const closeDragging = () => {
    const draggedElement = (blockRef.current as unknown) as HTMLElement;
    setIsDragging(false);
    draggedElement.style.display = "block"
  }

  return (
    <div ref={blockRef} className={`node-block`} draggable="true" onMouseDown={handleDragStart} onDrag={handleDrag} onDragEnd={closeDragging}>
      <div className="node-block-header">
        <div className="node-block-header-title">{block.title}</div>
        <div className="node-block-header-meta">...has {block.dialogNodes.length} dialog nodes</div>
      </div>
      <div className="node-block-body">
        <div className="node-block-body-description">{block.description}</div>
        <div className="node-block-body-references">
          <h5>Has reference to {getReferencesCount(block.id!)} node(s).</h5>
        </div>
      </div>
      <div className="node-block-footer">
        <Link to={`blocks/${block.id!}`} className="node-block-footer-link">
          Open Block
        </Link>
      </div>
    </div>
  );
};

export default observer(NodeBlock);
