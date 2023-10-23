
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'boardDB'
export const boardService = {
    query,
    getById,
    save,
    remove,
    getLabels,
    getCheckListStatus,
    getMembers,
    getEmptyGroup,
    saveGroup,
    removeGroup,
    getGroupById,
    getEmptyLabel,
    getEmptyBoard,
}

window.bs = boardService

function getLabels(labelsIds, boardLabels) {
    return boardLabels.filter(label => labelsIds.includes(label.id))
}

function getMembers(memberIds, boardMembers) {
    return boardMembers.filter(member => memberIds.includes(member._id))
}

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

async function remove(babaId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, babaId)
}

async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
    } else {
        // Later, owner is set by the backend
        // board.owner = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, board)
    }
    return savedBoard
}

// async function addBabaMsg(babaId, txt) {
//     // Later, this is all done by the backend
//     const baba = await getById(babaId)
//     if (!baba.msgs) baba.msgs = []

//     const msg = {
//         id: utilService.makeId(),
//         by: userService.getLoggedinUser(),
//         txt
//     }
//     baba.msgs.push(msg)
//     await storageService.put(STORAGE_KEY, baba)

//     return msg
// }

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
        console.log('group from boardService', group);
        return group
    } catch (err) {
        console.log('Failed to get group', err)
        throw err
    }
}

async function saveGroup(group, boardId) {
    try {
        let board = await getById(boardId)
        if (group.id) {
            const idx = board.groups.findIndex((currGroup) => currGroup.id === group.id)
            board.groups.splice(idx, 1, group)
        } else {
            group.id = utilService.makeId()
            board.groups.push(group)
        }
        return save(board)
    } catch (err) {
        console.log('couldnt save group', err)
        throw err
    }
}

async function removeGroup(groupId, boardId) {
    try {
        const board = await getById(boardId)
        const updatedGroups = board.groups.filter((group) => group.id !== groupId)
        board.groups = updatedGroups
        return save(board)
    } catch (err) {
        console.log('Failed to remove group', err)
        throw err
    }
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
        createdBy: {
            "_id": "u103",
            "fullname": "Sahar Machpud",
            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg"
        },
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
                "_id": "u101",
                "fullname": "Maya Cohen",
                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367862/WhatsApp_Image_2023-10-04_at_00.10.22_fkybop.jpg"
            },
            {
                "_id": "u102",
                "fullname": "Reut Edry",
                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
            },
            {
                "_id": "u103",
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
        _id: "b106",
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
                "_id": "u101",
                "fullname": "Maya Cohen",
                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367862/WhatsApp_Image_2023-10-04_at_00.10.22_fkybop.jpg"
            },
            {
                "_id": "u102",
                "fullname": "Reut Edry",
                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
            },
            {
                "_id": "u103",
                "fullname": "Sahar Machpud",
                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg"
            }
        ],
        groups: [
            {
                "id": utilService.makeId(),
                "title": "Backlog-server",
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "title": "Demo data",
                        "description": null,
                        "cover": {
                            "backgroundColor": "",
                            "img": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696368347/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-07-20_131912_zfdlhz.png",
                            "createdAt": 1696332780
                        },
                        "attachments": [
                            {
                                "id": utilService.makeId(),
                                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696368347/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-07-20_131912_zfdlhz.png"
                            }
                        ],
                        "byMember": {
                            "_id": "u102",
                            "fullname": "Reut Edry",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
                        },
                        "archivedAt": null,
                        "labelIds": ["l101", "l102", "l103"],
                        "memberIds": ["u101", "u102", "u103"],
                        "watching": true,
                        "dueDate": null,
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
                        "cover": {
                            "backgroundColor": "",
                            "img": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696368598/1_1_tasfsz.png"
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
                                'createdAt': 1696333740,
                            },
                        ],
                        "comments": [],
                        "checklists": [],
                        "memberIds": ["u102"],
                        "labelIds": ["l101"],
                        "dueDate": null,
                        "watching": false
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Adding npm packages",
                        "description": null,
                        "archivedAt": null,
                        "cover": {
                            "backgroundColor": "",
                            "img": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696371749/npm_zfi8q9.png"
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
                                'createdAt': 1696348680,
                            },
                        ],
                        "comments": [],
                        "checklists": [],
                        "memberIds": ["u102"],
                        "labelIds": ["l101"],
                        "dueDate": null,
                        "watching": true
                    }
                ],
                "style": {}
            },
            {
                "id": utilService.makeId(),
                "title": "Backlog-client",
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "title": "Add react-beautiful-dnd library",
                        "description": null,
                        "cover": {
                            "backgroundColor": "",
                            "img": "https://trello.com/1/cards/651c0842cf5946d21802327d/attachments/651c09552a41a0070e0715a1/previews/651c09552a41a0070e071635/download/rbdpng.png",
                            "createdAt": 1696332780
                        },
                        "attachments": [
                            {
                                "id": utilService.makeId(),
                                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696368347/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-07-20_131912_zfdlhz.png"
                            }
                        ],
                        "byMember": {
                            "_id": "u102",
                            "fullname": "Reut Edry",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
                        },
                        "archivedAt": null,
                        "labelIds": ["l101", "l102", "l103"],
                        "memberIds": ["u101", "u102", "u103"],
                        "watching": true,
                        "dueDate": null,
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
                        "cover": {
                            "backgroundColor": "",
                            "img": "https://trello.com/1/cards/651bebdea9a06da3b2b0cc78/attachments/651bfeba9907c9d50218de36/previews/651bfebc9907c9d50218e1d7/download/BUild-idea.jpg"
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
                                'createdAt': 1696333740,
                            },
                        ],
                        "comments": [],
                        "checklists": [],
                        "memberIds": ["u102"],
                        "labelIds": ["l101"],
                        "dueDate": null,
                        "watching": false
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "Adding npm packages",
                        "description": null,
                        "archivedAt": null,
                        "cover": {
                            "backgroundColor": "",
                            "img": "https://trello.com/1/cards/651c0a337b39c5cdc0951338/attachments/651c3bbdee02e018d2d7b412/previews/651c3bbeee02e018d2d7b45f/download/npm2.png"
                        },
                        "byMember": {
                            "_id": "u102",
                            "fullname": "Reut Edry",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
                        },
                        "attachments": [
                            {
                                "id": "123abger",
                                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696371749/npm_zfi8q9.png",
                                'createdAt': 1696348680,
                            },
                        ],
                        "comments": [],
                        "checklists": [],
                        "memberIds": ["u102"],
                        "labelIds": ["l101"],
                        "dueDate": null,
                        "watching": true
                    }
                ],
                "style": {}
            },
            ///////////////
            {
                "id": utilService.makeId(),
                "title": "in-development",
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "title": "Add user auth",
                        "description": null,
                        "cover": {
                            "backgroundColor": "",
                            "img": "",
                            "createdAt": 1696332780
                        },
                        "attachments": [
                            {
                                "id": utilService.makeId(),
                                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696368347/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-07-20_131912_zfdlhz.png"
                            }
                        ],
                        "byMember": {
                            "_id": "u102",
                            "fullname": "Reut Edry",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
                        },
                        "archivedAt": null,
                        "labelIds": ["l101", "l102", "l103"],
                        "memberIds": ["u101", "u102", "u103"],
                        "watching": true,
                        "dueDate": null,
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
                        "cover": {
                            "backgroundColor": "yellow",
                            "img": ""
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
                                'createdAt': 1696333740,
                            },
                        ],
                        "comments": [],
                        "checklists": [],
                        "memberIds": ["u102"],
                        "labelIds": ["l101"],
                        "dueDate": null,
                        "watching": false
                    },
                    {
                        "id": utilService.makeId(),
                        "title": "SCSS Architecture",
                        "description": null,
                        "archivedAt": null,
                        "cover": {
                            "backgroundColor": "",
                            "img": "https://trello.com/1/cards/651bfda2b36856a0f1584811/attachments/651c05005a8ec24441d587b0/previews/651c05015a8ec24441d58821/download/SCSS.webp"
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
                                'createdAt': 1696348680,
                            },
                        ],
                        "comments": [],
                        "checklists": [],
                        "memberIds": ["u102"],
                        "labelIds": ["l101"],
                        "dueDate": null,
                        "watching": true
                    }, {
                        "id": utilService.makeId(),
                        "title": "Socket services",
                        "description": null,
                        "archivedAt": null,
                        "cover": {
                            "backgroundColor": "yellow",
                            "img": "https://trello.com/1/cards/651c013b277d997329feec74/attachments/651c01446984182bc136bbb5/previews/651c01446984182bc136bc50/download/socketsImg.png"
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
                                'createdAt': 1696333740,
                            },
                        ],
                        "comments": [],
                        "checklists": [],
                        "memberIds": ["u102"],
                        "labelIds": ["l101"],
                        "dueDate": null,
                        "watching": false
                    }
                ],
                "style": {}
            },
            {
                "id": utilService.makeId(),
                "title": "QA",
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "title": "Bugs search",
                        "description": null,
                        "cover": {
                            "backgroundColor": "",
                            "img": "https://trello.com/1/cards/651c064b620e619a028eb825/attachments/651c3cb49a7657692aea99c3/previews/651c3cb59a7657692aea99d9/download/bug.png.jpg",
                            "createdAt": 1696332780
                        },
                        "attachments": [
                            {
                                "id": utilService.makeId(),
                                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696368347/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-07-20_131912_zfdlhz.png"
                            }
                        ],
                        "byMember": {
                            "_id": "u102",
                            "fullname": "Reut Edry",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
                        },
                        "archivedAt": null,
                        "labelIds": ["l101", "l102", "l103"],
                        "memberIds": ["u101", "u102", "u103"],
                        "watching": true,
                        "dueDate": null,
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
                        "cover": {
                            "backgroundColor": "lightcyan",
                            "img": ""
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
                                'createdAt': 1696333740,
                            },
                        ],
                        "comments": [],
                        "checklists": [],
                        "memberIds": ["u102"],
                        "labelIds": ["l101"],
                        "dueDate": null,
                        "watching": false
                    },

                ],
                "style": {}
            },

            ///////////////
            {
                "id": utilService.makeId(),
                "title": "QA-Done",
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "title": "Regression testing",
                        "description": null,
                        "cover": {
                            "backgroundColor": "orange",
                            "img": "",
                            "createdAt": 1696332780
                        },
                        "attachments": [
                            {
                                "id": utilService.makeId(),
                                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696368347/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-07-20_131912_zfdlhz.png"
                            }
                        ],
                        "byMember": {
                            "_id": "u102",
                            "fullname": "Reut Edry",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
                        },
                        "archivedAt": null,
                        "labelIds": ["l101"],
                        "memberIds": ["u101"],
                        "watching": true,
                        "dueDate": null,
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
                    }, {
                        "id": utilService.makeId(),
                        "title": "Spell check",
                        "description": null,
                        "cover": {
                            "backgroundColor": "",
                            "img": "",
                            "createdAt": 1696332780
                        },
                        "attachments": [
                            {
                                "id": utilService.makeId(),
                                "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696368347/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-07-20_131912_zfdlhz.png"
                            }
                        ],
                        "byMember": {
                            "_id": "u102",
                            "fullname": "Reut Edry",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
                        },
                        "archivedAt": null,
                        "labelIds": ["l101"],
                        "memberIds": ["u101"],
                        "watching": true,
                        "dueDate": null,
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
                        "cover": {
                            "backgroundColor": "green",
                            "img": "",
                            "createdAt": 1696332780
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
                        "memberIds": ["u101"],
                        "watching": true,
                        "dueDate": null,
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
                "tasks": [
                    {
                        "id": utilService.makeId(),
                        "title": "Deployment",
                        "description": null,
                        "cover": {
                            "backgroundColor": "",
                            "img": "https://trello.com/1/cards/651c07991b3e73159882ad29/attachments/651c08eb8236c4a95c479066/previews/651c08ec8236c4a95c4790d2/download/Cloud-computing-deployment-models-1000x503.jpg",
                            "createdAt": 1696332780
                        },
                        "attachments": [
                            {
                                "id": utilService.makeId(),
                                "imgUrl": "https://trello.com/1/cards/651c07991b3e73159882ad29/attachments/651c08eb8236c4a95c479066/previews/651c08ec8236c4a95c4790d2/download/Cloud-computing-deployment-models-1000x503.jpg"
                            }
                        ],
                        "byMember": {
                            "_id": "u102",
                            "fullname": "Reut Edry",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
                        },
                        "archivedAt": null,
                        "labelIds": ["l101", "l102", "l103"],
                        "memberIds": ["u101", "u102", "u103"],
                        "watching": true,
                        "dueDate": null,
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
                        "cover": {
                            "backgroundColor": "gray",
                            "img": "",
                            "createdAt": 1696332780
                        },
                        "attachments": [
                            {
                                "id": utilService.makeId(),
                                "imgUrl": ""
                            }
                        ],
                        "byMember": {
                            "_id": "u102",
                            "fullname": "Reut Edry",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
                        },
                        "archivedAt": null,
                        "labelIds": ["l101", "l102", "l103"],
                        "memberIds": ["u101", "u102", "u103"],
                        "watching": true,
                        "dueDate": null,
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
                        "cover": {
                            "backgroundColor": "lightblue",
                            "img": "",
                            "createdAt": 1696355446
                        },
                        "attachments": [
                            {
                                "id": utilService.makeId(),
                                "imgUrl": ""
                            }
                        ],
                        "byMember": {
                            "_id": "u102",
                            "fullname": "Reut Edry",
                            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
                        },
                        "archivedAt": null,
                        "labelIds": ["l103"],
                        "memberIds": ["u101", "u102", "u103"],
                        "watching": true,
                        "dueDate": null,
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




            ////////////
            // {
            //     "id": "g103",
            //     "title": "Group 3",
            //     "tasks": [
            //         {
            //             "id": "c103",
            //             "title": "Do that",
            //             "archivedAt": 1589983468418,
            //         },
            //         {
            //             "id": "c104",
            //             "title": "Help me",
            //             "priority": null,
            //             "description": "description",
            //             "comments": [
            //                 {
            //                     "id": "ZdPnm",
            //                     "txt": "also @yaronb please CR this",
            //                     "createdAt": 1590999817436,
            //                     "byMember": {
            //                         "_id": "u101",
            //                         "fullname": "Tal Tarablus",
            //                         "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            //                     }
            //                 }
            //             ],
            //             "checklists": [
            //                 {
            //                     "id": "YEhmF",
            //                     "title": "Checklist",
            //                     "todos": [
            //                         {
            //                             "id": "212jX",
            //                             "title": "To Do 1",
            //                             "isDone": false
            //                         }
            //                     ]
            //                 }
            //             ],
            //             "memberIds": ["u101"],
            //             "labelIds": ["l101", "l102"],
            //             "dueDate": 16156215211,
            //             "byMember": {
            //                 "_id": "u101",
            //                 "username": "Tal",
            //                 "fullname": "Tal Tarablus",
            //                 "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            //             },
            //             "style": {
            //                 "backgroundColor": "#26de81"
            //             }
            //         }
            //     ],
            //     "style": {}
            // }
        ],
        activities: [
            {
                "id": utilService.makeId(),
                "txt": "marked the due date incomplete",
                "createdAt": 1696368960,
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
                "txt": "left this card",
                "createdAt": 1696333780,
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
            }

        ],

        cmpsOrder: ["StatusPicker", "MemberPicker", "DatePicker"]
    },
]

