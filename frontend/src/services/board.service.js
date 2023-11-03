
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'board/'
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
    addActivity,
    getEmptyComment,
    getEmptyFilter
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
    return httpService.get(BASE_URL)

    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     boards = boards.filter(board => regex.test(board.title) || regex.test(board.description))
    // }
    // if (filterBy.price) {
    //     boards = boards.filter(board => board.price <= filterBy.price)
    // }
}

function getById(boardId) {
    return httpService.get(BASE_URL + boardId)
}

async function remove(boardId) {
    return httpService.delete(BASE_URL + boardId)
}

async function save(board) {
    // console.log(':', )
    if (board._id) {
        return httpService.put(BASE_URL + board._id, board)
    } else {
        let boardToSave = {...board, createdBy: userService.getLoggedinUser()}
        return httpService.post(BASE_URL, boardToSave)
    }
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

async function saveGroup(group, boardId, user, txt, task) {
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

        addActivity(board, user, txt, { group, task })
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
    if (!user || !board || !txt) return
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
    board.activities.unshift(activity);
}

function getEmptyComment(user, txt, groupId, taskId) {
    if (!user || !txt || !groupId || !taskId) return
    const comment = {
        id: utilService.makeId(),
        txt,
        createdAt: Date.now(),
        byMember: user,
        group: {
            id: groupId || '',
        },
        task: {
            id: taskId || '',
        }
    }

    return comment
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
            userService.getLoggedinUser(),
            {
                "_id": 'guest',
                "fullname": 'Guest',
                "imgUrl": "https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg",
                "username": 'Guest'
            }
        ],
        groups: [
            { id: utilService.makeId(), title: '', tasks: [], style: {} }
        ],
        activities: [],
        cmpsOrder: ["StatusPicker", "MemberPicker", "DatePicker"]
    }
}

function getEmptyFilter() {
    return {
        txt: '',
        byMembers: {
            isAll: false,
            isMe: false,
            isNoOne: false,
            someMembers: []
        },
        byDuedate: {
            isDate: false,
            isOverdue: false,
            isDuesoon: false,
            isComplete: false
        },
        byLabels: {
            isNoOne: false,
            isAll: false,
            someLabel: []
        }
    }

}
