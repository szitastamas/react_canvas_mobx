import IDialogNode from "./IDialogNode";

export default interface INodeBlock {
    id?: string;
    title: string;
    description?: string;
    dialogNodes: IDialogNode[]
}