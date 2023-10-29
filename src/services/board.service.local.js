
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'boardDB'
export const boardService = {
    query,
    getById,
    save,
    remove,
    getCheckListStatus,
    getEmptyGroup,
    saveGroup,
    removeGroup,
    getGroupById,
    getEmptyLabel,
    getEmptyBoard,
    addActivity
}

window.bs = boardService

function getCheckListStatus(checkLists) {
    const checkListStatus = { done: 0, all: 0 }

    checkLists.forEach(checkList => checkList.todos.forEach(todo => {
        if (todo.isDone) {
            checkListStatus.done++
            checkListStatus.all++
        } else checkListStatus.all++
    })
    )
    return checkListStatus
}


async function query() {
    let boards = utilService.loadFromStorage(STORAGE_KEY)
    if (!boards || !boards.length) utilService.saveToStorage(STORAGE_KEY, board)
    boards = await storageService.query(STORAGE_KEY)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     boards = boards.filter(board => regex.test(board.title) || regex.test(board.description))
    // }
    // if (filterBy.price) {
    //     boards = boards.filter(board => board.price <= filterBy.price)
    // }
    return boards
}


async function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board, user, txt) {
    console.log('user:', user)
    var savedBoard 
    if (board._id) {        
        addActivity(board, user, txt)
        savedBoard = await storageService.put(STORAGE_KEY, board)
    } else {
        // Later, owner is set by the backend
        board.createdBy = userService.getLoggedinUser()
        addActivity(board, user, txt)

        savedBoard = await storageService.post(STORAGE_KEY, board)
    }
    return savedBoard
}

function getEmptyGroup() {
    return {
        title: '',
        tasks: [],
    }
}

async function getGroupById(groupId, boardId) {
    try {
        const board = await getById(boardId)
        const group = board.groups.find(group => group.id === groupId)
        return group
    } catch (err) {
        console.log('Failed to get group', err)
        throw err
    }
}

async function saveGroup(group, boardId, user, txt) {
    console.log('user:', user)
    try {
        let board = await getById(boardId)
        
        if (group.id) {
            const idx = board.groups.findIndex((currGroup) => currGroup.id === group.id)
            board.groups.splice(idx, 1, group)
        } else {
            group.id = utilService.makeId()
            board.groups.push(group)
        }

        addActivity(board, user, txt, group)

        return save(board)
    } catch (err) {
        console.log('couldnt save group', err)
        throw err
    }
}


async function removeGroup(group, boardId, user, txt) {
    try {
        const board = await getById(boardId)
        const updatedGroups = board.groups.filter((g) => g.id !== group.id)
        board.groups = updatedGroups
        addActivity(board, user, txt, group);

        return save(board)
    } catch (err) {
        console.log('Failed to remove group', err)
        throw err
    }
}

function addActivity(board, user, txt, { group, task } = {}) {
    console.log('user: from add', user)
    if(!user || !board || !txt) return
    // console.log('details:', details.group)
    // const activityTxt = generateActivityText(action, member.fullname, optionalDetails)
    const activity = {
        id: utilService.makeId(),
        txt,
        createdAt: Date.now(),
        byMember: user,
        group: {
            id: group?.id || '',
            title: group?.title || '',
        },
        task: {
            id: task?.id || '',
            title: task?.title || '',
        }    
    };
    board.activities.push(activity);
}


function getEmptyLabel() {
    return {
        id: utilService.makeId(),
        title: '',
        color: ''
    }
}

function getEmptyBoard() {
    return {
        title: '',
        isStarred: false,
        archivedAt: Date.now(),
        style: {
            backgroundImage: "",
            backgroundColor: "",
            dominantColor: {},
            isBright: null
        },
        labels: [
            {
                "id": "l101",
                "title": "Urgent",
                "color": "#4BCE97"
            },
            {
                "id": "l102",
                "title": "Tasks",
                "color": "#F5CD47"
            },
            {
                "id": "l103",
                "title": "Data",
                "color": "#FEA362"
            },
            {
                "id": "l104",
                "title": "",
                "color": "#F87168"
            },
            {
                "id": "l105",
                "title": "",
                "color": "#9F8FEF"
            },
            {
                "id": "l106",
                "title": "",
                "color": "#579DFF"
            },
        ],
        members: [
            {
                "_id": "m101",
                "fullname": "Maya Cohen",
                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367862/WhatsApp_Image_2023-10-04_at_00.10.22_fkybop.jpg"
            },
            {
                "_id": "r101",
                "fullname": "Reut Edry",
                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
            },
            {
                "_id": "s101",
                "fullname": "Sahar Machpud",
                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg"
            }
        ],
        groups: [
            { id: utilService.makeId(), title: '', tasks: [], style: {} }
        ],
        activities: [],
        cmpsOrder: ["StatusPicker", "MemberPicker", "DatePicker"]
    }
}


const board = [
    {
        _id: utilService.makeId(),
        title: "Final-project-dropping",  //need it for tasks D&D(using makeId())
        isStarred: true,
        archivedAt: 1589983468418,
        createdBy: {
            "_id": "u103",
            "fullname": "Sahar Machpud",
            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg"
        },
        style: {
            backgroundImage: "https://images.unsplash.com/photo-1696384036025-c7d7b7f6584d?auto=format&fit=crop&q=80&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            backgroundColor: "",
            dominantColor: { rgb: '18,27,42' },
            isBright: false
        },
        labels: [
            {
                "id": "l101",
                "title": "Urgent",
                "color": "#4BCE97"
            },
            {
                "id": "l102",
                "title": "Tasks",
                "color": "#F5CD47"
            },
            {
                "id": "l103",
                "title": "Data",
                "color": "#FEA362"
            },
            {
                "id": "l104",
                "title": "",
                "color": "#F87168"
            },
            {
                "id": "l105",
                "title": "",
                "color": "#9F8FEF"
            },
            {
                "id": "l106",
                "title": "",
                "color": "#579DFF"
            },
        ],
        members: [
            {
                "_id": "m101",
                "fullname": "Maya Cohen",
                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367862/WhatsApp_Image_2023-10-04_at_00.10.22_fkybop.jpg"
            },
            {
                "_id": "r101",
                "fullname": "Reut Edry",
                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
            },
            {
                "_id": "s101",
                "fullname": "Sahar Machpud",
                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg"
            }
        ],
        groups: [
            {
                "id": utilService.makeId(),
                "title": "Backlog-server",
                "isWatch": false,
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "title": "Demo data",
                        "description": null,
                        "cover": {
                            "isDark": false,
                            "isFull": false,
                            "backgroundColor": "",
                            "img": "https://planonsoftware.com/upload_mm/4/7/1/4719_fullimage_20210309-image-dataanalytics-magnifieroverview-high-3000x1987.jpg",
                            "createdAt": 1697584976000
                        },
                        "attachments": [
                            {
                                "id": utilService.makeId(),
                                "imgUrl": "https://planonsoftware.com/upload_mm/4/7/1/4719_fullimage_20210309-image-dataanalytics-magnifieroverview-high-3000x1987.jpg",
                                "createdAt": 1697584976000

                            }
                        ],
                        "byMember": {
                            "_id": "u102",
                            "fullname": "Reut Edry",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
                        },
                        "archivedAt": null,
                        "labelIds": ["l101", "l102", "l103"],
                        "memberIds": ["r101", "m101", "s101"],
                        "watching": true,
                        "createdAt": 1751449600000,
                        "dueDate": {
                            date: null,
                            isComplete: null,
                            isOverdue: null,
                            isDueSoon: null
                        },
                        "checklists": [
                            {
                                "id": utilService.makeId(),
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": utilService.makeId(),
                                        "title": "Finishing untill 16:30",
                                        "isDone": true
                                    },
                                    {
                                        "id": utilService.makeId(),
                                        "title": "Successing",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "comments": [
                            {
                                "id": utilService.makeId(),
                                "txt": "Important",
                                "createdAt": 1696334520,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Maya Cohen",
                                    "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367862/WhatsApp_Image_2023-10-04_at_00.10.22_fkybop.jpg"
                                }
                            }
                        ],
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Connect to Mongo",
                        "description": null,
                        "archivedAt": null,
                        "createdAt": 1680518400000,
                        "cover": {
                            "isDark": false,
                            "isFull": false,
                            "backgroundColor": "",
                            "img": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696368598/1_1_tasfsz.png",
                            "createdAt": 1698189776000
                        },
                        "byMember": {
                            "_id": "u103",
                            "fullname": "Sahar Machpud",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg"
                        },
                        "attachments": [
                            {
                                "id": utilService.makeId(),
                                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696368598/1_1_tasfsz.png",
                                "createdAt": 1698189776000,
                            },
                        ],
                        "comments": [],
                        "checklists": [],
                        "memberIds": ["s101"],
                        "labelIds": ["l101"],
                        "dueDate": {
                            date: null,
                            isComplete: null,
                            isOverdue: null,
                            isDueSoon: null
                        },
                        "watching": false
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Adding npm packages",
                        "description": null,
                        "archivedAt": null,
                        "createdAt": 1751449600000,
                        "cover": {
                            "isDark": false,
                            "isFull": false,
                            "backgroundColor": "",
                            "img": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696371749/npm_zfi8q9.png",
                            "createdAt": 1697671376000,

                        },
                        "byMember": {
                            "_id": "u102",
                            "fullname": "Reut Edry",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
                        },
                        "attachments": [
                            {
                                "id": utilService.makeId(),
                                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696371749/npm_zfi8q9.png",
                                "createdAt": 1696348680,
                            },
                        ],
                        "comments": [],
                        "checklists": [],
                        "memberIds": ["m101"],
                        "labelIds": ["l101"],
                        "dueDate": {
                            date: null,
                            isComplete: null,
                            isOverdue: null,
                            isDueSoon: null
                        },
                        "watching": true
                    }
                ],
                "style": {}
            },
            {
                "id": utilService.makeId(),
                "title": "Backlog-client",
                "isWatch": false,
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "title": "Add react-beautiful-dnd library",
                        "description": null,
                        "createdAt": 1635364800000,
                        "cover": {
                            "isDark": false,
                            "isFull": false,
                            "backgroundColor": "",
                            "img": "https://trello.com/1/cards/651c0842cf5946d21802327d/attachments/651c09552a41a0070e0715a1/previews/651c09552a41a0070e071635/download/rbdpng.png",
                            "createdAt": 1698103376000
                        },
                        "attachments": [
                            {
                                "id": utilService.makeId(),
                                "imgUrl": "https://trello.com/1/cards/651c0842cf5946d21802327d/attachments/651c09552a41a0070e0715a1/previews/651c09552a41a0070e071635/download/rbdpng.png",
                                "createdAt": 1698103376000
                            }
                        ],
                        "byMember": {
                            "_id": "u102",
                            "fullname": "Reut Edry",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
                        },
                        "archivedAt": null,
                        "labelIds": ["l101", "l102", "l103"],
                        "memberIds": ["r101", "m101", "s101"],
                        "watching": true,
                        "dueDate": {
                            date: null,
                            isComplete: null,
                            isOverdue: null,
                            isDueSoon: null
                        },
                        "checklists": [
                            {
                                "id": utilService.makeId(),
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": utilService.makeId(),
                                        "title": "Finishing untill 16:30",
                                        "isDone": true
                                    },
                                    {
                                        "id": utilService.makeId(),
                                        "title": "Successing",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "comments": [
                            {
                                "id": utilService.makeId(),
                                "txt": "Important",
                                "createdAt": 1696334520,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Maya Cohen",
                                    "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367862/WhatsApp_Image_2023-10-04_at_00.10.22_fkybop.jpg"
                                }
                            }
                        ],
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Project planning",
                        "description": null,
                        "archivedAt": null,
                        "createdAt": 1680518400000,
                        "cover": {
                            "isDark": false,
                            "isFull": false,
                            "backgroundColor": "",
                            "img": "https://trello.com/1/cards/651bebdea9a06da3b2b0cc78/attachments/651bfeba9907c9d50218de36/previews/651bfebc9907c9d50218e1d7/download/BUild-idea.jpg",
                            "createdAt": 1698103380000,

                        },
                        "byMember": {
                            "_id": "u103",
                            "fullname": "Sahar Machpud",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg"
                        },
                        "attachments": [
                            {
                                "id": utilService.makeId(),
                                "imgUrl": "https://trello.com/1/cards/651bebdea9a06da3b2b0cc78/attachments/651bfeba9907c9d50218de36/previews/651bfebc9907c9d50218e1d7/download/BUild-idea.jpg",
                                "createdAt": 1698103380000
                            },
                        ],
                        "comments": [],
                        "checklists": [],
                        "memberIds": ["r101"],
                        "labelIds": ["l101"],
                        "dueDate": {
                            date: null,
                            isComplete: null,
                            isOverdue: null,
                            isDueSoon: null
                        },
                        "watching": false
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Adding npm packages",
                        "description": null,
                        "archivedAt": null,
                        "createdAt": 1751449600000,
                        "cover": {
                            "isDark": false,
                            "isFull": false,
                            "backgroundColor": "",
                            "img": "https://trello.com/1/cards/651c0a337b39c5cdc0951338/attachments/651c3bbdee02e018d2d7b412/previews/651c3bbeee02e018d2d7b45f/download/npm2.png",
                            "createdAt": 1698016976000,
                        },
                        "byMember": {
                            "_id": "u102",
                            "fullname": "Reut Edry",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
                        },
                        "attachments": [
                            {
                                "id": "123abger",
                                "imgUrl": "https://trello.com/1/cards/651c0a337b39c5cdc0951338/attachments/651c3bbdee02e018d2d7b412/previews/651c3bbeee02e018d2d7b45f/download/npm2.png",
                                "createdAt": 1698016976000,
                            },
                        ],
                        "comments": [],
                        "checklists": [],
                        "memberIds": ["s101"],
                        "labelIds": ["l101"],
                        "dueDate": {
                            date: null,
                            isComplete: null,
                            isOverdue: null,
                            isDueSoon: null
                        },
                        "watching": true
                    }
                ],
                "style": {}
            },
            ///////////////
            {
                "id": utilService.makeId(),
                "title": "in-development",
                "isWatch": false,
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "title": "Add user auth",
                        "description": null,
                        "createdAt": 1716787200000,
                        "cover": {
                            "isDark": false,
                            "isFull": false,
                            "backgroundColor": "",
                            "img": "",
                            "createdAt": null
                        },
                        "attachments": [
                            {
                                "id": utilService.makeId(),
                                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696368347/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-07-20_131912_zfdlhz.png",
                                "createdAt": 1698016976000
                            }
                        ],
                        "byMember": {
                            "_id": "u102",
                            "fullname": "Reut Edry",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
                        },
                        "archivedAt": null,
                        "labelIds": ["l101", "l102", "l103"],
                        "memberIds": ["r101", "m101", "s101"],
                        "watching": true,
                        "dueDate": {
                            date: null,
                            isComplete: null,
                            isOverdue: null,
                            isDueSoon: null
                        },
                        "checklists": [
                            {
                                "id": utilService.makeId(),
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": utilService.makeId(),
                                        "title": "Finishing untill 16:30",
                                        "isDone": true
                                    },
                                    {
                                        "id": utilService.makeId(),
                                        "title": "Successing",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "comments": [
                            {
                                "id": utilService.makeId(),
                                "txt": "Important",
                                "createdAt": 1696334520,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Maya Cohen",
                                    "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367862/WhatsApp_Image_2023-10-04_at_00.10.22_fkybop.jpg"
                                }
                            }
                        ],
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Adding backend services",
                        "description": null,
                        "archivedAt": null,
                        "createdAt": 1751449600000,
                        "cover": {
                            "isDark": false,
                            "isFull": false,
                            "backgroundColor": "#f5cd47",
                            "img": "",
                            "createdAt": 1697412176000
                        },
                        "byMember": {
                            "_id": "u103",
                            "fullname": "Sahar Machpud",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg"
                        },
                        "attachments": [
                            {
                                "id": utilService.makeId(),
                                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg",
                                "createdAt": 1697412176000,
                            },
                        ],
                        "comments": [],
                        "checklists": [],
                        "memberIds": ["m101"],
                        "labelIds": ["l101"],
                        "dueDate": {
                            date: null,
                            isComplete: null,
                            isOverdue: null,
                            isDueSoon: null
                        },
                        "watching": false
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "SCSS Architecture",
                        "description": null,
                        "archivedAt": null,
                        "createdAt": 1635364800000,
                        "cover": {
                            "isDark": false,
                            "isFull": false,
                            "backgroundColor": "",
                            "img": "https://trello.com/1/cards/651bfda2b36856a0f1584811/attachments/651c05005a8ec24441d587b0/previews/651c05015a8ec24441d58821/download/SCSS.webp",
                            "createdAt": 1694820176000,
                        },
                        "byMember": {
                            "_id": "u102",
                            "fullname": "Reut Edry",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
                        },
                        "attachments": [
                            {
                                "id": utilService.makeId(),
                                "imgUrl": "https://trello.com/1/cards/651bfda2b36856a0f1584811/attachments/651c05005a8ec24441d587b0/previews/651c05015a8ec24441d58821/download/SCSS.webp",
                                "createdAt": 1694820176000,
                            },
                        ],
                        "comments": [],
                        "checklists": [],
                        "memberIds": ["r101"],
                        "labelIds": ["l101"],
                        "dueDate": {
                            date: null,
                            isComplete: null,
                            isOverdue: null,
                            isDueSoon: null
                        },
                        "watching": true
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Socket services",
                        "description": null,
                        "archivedAt": null,
                        "createdAt": 1680518400000,
                        "cover": {
                            "isDark": false,
                            "isFull": false,
                            "backgroundColor": "",
                            "img": "https://trello.com/1/cards/651c013b277d997329feec74/attachments/651c01446984182bc136bbb5/previews/651c01446984182bc136bc50/download/socketsImg.png",
                            "createdAt": 1696116176000
                        },
                        "byMember": {
                            "_id": "u103",
                            "fullname": "Sahar Machpud",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg"
                        },
                        "attachments": [
                            {
                                "id": utilService.makeId(),
                                "imgUrl": "https://trello.com/1/cards/651c013b277d997329feec74/attachments/651c01446984182bc136bbb5/previews/651c01446984182bc136bc50/download/socketsImg.png",
                                "createdAt": 1696116176000,
                            },
                        ],
                        "comments": [],
                        "checklists": [],
                        "memberIds": ["m101"],
                        "labelIds": ["l101"],
                        "dueDate": {
                            date: null,
                            isComplete: null,
                            isOverdue: null,
                            isDueSoon: null
                        },
                        "watching": false
                    }
                ],
                "style": {}
            },
            {
                "id": utilService.makeId(),
                "title": "QA",
                "isWatch": false,
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "title": "Bugs search",
                        "description": null,
                        "createdAt": 1751449600000,
                        "cover": {
                            "isDark": false,
                            "isFull": false,
                            "backgroundColor": "",
                            "img": "https://trello.com/1/cards/651c064b620e619a028eb825/attachments/651c3cb49a7657692aea99c3/previews/651c3cb59a7657692aea99d9/download/bug.png.jpg",
                            "createdAt": 1695943376000
                        },
                        "attachments": [
                            {
                                "id": utilService.makeId(),
                                "imgUrl": "https://trello.com/1/cards/651c064b620e619a028eb825/attachments/651c3cb49a7657692aea99c3/previews/651c3cb59a7657692aea99d9/download/bug.png.jpg",
                                "createdAt": 1695943376000
                            }
                        ],
                        "byMember": {
                            "_id": "u102",
                            "fullname": "Reut Edry",
                            "imgUrl": "https://trello.com/1/cards/651c064b620e619a028eb825/attachments/651c3cb49a7657692aea99c3/previews/651c3cb59a7657692aea99d9/download/bug.png.jpg"
                        },
                        "archivedAt": null,
                        "labelIds": ["l101", "l102", "l103"],
                        "memberIds": ["r101", "m101", "s101"],
                        "watching": true,
                        "dueDate": {
                            date: null,
                            isComplete: null,
                            isOverdue: null,
                            isDueSoon: null
                        },
                        "checklists": [
                            {
                                "id": utilService.makeId(),
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": utilService.makeId(),
                                        "title": "Finishing untill 16:30",
                                        "isDone": true
                                    },
                                    {
                                        "id": "212je",
                                        "title": "Successing",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "comments": [
                            {
                                "id": utilService.makeId(),
                                "txt": "Important",
                                "createdAt": 1696334520,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Maya Cohen",
                                    "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367862/WhatsApp_Image_2023-10-04_at_00.10.22_fkybop.jpg"
                                }
                            }
                        ],
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Check user auth",
                        "description": null,
                        "archivedAt": null,
                        "createdAt": 1716787200000,
                        "cover": {
                            "isDark": false,
                            "isFull": false,
                            "backgroundColor": "lightcyan",
                            "img": "",
                            "createdAt": 1692746576000,
                        },
                        "byMember": {
                            "_id": "u103",
                            "fullname": "Sahar Machpud",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg"
                        },
                        "attachments": [
                            {
                                "id": utilService.makeId(),
                                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg",
                                "createdAt": 1692746576000,
                            },
                        ],
                        "comments": [],
                        "checklists": [],
                        "memberIds": ["s101"],
                        "labelIds": ["l101"],
                        "dueDate": {
                            date: null,
                            isComplete: null,
                            isOverdue: null,
                            isDueSoon: null
                        },
                        "watching": false
                    },

                ],
                "style": {}
            },
            ///////////////
            {
                "id": utilService.makeId(),
                "title": "QA-Done",
                "isWatch": false,
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "title": "Regression testing",
                        "description": null,
                        "createdAt": 1751449600000,
                        "cover": {
                            "isDark": false,
                            "isFull": false,
                            "backgroundColor": "#f5cd47",
                            "img": "",
                            "createdAt": 1697152976000
                        },
                        "attachments": [
                            {
                                "id": utilService.makeId(),
                                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696368347/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-07-20_131912_zfdlhz.png",
                                "createdAt": 1697152976000
                            }
                        ],
                        "byMember": {
                            "_id": "u102",
                            "fullname": "Reut Edry",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
                        },
                        "archivedAt": null,
                        "labelIds": ["l101"],
                        "memberIds": ["m101"],
                        "watching": true,
                        "dueDate": {
                            date: null,
                            isComplete: null,
                            isOverdue: null,
                            isDueSoon: null
                        },
                        "checklists": [
                            {
                                "id": utilService.makeId(),
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": utilService.makeId(),
                                        "title": "Finishing untill 16:30",
                                        "isDone": true
                                    },
                                    {
                                        "id": utilService.makeId(),
                                        "title": "Successing",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "comments": [
                            {
                                "id": utilService.makeId(),
                                "txt": "Important",
                                "createdAt": 1696334520,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Maya Cohen",
                                    "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367862/WhatsApp_Image_2023-10-04_at_00.10.22_fkybop.jpg"
                                }
                            }
                        ]
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Spell check",
                        "description": null,
                        "createdAt": 1635364800000,
                        "cover": {
                            "isDark": false,
                            "isFull": false,
                            "backgroundColor": "",
                            "img": "",
                            "createdAt": null
                        },
                        "attachments": [
                            {
                                "id": utilService.makeId(),
                                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696368347/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-07-20_131912_zfdlhz.png",
                                "createdAt": 1697152976000
                            }
                        ],
                        "byMember": {
                            "_id": "u102",
                            "fullname": "Reut Edry",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
                        },
                        "archivedAt": null,
                        "labelIds": ["l101"],
                        "memberIds": ["r101"],
                        "watching": true,
                        "dueDate": {
                            date: null,
                            isComplete: null,
                            isOverdue: null,
                            isDueSoon: null
                        },
                        "checklists": [
                            {
                                "id": utilService.makeId(),
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": utilService.makeId(),
                                        "title": "Finishing untill 16:30",
                                        "isDone": true
                                    },
                                    {
                                        "id": utilService.makeId(),
                                        "title": "Successing",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "comments": [
                            {
                                "id": utilService.makeId(),
                                "txt": "Important",
                                "createdAt": 1696334520,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Maya Cohen",
                                    "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367862/WhatsApp_Image_2023-10-04_at_00.10.22_fkybop.jpg"
                                }
                            }
                        ]
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "A/B Testing",
                        "description": null,
                        "createdAt": 1635364800000,
                        "cover": {
                            "isDark": false,
                            "isFull": false,
                            "backgroundColor": "#4bce97",
                            "img": "",
                            "createdAt": 1698276434000
                        },
                        "attachments": [

                        ],
                        "byMember": {
                            "_id": "u102",
                            "fullname": "Reut Edry",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
                        },
                        "archivedAt": null,
                        "labelIds": ["l101"],
                        "memberIds": ["m101"],
                        "watching": true,
                        "dueDate": {
                            date: null,
                            isComplete: null,
                            isOverdue: null,
                            isDueSoon: null
                        },
                        "checklists": [
                            {
                                "id": utilService.makeId(),
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": utilService.makeId(),
                                        "title": "Finishing untill 16:30",
                                        "isDone": true
                                    },
                                    {
                                        "id": utilService.makeId(),
                                        "title": "Successing",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "comments": [
                            {
                                "id": utilService.makeId(),
                                "txt": "Important",
                                "createdAt": 1696334520,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Maya Cohen",
                                    "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367862/WhatsApp_Image_2023-10-04_at_00.10.22_fkybop.jpg"
                                }
                            }
                        ]
                    }


                ],

                "style": {}
            },
            {
                "id": utilService.makeId(),
                "title": "Ready for production",
                "isWatch": true,
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "title": "Deployment",
                        "description": null,
                        "createdAt": 1635364800000,
                        "cover": {
                            "isDark": false,
                            "isFull": false,
                            "backgroundColor": "",
                            "img": "https://trello.com/1/cards/651c07991b3e73159882ad29/attachments/651c08eb8236c4a95c479066/previews/651c08ec8236c4a95c4790d2/download/Cloud-computing-deployment-models-1000x503.jpg",
                            "createdAt": 1698276176000
                        },
                        "attachments": [
                            {
                                "id": utilService.makeId(),
                                "imgUrl": "https://trello.com/1/cards/651c07991b3e73159882ad29/attachments/651c08eb8236c4a95c479066/previews/651c08ec8236c4a95c4790d2/download/Cloud-computing-deployment-models-1000x503.jpg",
                                "createdAt": 1698276176000
                            }
                        ],
                        "byMember": {
                            "_id": "u102",
                            "fullname": "Reut Edry",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
                        },
                        "archivedAt": null,
                        "labelIds": ["l101", "l102", "l103"],
                        "memberIds": ["r101", "m101", "s101"],
                        "watching": true,
                        "dueDate": {
                            date: null,
                            isComplete: null,
                            isOverdue: null,
                            isDueSoon: null
                        },
                        "checklists": [
                            {
                                "id": utilService.makeId(),
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": utilService.makeId(),
                                        "title": "Finishing untill 16:30",
                                        "isDone": true
                                    },
                                    {
                                        "id": utilService.makeId(),
                                        "title": "Successing",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "comments": [
                            {
                                "id": utilService.makeId(),
                                "txt": "Important",
                                "createdAt": 1696334520,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Maya Cohen",
                                    "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367862/WhatsApp_Image_2023-10-04_at_00.10.22_fkybop.jpg"
                                }
                            }
                        ]
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Documentation",
                        "description": null,
                        "createdAt": 1716787200000,
                        "cover": {
                            "isDark": false,
                            "isFull": false,
                            "backgroundColor": "#8590a2",
                            "img": "",
                            "createdAt": 1698189776000
                        },
                        "attachments": [

                        ],
                        "byMember": {
                            "_id": "u102",
                            "fullname": "Reut Edry",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
                        },
                        "archivedAt": null,
                        "labelIds": ["l101", "l102", "l103"],
                        "memberIds": ["r101", "m101", "s101"],
                        "watching": true,
                        "dueDate": {
                            date: null,
                            isComplete: null,
                            isOverdue: null,
                            isDueSoon: null
                        },
                        "checklists": [
                            {
                                "id": utilService.makeId(),
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": utilService.makeId(),
                                        "title": "Finishing untill 16:30",
                                        "isDone": true
                                    },
                                    {
                                        "id": utilService.makeId(),
                                        "title": "Successing",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "comments": [
                            {
                                "id": utilService.makeId(),
                                "txt": "Important",
                                "createdAt": 1696334520,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Maya Cohen",
                                    "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367862/WhatsApp_Image_2023-10-04_at_00.10.22_fkybop.jpg"
                                }
                            }
                        ]
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Test data",
                        "description": null,
                        "createdAt": 1680518400000,
                        "cover": {
                            "isDark": false,
                            "isFull": false,
                            "backgroundColor": "#6cc3e0",
                            "img": "",
                            "createdAt": 1698099776000
                        },
                        "attachments": [

                        ],
                        "byMember": {
                            "_id": "u102",
                            "fullname": "Reut Edry",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
                        },
                        "archivedAt": null,
                        "labelIds": ["l103"],
                        "memberIds": ["r101", "m101", "s101"],
                        "watching": true,
                        "dueDate": {
                            date: null,
                            isComplete: null,
                            isOverdue: null,
                            isDueSoon: null
                        },
                        "checklists": [
                            {
                                "id": utilService.makeId(),
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": utilService.makeId(),
                                        "title": "Finishing untill 16:30",
                                        "isDone": true
                                    },
                                    {
                                        "id": utilService.makeId(),
                                        "title": "Successing",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "comments": [
                            {
                                "id": utilService.makeId(),
                                "txt": "Important",
                                "createdAt": 1696334520,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Maya Cohen",
                                    "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367862/WhatsApp_Image_2023-10-04_at_00.10.22_fkybop.jpg"
                                }
                            }
                        ]
                    },


                ],

                "style": {}
            }
        ],
        activities: [
            {
                "id": utilService.makeId(),
                "txt": "marked the due date incomplete",
                "createdAt": 1698321100,
                "byMember": {
                    "_id": "u102",
                    "fullname": "Reut Edry",
                    "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
                },
                "group": {
                    "id": utilService.makeId(),
                    "title": "Backlog-server"
                },
                "task": {
                    "id": utilService.makeId(),
                    "title": "Demo data"
                }
            },
            {
                "id": utilService.makeId(),
                "txt": "changed the background of this board",
                "createdAt": 1698413300,
                "byMember": {
                    "_id": "u103",
                    "fullname": "Sahar Machpud",
                    "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg"
                },
                "group": {
                    "id": utilService.makeId(),
                    "title": "Backlog-server"
                },
                "task": {
                    "id": utilService.makeId(),
                    "title": "Connect to Mongo"
                }
            },
            {
                "id": utilService.makeId(),
                "txt": "Changed description of this board",
                "createdAt": 1698510000,
                "byMember": {
                    "_id": "u101",
                    "fullname": "Maya Cohen",
                    "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367862/WhatsApp_Image_2023-10-04_at_00.10.22_fkybop.jpg"
                },
                "group": {
                    "id": utilService.makeId(),
                    "title": "Backlog-server"
                },
                "task": {
                    "id": utilService.makeId(),
                    "title": "Connect to Mongo"
                }
            }


        ],

        cmpsOrder: ["StatusPicker", "MemberPicker", "DatePicker"]
    },
    {
        _id: utilService.makeId(),
        title: 'Wow',
        isStarred: false,
        archivedAt: Date.now(),
        createdBy: {
            "_id": "u103",
            "fullname": "Sahar Machpud",
            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg"
        },
        style: {
            backgroundImage: "https://images.unsplash.com/photo-1696580436068-f19c26850e8b?auto=format&fit=crop&q=80&w=2071&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            backgroundColor: "",
            dominantColor: { rgb: '29,31,30' },
            isBright: false
        },
        labels: [
            {
                "id": "l101",
                "title": "Urgent",
                "color": "#4BCE97"
            },
            {
                "id": "l102",
                "title": "Tasks",
                "color": "#F5CD47"
            },
            {
                "id": "l103",
                "title": "Data",
                "color": "#FEA362"
            },
            {
                "id": "l104",
                "title": "",
                "color": "#F87168"
            },
            {
                "id": "l105",
                "title": "",
                "color": "#9F8FEF"
            },
            {
                "id": "l106",
                "title": "",
                "color": "#579DFF"
            },
        ],
        members: [
            {
                "_id": "m101",
                "fullname": "Maya Cohen",
                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367862/WhatsApp_Image_2023-10-04_at_00.10.22_fkybop.jpg"
            },
            {
                "_id": "r101",
                "fullname": "Reut Edry",
                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
            },
            {
                "_id": "s101",
                "fullname": "Sahar Machpud",
                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg"
            }
        ],
        groups: [
            { id: utilService.makeId(), title: '', tasks: [], style: {} }
        ],
        activities: [],
        cmpsOrder: ["StatusPicker", "MemberPicker", "DatePicker"]
    },
    {
        _id: utilService.makeId(),
        title: 'Wow2',
        isStarred: false,
        archivedAt: Date.now(),
        createdBy: {
            "_id": "u103",
            "fullname": "Sahar Machpud",
            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg"
        },
        style: {
            backgroundImage: "https://res.cloudinary.com/duvatj8kg/image/upload/v1697202495/aec98becb6d15a5fc95e_dseafo.svg",
            backgroundColor: "",
            dominantColor: { rgb: '230,85,54' },
            isBright: false
        },
        labels: [
            {
                "id": "l101",
                "title": "Urgent",
                "color": "#4BCE97"
            },
            {
                "id": "l102",
                "title": "Tasks",
                "color": "#F5CD47"
            },
            {
                "id": "l103",
                "title": "Data",
                "color": "#FEA362"
            },
            {
                "id": "l104",
                "title": "",
                "color": "#F87168"
            },
            {
                "id": "l105",
                "title": "",
                "color": "#9F8FEF"
            },
            {
                "id": "l106",
                "title": "",
                "color": "#579DFF"
            },
        ],
        members: [
            {
                "_id": "m101",
                "fullname": "Maya Cohen",
                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367862/WhatsApp_Image_2023-10-04_at_00.10.22_fkybop.jpg"
            },
            {
                "_id": "r101",
                "fullname": "Reut Edry",
                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
            },
            {
                "_id": "s101",
                "fullname": "Sahar Machpud",
                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg"
            }
        ],
        groups: [
            { id: utilService.makeId(), title: '', tasks: [], style: {} }
        ],
        activities: [],
        cmpsOrder: ["StatusPicker", "MemberPicker", "DatePicker"]
    },
    {
        _id: utilService.makeId(),
        title: 'Wow3',
        isStarred: false,
        archivedAt: Date.now(),
        createdBy: {
            "_id": "u103",
            "fullname": "Sahar Machpud",
            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg"
        },
        style: {
            backgroundImage: "https://images.unsplash.com/photo-1594743896255-be81f8dfec3d?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            backgroundColor: "",
            dominantColor: { rgb: '222,208,223' },
            isBright: true
        },
        labels: [
            {
                "id": "l101",
                "title": "Urgent",
                "color": "#4BCE97"
            },
            {
                "id": "l102",
                "title": "Tasks",
                "color": "#F5CD47"
            },
            {
                "id": "l103",
                "title": "Data",
                "color": "#FEA362"
            },
            {
                "id": "l104",
                "title": "",
                "color": "#F87168"
            },
            {
                "id": "l105",
                "title": "",
                "color": "#9F8FEF"
            },
            {
                "id": "l106",
                "title": "",
                "color": "#579DFF"
            },
        ],
        members: [
            {
                "_id": "m101",
                "fullname": "Maya Cohen",
                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367862/WhatsApp_Image_2023-10-04_at_00.10.22_fkybop.jpg"
            },
            {
                "_id": "r101",
                "fullname": "Reut Edry",
                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
            },
            {
                "_id": "s101",
                "fullname": "Sahar Machpud",
                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg"
            }
        ],
        groups: [
            { id: utilService.makeId(), title: '', tasks: [], style: {} }
        ],
        activities: [],
        cmpsOrder: ["StatusPicker", "MemberPicker", "DatePicker"]
    }
]

