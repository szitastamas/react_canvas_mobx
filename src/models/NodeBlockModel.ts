import INodeBlock from '../interfaces/INodeBlock';
import IDialogNode from '../interfaces/IDialogNode';
import IPosition from '../interfaces/IPosition';

export default class NodeBlockModel implements INodeBlock {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public dialogNodes: IDialogNode[],
        public position: IPosition = { "x": 0, "y": 0, "height": 300, "width": 250 }
    ){}
}