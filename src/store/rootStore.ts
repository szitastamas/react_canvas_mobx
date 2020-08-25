import { createContext } from "react";
import { NodeStore } from "./NodeStore";
import { CanvasStore } from "./CanvasStore";

export class RootStore {
    nodeStore: NodeStore;
    canvasStore: CanvasStore;
    
    constructor(){
        this.nodeStore = new NodeStore(this);
        this.canvasStore = new CanvasStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore())