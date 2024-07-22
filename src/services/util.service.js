export function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

export function makeLorem(size = 100) {
    var words = [
        'The sky',
        'above',
        'the port',
        'was',
        'the color of television',
        'tuned',
        'to',
        'a dead channel',
        '.',
        'All',
        'this happened',
        'more or less',
        '.',
        'I',
        'had',
        'the story',
        'bit by bit',
        'from various people',
        'and',
        'as generally',
        'happens',
        'in such cases',
        'each time',
        'it',
        'was',
        'a different story',
        '.',
        'It',
        'was',
        'a pleasure',
        'to',
        'burn',
    ]
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

export function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

export function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
}

export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : undefined
}

export function createLabel(title, color) {
    return {
        _id: makeId(),
        title,
        color,
    }
}

export function createMember(fullname, imgUrl) {
    return {
        _id: makeId(),
        fullname,
        imgUrl,
    }
}

export function createTask(title, options = {}) {
    return {
        _id: makeId(),
        title,
        archivedAt: options.archivedAt || null,
        status: options.status || null,
        priority: options.priority || null,
        dueDate: options.dueDate || null,
        description: options.description || null,
        comments: options.comments || [],
        checklists: options.checklists || [],
        memberIds: options.memberIds || [],
        labelIds: options.labelIds || [],
        byMember: options.byMember || null,
        style: options.style || {},
    }
}

export function createGroup(title, tasks = [], archivedAt = null) {
    return {
        _id: makeId(),
        title,
        archivedAt,
        tasks,
        style: { backgroundColor: getRandomColor() },
    }
}

export function createBoard(title, createdBy, label, members = [], groups = [], activities = [], isStarred = true) {
    return {
        _id: makeId(),
        title,
        isStarred: isStarred || false,
        archivedAt: null,
        createdBy,
        style: {
            backgroundImage: '',
        },
        label,
        members,
        groups,
        activities,
        cmpsOrder: ['title', 'status', 'memberIds', 'description', 'dueDate', 'files', 'priority', 'comments'],
    }
}

export function createBoards() {
    const member1 = createMember('Ariella Melnikov', 'https://res.cloudinary.com/dkykllpf5/image/upload/v1721649934/jzacprnumxyqpj1w0xah.jpg')
    const member2 = createMember('Bar Ben Haim', 'https://res.cloudinary.com/dkykllpf5/image/upload/v1721651006/dcll8jx7dtrrvsj3vhxe.jpg')
    const member3 = createMember('Nir Fakiro', 'https://res.cloudinary.com/dkykllpf5/image/upload/v1721651052/g2rk8iilfjyumxjvheid.jpg')

    const label1 = createLabel('Done', '#61bd4f')
    const label2 = createLabel('Progress', '#61bd33')

    const task1 = createTask('Replace logo', {
        description: 'Replace the current logo with the new design provided by the marketing team.',
        memberIds: [member1._id, member2._id],
        labelIds: [label1._id],
        comments: [
            {
                _id: makeId(),
                title: 'Initial comment',
                createdAt: randomPastTime(),
                byMember: member1,
            },
            {
                _id: makeId(),
                title: 'Logo draft looks good.',
                createdAt: randomPastTime(),
                byMember: member2,
            },
        ],
        checklists: [
            {
                _id: makeId(),
                title: 'Logo Replacement Checklist',
                todos: [
                    { _id: makeId(), title: 'Get approval from marketing', isDone: false },
                    { _id: makeId(), title: 'Update logo on website', isDone: false },
                ],
            },
        ],
        dueDate: '2024-10-10',
        status: 'Done',
        priority: 'Medium',
        style: { backgroundColor: '#f0f0f0' },
    })

    const task2 = createTask('Add Samples', {
        description: 'Add sample products to the store for testing purposes.',
        memberIds: [member2._id],
        labelIds: [label2._id],
        comments: [
            {
                _id: makeId(),
                title: 'Samples need to be added by next week.',
                createdAt: randomPastTime(),
                byMember: member3,
            },
        ],
        checklists: [
            {
                _id: makeId(),
                title: 'Sample Products Checklist',
                todos: [
                    { _id: makeId(), title: 'Gather sample data', isDone: true },
                    { _id: makeId(), title: 'Upload to store', isDone: false },
                ],
            },
        ],
        dueDate: '2024-08-15',
        status: 'Working on it',
        priority: 'High',
        style: { backgroundColor: '#e0f7fa' },
    })

    const task3 = createTask('Do that', {
        archivedAt: randomPastTime(),
        description: 'This task involves performing a specific set of actions.',
        memberIds: [member1._id, member3._id],
        labelIds: [label1._id, label2._id],
        comments: [
            {
                _id: makeId(),
                title: 'Please complete this task by end of the month.',
                createdAt: randomPastTime(),
                byMember: member2,
            },
        ],
        checklists: [
            {
                _id: makeId(),
                title: 'Action Items',
                todos: [
                    { _id: makeId(), title: 'Action 1', isDone: false },
                    { _id: makeId(), title: 'Action 2', isDone: false },
                ],
            },
        ],
        dueDate: '2024-07-31',
        status: 'Stuck',
        priority: 'Low',
        style: { backgroundColor: '#ffeb3b' },
    })

    const task4 = createTask('Help me', {
        status: 'Important',
        priority: 'Critical',
        dueDate: '2024-09-24',
        description: makeLorem(20),
        comments: [
            {
                _id: makeId(),
                title: 'also @yaronb please CR this',
                createdAt: randomPastTime(),
                byMember: member1,
            },
        ],
        checklists: [
            {
                _id: makeId(),
                title: 'Checklist',
                todos: [{ _id: makeId(), title: 'To Do 1', isDone: false }],
            },
        ],
        memberIds: [member1._id],
        labelIds: [label1._id, label2._id],
        byMember: member1,
        style: { backgroundColor: '#26de81' },
    })

    const group1 = createGroup('Group 1', [task1, task2], randomPastTime())
    const group2 = createGroup('Group 2', [task3, task4])

    const activity1 = {
        _id: makeId(),
        title: 'Changed Color',
        createdAt: randomPastTime(),
        byMember: member1,
        group: {
            _id: group1._id,
            title: 'Urgent Stuff',
        },
        task: {
            _id: task1._id,
            title: 'Replace Logo',
        },
    }

    const board1 = createBoard('Robot dev proj', member1, 'Tasks', [member2, member3], [group1, group2], [activity1])

    const board2 = createBoard(
        'Marketing Campaign',
        member2,
        'Projects',
        [member1, member3],
        [createGroup('Planning', [task1, task2]), createGroup('Execution', [task3, task4])]
    )

    const board3 = createBoard(
        'Website Redesign',
        member3,
        'Tasks',
        [member1, member2],
        [createGroup('Initial Setup', [task3, task4]), createGroup('Development', [task4, task1])]
    )

    return [board1, board2, board3]
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

export function createBoardDemo(title, label) {
    const member1 = createMember('Abi Abambi', 'http://some-img')

    // const label1 = createLabel('Done', '#61bd4f')
    // const label2 = createLabel('Progress', '#61bd33')

    const task1 = createTask(label)
    const task2 = createTask(label)
    const task3 = createTask(label)
    const task4 = createTask(label)

    const board = createBoard(
        title,
        member1,
        label,
        [member1],
        [createGroup('Group Title', [task1, task2]), createGroup('Group Title', [task3, task4])]
    )

    return board
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

