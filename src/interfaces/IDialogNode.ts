export default interface IDialogNode{
    id?: string | number;
    title: string;
    description?: string;
    blockId: string;
    parentDialogNode: string | null;
    nextDialogNodes: string[];
}