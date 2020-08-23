import { v4 } from 'uuid'
import INodeBlock from '../interfaces/INodeBlock';
import IDialogNode from '../interfaces/IDialogNode';

export default class NodeBlockModel implements INodeBlock {
    constructor(
        public id: string | number,
        public title: string,
        public description: string,
        public dialogNodes: IDialogNode[]
    ){}
}