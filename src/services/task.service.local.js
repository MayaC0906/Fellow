import { boardService } from "./board.service.local"
import { utilService } from "./util.service"
export const taskService = {
    getById,
    saveTaskTitle,
    saveTaskDescription,
    removeAttachment,
    addCoverImg,
    removeCover,
    updateTodoIsDone,
    updateTodoTitle,
    deleteTodo,
    addTodo,
    getDefaultTodo,
    updateListTitle,
    getEmptyTask
}

async function getById(boardId, groupId, taskId) {
    try {
        const board = await boardService.getById(boardId)
        console.log('board to load task',board);
        const group = board.groups.find(group => group.id === groupId)
        const task = group.tasks.find(task => task.id === taskId)
        return task
    } catch (err) {
        console.log('couldn\'t get task', err);
        throw err
    }
}


// async function getTaskById(taskId, groupId, boardId) {
// 	try {
// 		const tasks = await queryTasks(groupId, boardId)
// 		const task = tasks.find((task) => task.id === taskId)
// 		return task
// 	} catch (err) {
// 		console.log('Failed to get task', err)
// 		throw err
// 	}
// }
async function updateTodoProperty(boardId, groupId, taskId, listId, todoId, key, value) {

    try {
        const board = await boardService.getById(boardId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const group = board.groups[groupIdx]
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)  
        const checklistIdx = group.tasks[taskIdx].checklists.findIndex(list => list.id === listId)
        if (checklistIdx === -1) {
            throw new Error("checklist isn't found!")
        }    
      console.log('hhereeeeeeee' ,group.tasks[taskIdx].checklists[checklistIdx].todos);

        const todoIdx = group.tasks[taskIdx].checklists[checklistIdx].todos.findIndex(todo => todo.id === todoId)
        if (todoIdx === -1) {
            throw new Error("todo isn't found!")
        }
        if (key === 'delete'){
            console.log('board: from delete', board.groups[groupIdx].tasks[taskIdx].checklists[checklistIdx])
            board.groups[groupIdx].tasks[taskIdx].checklists[checklistIdx].todos.splice(todoIdx, 1)
            await boardService.saveGroup(group, boardId)
            return board
        }
        if (!board.groups[groupIdx].tasks[taskIdx].checklists[checklistIdx].todos[todoIdx].hasOwnProperty(key)) {
            throw new Error("The provided key doesn't exist on the todo")
        }

        board.groups[groupIdx].tasks[taskIdx].checklists[checklistIdx].todos[todoIdx][key] = value
        console.log('board: after change', board)

        await boardService.saveGroup(group, boardId)
        return board;
    } catch (err) {
        console.log(`cannot update todo's ${key}`, err)
        throw err
    }
}


 

async function deleteTodo(boardId, groupId, taskId, listId, todoId) {
    console.log('todoId:', todoId)
    try {
        return updateTodoProperty(boardId, groupId, taskId, listId,todoId, 'delete', null);
    } catch (err) {
        console.log('cannot delete todo', err);
        throw err;
    }
}


 async function updateTodoIsDone(boardId, groupId, taskId, listId,todoId,  state) {
    try {
        return updateTodoProperty(boardId, groupId, taskId, listId,todoId, 'isDone', state);
    } catch (err) {
        console.log('cannot update todo isDone status', err);
        throw err;
    }
}

 async function updateTodoTitle(boardId,groupId,taskId, listId, todoId,txt){
    try{
        return updateTodoProperty(boardId,groupId,taskId,listId,todoId,'title', txt)
    } catch (err) {
        console.log('cannot update todo title', err);
        throw err;
    }
}
async function updateListTitle(boardId, groupId, taskId, listId, title){
    try {
        const board = await boardService.getById(boardId);
        const groupIdx = board.groups.findIndex(group => group.id === groupId);
        const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId);
        const checklistIdx = board.groups[groupIdx].tasks[taskIdx].checklists.findIndex(list => list.id === listId);
        
        if (checklistIdx === -1) {
            throw new Error("checklist isn't found!");
        }

        board.groups[groupIdx].tasks[taskIdx].checklists[checklistIdx].title = title;
        await boardService.saveGroup(board.groups[groupIdx], boardId);
        return board;
    } catch (err) {
        console.log('cannot update list title', err);
        throw err;
    }
}



async function addTodo(boardId, groupId, taskId, listId, txt) {
    try {
        const board = await boardService.getById(boardId);
        const groupIdx = board.groups.findIndex(group => group.id === groupId);
        const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId);
        const checklistIdx = board.groups[groupIdx].tasks[taskIdx].checklists.findIndex(list => list.id === listId);
        
        if (checklistIdx === -1) {
            throw new Error("checklist isn't found!");
        }

        console.log('list: before change', board.groups[groupIdx].tasks[taskIdx].checklists[checklistIdx]);

        const newTodo = getDefaultTodo(txt);
        board.groups[groupIdx].tasks[taskIdx].checklists[checklistIdx].todos.push(newTodo);
        
        console.log('list: after change', board.groups[groupIdx].tasks[taskIdx].checklists[checklistIdx]);

        await boardService.saveGroup(board.groups[groupIdx], boardId);
        return board;
    } catch (err) {
        console.log('cannot add todo', err);
        throw err;
    }
}


// export async function update

function getDefaultTodo(txt){
    return {
        title: txt,
        isDone: false
    }
}
async function saveTaskTitle(boardId, groupId, taskId, newTitle) {
    try {
        const board = await boardService.getById(boardId)
        const group = board.groups.find(group => group.id === groupId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const task = group.tasks.find(task => task.id === taskId)
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)

        const newTask = { ...task, title: newTitle }
        board.groups[groupIdx].tasks[taskIdx] = newTask

        boardService.saveGroup(board.groups[groupIdx], boardId)
        return board
    } catch (err) {
        console.log('couldn\'t save task title', err);
        throw err
    }
}

async function saveTaskDescription(boardId, groupId, taskId, newDescriptoin) {
    try {
        const board = await boardService.getById(boardId)
        const group = board.groups.find(group => group.id === groupId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const task = group.tasks.find(task => task.id === taskId)
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)

        const newTask = { ...task, description: newDescriptoin }
        board.groups[groupIdx].tasks[taskIdx] = newTask

        boardService.saveGroup(board.groups[groupIdx], boardId)
        return board
    } catch (err) {
        console.log('couldn\'t save task description', err);
        throw err
    }
}

async function removeAttachment(boardId, groupId, taskId, attachmentId) {
    try {
        const board = await boardService.getById(boardId)
        const group = board.groups.find(group => group.id === groupId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)

        const attachmentIdx = board.groups[groupIdx].tasks[taskIdx]
            .attachments.findIndex(attachment => attachment.id === attachmentId)
         
        board.groups[groupIdx].tasks[taskIdx].attachments.splice(attachmentIdx, 1)
        board.groups[groupIdx].tasks[taskIdx].cover.img =''

        console.log(group, 'group to send');
        boardService.saveGroup(group, boardId)
        return board
    } catch (err) {
        console.log('couldn\'t remove task attachment', err);
        throw err
    }

}

async function addCoverImg(boardId, groupId, taskId, url) {
    try {
        const board = await boardService.getById(boardId)
        const group = board.groups.find(group => group.id === groupId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)

        board.groups[groupIdx].tasks[taskIdx].cover.img = url


        boardService.saveGroup(group, boardId)
        return board
    } catch (err) {
        console.log('couldn\'t remove task attachment', err);
        throw err
    }

}

async function removeCover(boardId, groupId, taskId) {
    try {
        const board = await boardService.getById(boardId)
        const group = board.groups.find(group => group.id === groupId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)

        board.groups[groupIdx].tasks[taskIdx].cover.img = ''


        boardService.saveGroup(board.groups[groupIdx], boardId)
        return board
    } catch (err) {
        console.log('couldn\'t remove task attachment', err);
        throw err
    }

}



function getEmptyTask() {
	return {
        id: utilService.makeId(),
		title: '',
		archivedAt: null,
		labelIds: [],
		dueDate: '',
		byMember: {
			_id: '',
			username: '',
			fullname: '',
			imgUrl: '',
		},
		memberIds: [],
		comments: [],
		style: {},
		attachments: [],
		checklists: [],
		isDone: false,
        style:{}
	}
}
