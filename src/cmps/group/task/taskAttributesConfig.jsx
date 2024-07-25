import React from 'react'
import { Checkbox, EditableText } from 'monday-ui-react-core'
import 'monday-ui-react-core/dist/main.css'
import TaskDatePicker from './dynamicCmps/TaskDatePicker.jsx'
import TaskStatus from './dynamicCmps/TaskStatus.jsx'
import TaskPriority from './dynamicCmps/TaskPriority.jsx'
import TaskMembers from './dynamicCmps/TaskMembers.jsx'
import TaskFiles from './dynamicCmps/TaskFiles.jsx'
import TaskDescription from './dynamicCmps/TaskDescription.jsx'
import TaskComments from './dynamicCmps/TaskComments.jsx'
import TaskChecklists from './dynamicCmps/TaskChecklists.jsx'

const taskAttributesConfig = {
    checkbox: {
        label: <Checkbox onClick={() => handleSelectAllCheckboxChange()} />,
        render: (task, members, labels, onUpdateField, columnKey, { selectedTasks, handleCheckboxChange }) => (
            <Checkbox checked={selectedTasks.includes(task._id)} onChange={() => handleCheckboxChange(task._id)} />
        ),
        className: 'table-cell checkbox-col',
        width: '50px',
    },
    title: {
        label: 'Task',
        render: (task, members, labels, onUpdateField, columnKey) => (
            <div className='task-row'>
                <div className='task-row-title' style={{ cursor: 'text' }}>
                    <EditableText value={task[columnKey]} onChange={value => onUpdateField(task, columnKey, value)} />
                </div>
                <div className='task-row-comments'>
                    <TaskComments task={task} members={members} onUpdateField={onUpdateField} columnKey={columnKey} />
                </div>
            </div>
        ),
        className: 'table-cell sticky-col task-col',
        width: '300px',
    },
    status: {
        label: 'Status',
        render: (task, members, labels, onUpdateField, columnKey) => (
            <TaskStatus task={task} onUpdateField={onUpdateField} columnKey={columnKey} />
        ),
        className: 'table-cell status-col',
        width: '140px',
    },
    priority: {
        label: 'Priority',
        render: (task, members, labels, onUpdateField, columnKey) => (
            <TaskPriority task={task} onUpdateField={onUpdateField} columnKey={columnKey} />
        ),
        className: 'table-cell priority-col',
        width: '140px',
    },
    dueDate: {
        label: 'Timeline',
        render: (task, members, labels, onUpdateField, columnKey) => (
            <TaskDatePicker task={task} onUpdateField={onUpdateField} columnKey={columnKey} />
        ),
        className: 'table-cell due-date-col',
        width: '140px',
    },
    memberIds: {
        label: 'Collaborators',
        render: (task, members, labels, onUpdateField, columnKey) => (
            <TaskMembers task={task} members={members} onUpdateField={onUpdateField} columnKey={columnKey} />
        ),
        className: 'table-cell members-col',
        width: '140px',
    },
    files: {
        label: 'Files',
        render: (task, members, labels, onUpdateField, columnKey) => (
            <TaskFiles task={task} onUpdateField={onUpdateField} columnKey={columnKey} />
        ),
        className: 'table-cell files-col',
        width: '140px',
    },
    description: {
        label: 'Description',
        render: (task, members, labels, onUpdateField, columnKey) => (
            <TaskDescription task={task} onUpdateField={onUpdateField} columnKey={columnKey} />
        ),
        className: 'table-cell description-col',
        width: '300px',
    },
    checklists: {
        label: 'Checklists',
        render: (task, members, labels, onUpdateField, columnKey) => (
            <TaskChecklists task={task} members={members} onUpdateField={onUpdateField} columnKey={columnKey} />
        ),
        className: 'table-cell checklists-col',
        width: '200px',
    },
}

export { taskAttributesConfig }
