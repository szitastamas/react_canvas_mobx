import IDialogNode from "./IDialogNode";

export default interface INodeBlock {
    id?: string | number;
    title: string;
    description?: string;
    dialogNodes: IDialogNode[]
}