import { observable, action, computed } from "mobx";
import NodeBlockModel from "../models/NodeBlockModel";
import IDialogNode from "../interfaces/IDialogNode";
import INodeBlock from "../interfaces/INodeBlock";
import DialogNodeModel from "../models/DialogNodeModel";
import { v4 } from "uuid";
import { RootStore } from "./rootStore";

const initialState = [
    new NodeBlockModel("1", "Block One", "This is block one", [
        new DialogNodeModel("1", "Dialog Node One", "1", null, []),
        new DialogNodeModel("2", "Dialog Node Two", "1", null, ["1"])
    ]),
    new NodeBlockModel("2", "Block Two", "This is block two", [])
]

export class NodeStore {
  constructor(public rootStore: RootStore) {
      initialState.forEach((block: NodeBlockModel) => this.addBlock(block))
  }
  @observable public blockRepository = new Map<string, INodeBlock>();
  @observable public blocks: INodeBlock[] = initialState;
  @observable public selectedBlock: INodeBlock | null = null;
  @observable deepestPosition: number = 0;
  @observable rightestPosition: number = 0;


  @computed get allBlocks(){
      return [...this.blockRepository.values()]
  }

  // Setting a new entry in the node Map
  @action addBlock = (block: NodeBlockModel) => {
    this.blockRepository.set(block.id, block);
  };

  // Removing a complete block entry
  @action deleteBlock = (id: string) => {
    this.blockRepository.delete(id);
  };

  // Getting one particular block from the map
  @action selectBlock = (id: string) => {
    const block = this.blockRepository.get(id);
    if(!block) return;
    this.selectedBlock = block;
  };

  // Adding dialog chrildren to an existing block
  @action addDialogChildToBlock = (
    blockId: string,
    dialogNode: IDialogNode
  ) => {
    this.blockRepository.get(blockId)?.dialogNodes.push(dialogNode);
  };

  // Editing one dialog child of a certain block
  @action editDialogChild = (
    blockId: string,
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
  @action removeDialogChild = (blockId: string, nodeId: string) => {
    const block = this.blockRepository.get(blockId);

    if (!block) return;

    const index = block?.dialogNodes.findIndex(
      (node: IDialogNode) => node.id === nodeId
    )!;

    if (index === -1) return;

    block?.dialogNodes.splice(index, 1);
  };

  @action getReferencesCount = (blockId: string) => {
    const refCount = this.blockRepository.get(blockId)?.dialogNodes.reduce((acc: number, node: IDialogNode) => acc+node.nextDialogNodes.length, 0)
    return refCount;
  }

  // Updating the block's position so that it can be rerendered on the right spot
  @action updateBlockPosition = (
    blockId: string, 
    newPosX: number, 
    newPosY: number) => {
      const block = this.blockRepository.get(blockId)
      if(!block) return;
      block.position.x = newPosX;
      block.position.y = newPosY;
  }

  @action setDeepestNodeBlock = () => {
    const deepestBlockPosition = this.allBlocks.map((block: INodeBlock) => block.position).map(pos => pos.y).sort((a,b) => b - a)[0]
    console.log(deepestBlockPosition)
    this.deepestPosition = this.allBlocks.find(block => block.position.y === deepestBlockPosition)!.position.height!;
  }

  @action setRightestNodeBlock = () => {
    const rightestBlockPosition = this.allBlocks.map((block: INodeBlock) => block.position).sort((a,b) => b.x - a.x)[0]
    this.rightestPosition =  this.allBlocks.find(block => block.position === rightestBlockPosition)!.position.width!;
  }

  @computed get nodeBlockCount() {
    return this.allBlocks.length;
  }
}

export default NodeStore;