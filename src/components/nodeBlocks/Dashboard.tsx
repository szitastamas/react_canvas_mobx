import React, { useContext } from 'react'
import nodeStore from '../../store/NodeStore'
import INodeBlock from '../../interfaces/INodeBlock'
import NodeBlock from './NodeBlock'

const Dashboard = () => {
    const { allBlocks } = useContext(nodeStore);
    return (
        <div id="dashboard">
            {allBlocks.map((block: INodeBlock) => <NodeBlock key={block.id} block={block} />)}
        </div>
    )
}

export default Dashboard
