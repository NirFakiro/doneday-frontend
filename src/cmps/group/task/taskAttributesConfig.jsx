import React, { useState, useEffect } from 'react'
import { Avatar, DatePicker, Dialog, DialogContentContainer, EditableText, Button } from 'monday-ui-react-core'
import 'monday-ui-react-core/dist/main.css'
import moment from 'moment'

const getPriorityStyle = value => {
    switch (value) {
        case 'Critical':
            return { backgroundColor: '#563E3E', color: '#F7F7F8' }
        case 'High':
            return { backgroundColor: '#401694', color: '#F7F7F8' }
        case 'Medium':
            return { backgroundColor: '#5559df', color: '#F7F7F8' }
        case 'Low':
            return { backgroundColor: '#579BFC', color: '#F7F7F8' }
        default:
            return { backgroundColor: '#D3D3D3', color: '#F7F7F8' }
    }
}

const getStatusStyle = value => {
    switch (value) {
        case 'Done':
            return { backgroundColor: '#00C875', color: '#F7F7F8' }
        case 'Working on it':
            return { backgroundColor: '#fdab3d', color: '#F7F7F8' }
        case 'Stuck':
            return { backgroundColor: '#DF2F4A', color: '#F7F7F8' }
        case 'Not Started':
            return { backgroundColor: '#C4C4C4', color: '#F7F7F8' }
        case 'Important':
            return { backgroundColor: '#007EB5', color: '#F7F7F8' }
        default:
            return { backgroundColor: '#C4C4C4', color: '#F7F7F8' }
    }
}

const cellStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
}

const taskAttributesConfig = {
    title: {
        label: 'Task',
        render: (task, members, labels, onUpdateField) => (
            <EditableText value={task.title} onChange={value => onUpdateField(task, 'title', value)} />
        ),
        className: 'table-cell sticky-col task-col',
        width: '200px',
    },
    status: {
        label: 'Status',
        render: (task, members, labels, onUpdateField) => (
            <div style={cellStyle}>
                <Dialog
                    zIndex={2}
                    content={
                        <DialogContentContainer style={{ width: '150px' }}>
                            <ul className='change-label-container flex align-center '>
                                {['Done', 'Working on it', 'Stuck', 'Not Started', 'Important'].map(status => (
                                    <li
                                        key={status}
                                        style={getStatusStyle(status)}
                                        onClick={() => onUpdateField(task, 'status', status)}
                                    >
                                        {status}
                                    </li>
                                ))}
                            </ul>
                        </DialogContentContainer>
                    }
                    hideTrigger={['clickoutside']}
                    position='bottom'
                    showTrigger={['click']}
                >
                    <div style={{ ...cellStyle, ...getStatusStyle(task.status || 'Not Started') }}>
                        {task.status || 'Not Started'}
                    </div>
                </Dialog>
            </div>
        ),
        className: 'table-cell status-col',
        width: '120px',
    },
    priority: {
        label: 'Priority',
        render: (task, members, labels, onUpdateField) => (
            <div style={cellStyle}>
                <Dialog
                    zIndex={2}
                    content={
                        <DialogContentContainer style={{ width: '150px' }}>
                            <ul className='change-label-container flex align-center '>
                                {['Critical', 'High', 'Medium', 'Low'].map(priority => (
                                    <li
                                        key={priority}
                                        style={getPriorityStyle(priority)}
                                        onClick={() => onUpdateField(task, 'priority', priority)}
                                    >
                                        {priority}
                                    </li>
                                ))}
                            </ul>
                        </DialogContentContainer>
                    }
                    hideTrigger={['clickoutside']}
                    position='bottom'
                    showTrigger={['click']}
                >
                    <div style={{ ...cellStyle, ...getPriorityStyle(task.priority || 'Medium') }}>
                        {task.priority || 'Medium'}
                    </div>
                </Dialog>
            </div>
        ),
        className: 'table-cell priority-col',
        width: '120px',
    },
    dueDate: {
        label: 'Due Date',
        render: (task, members, labels, onUpdateField) => {
            const dueDate = task.dueDate ? moment(task.dueDate) : null
            const formattedDueDate = dueDate ? dueDate.format('YYYY-MM-DD') : 'No Due Date'

            return (
                <div className='monday-storybook-dialog--story-padding'>
                    <Dialog
                        zIndex={2}
                        content={
                            <DialogContentContainer>
                                <DatePicker
                                    data-testid='date-picker'
                                    date={dueDate}
                                    onPickDate={value => onUpdateField(task, 'dueDate', value.format('YYYY-MM-DD'))}
                                />
                            </DialogContentContainer>
                        }
                        hideTrigger={['clickoutside']}
                        modifiers={[
                            {
                                name: 'preventOverflow',
                                options: {
                                    mainAxis: false,
                                },
                            },
                        ]}
                        position='bottom'
                        showTrigger={['click']}
                    >
                        <button className='timeline'>{formattedDueDate}</button>
                    </Dialog>
                </div>
            )
        },
        className: 'table-cell due-date-col',
        width: '150px',
    },
    memberIds: {
        label: 'Members',
        render: (task, members, labels, onUpdateField) => {
            return task.memberIds.map(memberId => {
                const member = members.find(member => member._id === memberId)
                const fullName = member ? member.fullname : 'Unknown'
                const nameParts = fullName.split(' ')
                const initials =
                    nameParts.length >= 2
                        ? `${nameParts[0].charAt(0).toUpperCase()}${nameParts[1].charAt(0).toUpperCase()}`
                        : fullName.charAt(0).toUpperCase()
                return (
                    <Avatar
                        key={memberId}
                        size={Avatar.sizes.SMALL}
                        type={Avatar.types.TEXT}
                        text={initials}
                        backgroundColor={Avatar.colors.AQUAMARINE}
                        onClick={() => {
                            const newMemberId = prompt('Enter new member ID', memberId)
                            if (newMemberId) {
                                const newMemberIds = task.memberIds.map(id => (id === memberId ? newMemberId : id))
                                onUpdateField(task, 'memberIds', newMemberIds)
                            }
                        }}
                    />
                )
            })
        },
        className: 'table-cell members-col',
        width: '100px',
    },
    files: {
        label: 'Files',
        render: (task, members, labels, onUpdateField) => {
            const [isDialogOpen, setIsDialogOpen] = useState(false)
            const [fileList, setFileList] = useState(task.files || [])

            const handleFileChange = event => {
                const files = Array.from(event.target.files)
                const updatedFiles = [...fileList, ...files]
                onUpdateField(task, 'files', updatedFiles)
                setFileList(updatedFiles)
                setIsDialogOpen(false)
            }

            useEffect(() => {
                setFileList(task.files || [])
            }, [task.files])

            return (
                <div style={cellStyle}>
                    <Dialog
                        zIndex={2}
                        isOpen={isDialogOpen}
                        onDialogDidHide={() => setIsDialogOpen(false)}
                        content={
                            <DialogContentContainer>
                                <input
                                    type='file'
                                    multiple
                                    onChange={handleFileChange}
                                    style={{ display: 'block', marginBottom: '10px' }}
                                />
                                <ul>
                                    {fileList.map((file, index) => (
                                        <li key={index}>{file.name}</li>
                                    ))}
                                </ul>
                            </DialogContentContainer>
                        }
                        hideTrigger={['clickoutside']}
                        position='bottom'
                        showTrigger={['click']}
                    >
                        <div style={{ width: '100%', textAlign: 'center' }} onClick={() => setIsDialogOpen(true)}>
                            +
                        </div>
                    </Dialog>
                </div>
            )
        },
        className: 'table-cell files-col',
        width: '140px',
    },
}

export { taskAttributesConfig, getPriorityStyle, getStatusStyle }
