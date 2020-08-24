import INodeBlock from '../interfaces/INodeBlock';
import IDialogNode from '../interfaces/IDialogNode';

export default class NodeBlockModel implements INodeBlock {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public dialogNodes: IDialogNode[]
    ){}
}