import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import nodeStore from '../../store/NodeStore'
import { observer } from 'mobx-react-lite'

const DialogDetails = () => {
    const { blockId } = useParams()

    const { selectBlock, selectedBlock } = useContext(nodeStore);

    useEffect(() => {
        if(!selectedBlock || selectedBlock.id !== blockId){
            selectBlock(blockId);
        }
    }, [blockId, selectBlock, selectedBlock])

    return (
        <div>
            I am the detail page for {selectedBlock ? selectedBlock!.title : "NOT FOUND"}
        </div>
    )
}

export default observer(DialogDetails)
