import { observable, action, computed } from "mobx";
import NodeBlockModel from "../models/NodeBlockModel";
import IDialogNode from "../interfaces/IDialogNode";
import INodeBlock from "../interfaces/INodeBlock";
import DialogNodeModel from "../models/DialogNodeModel";
import { v4 } from "uuid";
import { createContext } from "react";

const initialState = [
    new NodeBlockModel(1, "Block One", "This is block one", [
        new DialogNodeModel(1, "Dialog Node One", []),
        new DialogNodeModel(2, "Dialog Node Two", [1])
    ]),
    new NodeBlockModel(2, "Block Two", "This is block two", [])
]

export class NodeStore {
  constructor() {
      initialState.forEach((block: NodeBlockModel) => this.addBlock(block))
  }
  @observable public blockRepository = new Map<string | number, INodeBlock>();
  @observable public selectedBlock: INodeBlock | null = null;


  @computed get allBlocks(){
      return [...this.blockRepository.values()]
  }

  // Setting a new entry in the node Map
  @action addBlock = (block: NodeBlockModel) => {
    this.blockRepository.set(block.id, block);
  };

  // Removing a complete block entry
  @action deleteBlock = (id: string | number) => {
    this.blockRepository.delete(id);
  };

  // Getting one particular block from the map
  @action selectBlock = (id: string | number) => {
    const block = this.blockRepository.get(id);
    console.log(block)
    if(!block) return;
    this.selectedBlock = block;
  };

  // Adding dialog chrildren to an existing block
  @action addDialogChildToBlock = (
    blockId: string | number,
    dialogNode: IDialogNode
  ) => {
    this.blockRepository.get(blockId)?.dialogNodes.push(dialogNode);
  };

  // Editing one dialog child of a certain block
  @action editDialogChild = (
    blockId: string | number,
    editedDialogNode: IDialogNode
  ) => {
    let toBeEditedNode = this.blockRepository
      .get(blockId)
      ?.dialogNodes.find(
        (node: IDialogNode) => node.id === editedDialogNode.id
      );

    toBeEditedNode = { ...toBeEditedNode, ...editedDialogNode };
  };

  // Removing a dialog child from a certain block
  // Removing the block if the last child was deleted
  @action removeDialogChild = (blockId: string | number, nodeId: string | number) => {
    const block = this.blockRepository.get(blockId);

    if (!block) return;

    const index = block?.dialogNodes.findIndex(
      (node: IDialogNode) => node.id === nodeId
    )!;

    if (index === -1) return;

    block?.dialogNodes.splice(index, 1);
  };

  @action getReferencesCount = (blockId: string | number | number) => {
    const refCount = this.blockRepository.get(blockId)?.dialogNodes.reduce((acc: number, node: IDialogNode) => acc+node.attachedDialogNodes.length, 0)
    return refCount;
  }

  @computed get nodeBlockCount() {
    return this.allBlocks.length;
  }
}

export default createContext(new NodeStore());