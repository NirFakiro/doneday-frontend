import React, { useState, useEffect } from 'react'
import GroupPreview from './GroupPreview'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'

import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { addGroup, removeGroup, updateGroup } from '../../store/actions/board.action'
import { GroupFilter } from './GroupFilter'

export function GroupList() {
    const { boardId } = useParams()
    const dispatch = useDispatch()
    const currBoard = useSelector(storeState => storeState.boardModule.boards.find(board => board._id === boardId))
    const [arrayToDisplay, setArrayToDisplay] = useState(currBoard?.groups || [])

    useEffect(() => {
        setArrayToDisplay(currBoard?.groups || [])
    }, [currBoard])

    async function onRemoveGroup(groupId) {
        try {
            await removeGroup(boardId, groupId)
            showSuccessMsg('Group removed')
        } catch (err) {
            showErrorMsg('Cannot remove group')
        }
    }

    async function onAddGroup() {
        try {
            await addGroup(boardId, 'New Group')
            showSuccessMsg('Group added')
        } catch (err) {
            showErrorMsg('Cannot add group')
        }
    }

    async function onUpdateGroup(groupId, updatedGroup) {
        try {
            await updateGroup(boardId, groupId, updatedGroup)
            showSuccessMsg('Group updated')
        } catch (err) {
            showErrorMsg('Cannot update group')
        }
    }

    if (!currBoard) return <div>Loading...</div>

    const handleSetArrayToDisplay = arr => {
        setArrayToDisplay(arr)
    }

    const groups = arrayToDisplay || currBoard?.groups

    return (
        <div className='group-list'>
            <GroupFilter setArrayToDisplayfromfather={handleSetArrayToDisplay} />
            {groups.map(group => (
                <div key={group._id}>
                    <GroupPreview
                        group={group}
                        members={currBoard.members}
                        labels={currBoard.labels}
                        onUpdateGroup={onUpdateGroup}
                        board={currBoard}
                    />
                    <button onClick={() => onRemoveGroup(group._id)}>Delete</button>
                </div>
            ))}
            <button onClick={onAddGroup}>Add Group</button>
        </div>
    )
}
