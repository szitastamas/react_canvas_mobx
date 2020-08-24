import React, { useRef, useEffect, useContext, useState } from "react";
import INodeBlock from "../../interfaces/INodeBlock";
import rootStore from "../../store/rootStore";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

interface IProps {
  block: INodeBlock;
  recalculateDashboardSize: () => void
}
const NodeBlock: React.FC<IProps> = ({
  block,
  recalculateDashboardSize
}) => {
  const {
    nodeStore: { getReferencesCount, updateBlockPosition, setDeepestNodeBlock, setRightestNodeBlock },
  } = useContext(rootStore);

  const [position, setPosition] = useState({
    x: block.position.x,
    y: block.position.y,
  });

  const [mouseRel, setMouseRel] = useState({
    x: 0,
    y: 0,
  });

  const [isDragging, setIsDragging] = useState(false);

  const blockRef = useRef(null);

  useEffect(() => {
    setElementPosition();
  }, []);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const draggedElement = (blockRef.current as unknown) as HTMLElement;

    setMouseRel({
      x: event.clientX - draggedElement.offsetLeft,
      y: event.clientY - draggedElement.offsetTop,
    });

    setIsDragging(true);

    event.stopPropagation();
    event.preventDefault();
  };

  const handleMouseMove = (event: any) => {
    if (!isDragging) return;

    setPosition({
      x: event.pageX - mouseRel.x,
      y: event.pageY - mouseRel.y,
    });

    updateBlockPosition(block.id!, position.x, position.y);
    setElementPosition();

    event.stopPropagation();
    event.preventDefault();
  };

  const setElementPosition = () => {
    const draggedElement = (blockRef.current as unknown) as HTMLElement;
    draggedElement.style.top = block.position.y + "px";
    draggedElement.style.left = block.position.x + "px";
  };

  const handleMouseRelease = () => {
    setIsDragging(false);
    setRightestNodeBlock();
    setDeepestNodeBlock();
  };

  return (
    <div
      ref={blockRef}
      className={`node-block`}
      draggable="true"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseRelease}
    >
      <div className="node-block-header">
        <div className="node-block-header-title">{block.title}</div>
        <div className="node-block-header-meta">
          ...has {block.dialogNodes.length} dialog nodes
        </div>
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
