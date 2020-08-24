import IDialogNode from "./IDialogNode";
import IPosition from "./IPosition";

export default interface INodeBlock {
    id?: string;
    title: string;
    description?: string;
    dialogNodes: IDialogNode[],
    position: IPosition
}