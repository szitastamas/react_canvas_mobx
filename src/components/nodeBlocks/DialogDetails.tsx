import React, { useEffect, useContext } from "react";
import { useParams } from "react-router";
import rootStore from "../../store/rootStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const DialogDetails = () => {
  const { blockId } = useParams();

  const {
    nodeStore: { selectBlock, selectedBlock },
  } = useContext(rootStore);

  useEffect(() => {
    if (!selectedBlock || selectedBlock.id !== blockId) {
      selectBlock(blockId);
    }
  }, [blockId, selectBlock, selectedBlock]);

  return (
    <div>
      <Link to="/dashboard" className="btn">Back</Link>
      <p>I am the detail page for {selectedBlock ? selectedBlock!.title : "NOT FOUND"}</p>
    </div>
  );
};

export default observer(DialogDetails);
