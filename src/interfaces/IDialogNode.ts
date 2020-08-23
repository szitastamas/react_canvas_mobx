export default interface IDialogNode{
    id?: string | number;
    title: string;
    description?: string;
    attachedDialogNodes: (string|number)[];
}