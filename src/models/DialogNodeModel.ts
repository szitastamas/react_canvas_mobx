import IDialogNode from "../interfaces/IDialogNode";

export default class DialogNodeModel implements IDialogNode {
  constructor(
    public id: string | number,
    public title: string,
    public attachedDialogNodes: (string|number)[]
  ) {}
}
