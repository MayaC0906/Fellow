
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'boardDB'
export const boardService = {
    query,
    getById,
    save,
    remove,
    // getEmptyBaba,
    addBabaMsg,
    getLabels,
    getCheckListStatus,
    getMembers,
    getEmptyGroup,
    saveGroup,
    removeGroup,
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
    console.log('boards from:', boards)
    return boards
}


async function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(babaId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, babaId)
}

async function save(baba) {
    var savedBaba
    if (baba._id) {
        savedBaba = await storageService.put(STORAGE_KEY, baba)
    } else {
        // Later, owner is set by the backend
        baba.owner = userService.getLoggedinUser()
        savedBaba = await storageService.post(STORAGE_KEY, baba)
    }
    return savedBaba
}

async function addBabaMsg(babaId, txt) {
    // Later, this is all done by the backend
    const baba = await getById(babaId)
    if (!baba.msgs) baba.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    baba.msgs.push(msg)
    await storageService.put(STORAGE_KEY, baba)

    return msg
}

function getEmptyGroup() {
    return {
        title: '',
        tasks: [],
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

const board = [
    {
        _id: "b101",
        title: "Final-project",
        isStarred: false,
        archivedAt: 1589983468418,
        isStarred: false,
        createdBy: {
            "_id": "u103",
            "fullname": "Sahar Machpud",
            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg"
        },
        style: {
            backgroundImage: "",
            backgroundColor: "rgb(230, 165, 165)"
        },
        labels: [
            {
                "id": "l101",
                "title": "Urgent",
                "color": "#f87462"
            },
            {
                "id": "l102",
                "title": "Tasks",
                "color": "#b8acf6"
            },
            {
                "id": "l103",
                "title": "Data",
                "color": "#c1f0f5"
            }
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
                "id": "g101",
                "title": "Backlog-server",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Demo data",
                        "description": null,
                        "cover": {
                            "backgroundColor": "",
                            "img": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696368347/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-07-20_131912_zfdlhz.png",
                            "createdAt": 1696332780
                        },
                        "attachments": [
                            {
                                "id": "123abc",
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
                        "dueDate": 1696764840,
                        "checklists": [
                            {
                                "id": "YEhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "212jX",
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
                                "id": "ZdPnm",
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
                        "id": "c104",
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
                                "id": "123abg",
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
                        "id": "c1045",
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
            {
                "id": "g102",
                "title": "Group 2",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Demo data",
                        "description": null,
                        "cover": {
                            "backgroundColor": "",
                            "img": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696368347/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-07-20_131912_zfdlhz.png",
                            "createdAt": 1696332780
                        },
                        "attachments": [
                            {
                                "id": "123abc",
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
                        "dueDate": 1696764840,
                        "checklists": [
                            {
                                "id": "YEhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "212jX",
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
                                "id": "ZdPnm",
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
                        "id": "c104",
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
                                "id": "123abg",
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
                        "id": "c1045",
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
                "id": "g10222",
                "title": "in-development",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Demo data",
                        "description": null,
                        "cover": {
                            "backgroundColor": "",
                            "img": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696368347/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-07-20_131912_zfdlhz.png",
                            "createdAt": 1696332780
                        },
                        "attachments": [
                            {
                                "id": "123abc",
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
                        "dueDate": 1696764840,
                        "checklists": [
                            {
                                "id": "YEhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "212jX",
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
                                "id": "ZdPnm",
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
                        "id": "c104",
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
                                "id": "123abg",
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
                        "id": "c1045",
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
            {
                "id": "g101112",
                "title": "QA",
                "tasks": [
                    {
                        "id": "c103w",
                        "title": "Demo data",
                        "description": null,
                        "cover": {
                            "backgroundColor": "",
                            "img": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696368347/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-07-20_131912_zfdlhz.png",
                            "createdAt": 1696332780
                        },
                        "attachments": [
                            {
                                "id": "123abc",
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
                        "dueDate": 1696764840,
                        "checklists": [
                            {
                                "id": "YEhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "212jX",
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
                                "id": "ZdPnm",
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
                        "id": "c104",
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
                                "id": "123abg",
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
                        "id": "c1045",
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
                "id": "g10123",
                "title": "Done",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Demo data",
                        "description": null,
                        "cover": {
                            "backgroundColor": "",
                            "img": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696368347/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-07-20_131912_zfdlhz.png",
                            "createdAt": 1696332780
                        },
                        "attachments": [
                            {
                                "id": "123abc",
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
                        "dueDate": 1696764840,
                        "checklists": [
                            {
                                "id": "YEhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "212jX",
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
                                "id": "ZdPnm",
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
                "id": "a101",
                "txt": "marked the due date incomplete",
                "createdAt": 1696368960,
                "byMember": {
                    "_id": "u102",
                    "fullname": "Reut Edry",
                    "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
                },
                "group": {
                    "id": "g101",
                    "title": "Backlog-server"
                },
                "task": {
                    "id": "c103",
                    "title": "Demo data"
                }
            },
            {
                "id": "b102",
                "txt": "left this card",
                "createdAt": 1696333780,
                "byMember": {
                    "_id": "u103",
                    "fullname": "Sahar Machpud",
                    "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg"
                },
                "group": {
                    "id": "g101",
                    "title": "Backlog-server"
                },
                "task": {
                    "id": "c104",
                    "title": "Connect to Mongo"
                }
            }

        ],

        cmpsOrder: ["StatusPicker", "MemberPicker", "DatePicker"]
    },
    {
        _id: "b102",
        title: "Test",
        isStarred: false,
        archivedAt: 1589983468418,
        isStarred: true,
        createdBy: {
            "_id": "u103",
            "fullname": "Sahar Machpud",
            "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg"
        },
        style: {
            backgroundImage: "",
            backgroundColor: "rgb(225, 98, 98)"
        },
        labels: [
            {
                "id": "l101",
                "title": "Urgent",
                "color": "#f87462"
            },
            {
                "id": "l102",
                "title": "Tasks",
                "color": "#b8acf6"
            },
            {
                "id": "l103",
                "title": "Data",
                "color": "#c1f0f5"
            }
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
                "id": "g101",
                "title": "Backlog-server",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Demo data",
                        "description": null,
                        "cover": {
                            "backgroundColor": "",
                            "img": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696368347/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-07-20_131912_zfdlhz.png",
                            "createdAt": 1696332780
                        },
                        "attachments": [
                            {
                                "id": "123abc",
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
                        "dueDate": 1696764840,
                        "checklists": [
                            {
                                "id": "YEhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "212jX",
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
                                "id": "ZdPnm",
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
                        "id": "c104",
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
                                "id": "123abg",
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
                        "id": "c1045",
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
            {
                "id": "g102",
                "title": "Group 2",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Demo data",
                        "description": null,
                        "cover": {
                            "backgroundColor": "",
                            "img": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696368347/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-07-20_131912_zfdlhz.png",
                            "createdAt": 1696332780
                        },
                        "attachments": [
                            {
                                "id": "123abc",
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
                        "dueDate": 1696764840,
                        "checklists": [
                            {
                                "id": "YEhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "212jX",
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
                                "id": "ZdPnm",
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
                        "id": "c104",
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
                                "id": "123abg",
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
                        "id": "c1045",
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
                "id": "a101",
                "txt": "marked the due date incomplete",
                "createdAt": 1696368960,
                "byMember": {
                    "_id": "u102",
                    "fullname": "Reut Edry",
                    "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
                },
                "group": {
                    "id": "g101",
                    "title": "Backlog-server"
                },
                "task": {
                    "id": "c103",
                    "title": "Demo data"
                }
            },
            {
                "id": "b102",
                "txt": "left this card",
                "createdAt": 1696333780,
                "byMember": {
                    "_id": "u103",
                    "fullname": "Sahar Machpud",
                    "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg"
                },
                "group": {
                    "id": "g101",
                    "title": "Backlog-server"
                },
                "task": {
                    "id": "c104",
                    "title": "Connect to Mongo"
                }
            }

        ],

        cmpsOrder: ["StatusPicker", "MemberPicker", "DatePicker"]
    }

]

