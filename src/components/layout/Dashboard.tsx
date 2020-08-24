import React, { useContext } from 'react'
import rootStore from '../../store/rootStore'
import INodeBlock from '../../interfaces/INodeBlock'
import NodeBlock from '../nodeBlocks/NodeBlock'

const Dashboard = () => {
    const { nodeStore: { allBlocks } } = useContext(rootStore);
    return (
        <div id="dashboard">
            {allBlocks.map((block: INodeBlock) => <NodeBlock key={block.id} block={block} />)}
        </div>
    )
}

export default Dashboard
