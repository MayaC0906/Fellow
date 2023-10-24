import { useParams } from 'react-router';
import { TaskChecklistPreview } from './TaskChecklistPreview';


export function TaskCheckList({ setEditName, setTask, onSaveTask, task }) {
    const { checklists } = task

    async function onToggleDoneTodo(listId, todoId, isDone) {
        try {
            const updatedChecklists = checklists.map(list =>
                list.id === listId ? ({
                    ...list,
                    todos: list.todos.map(todo =>
                        todo.id === todoId ? { ...todo, isDone } : todo
                    )
                }) : list)
            const newTask = { ...task, checklists: updatedChecklists }
            onSaveTask(newTask)
        } catch (err) {
            console.log('cannot toggle todo done');
            throw err
        }
    }

    async function onDeleteList(listId) {
        try {
            const newChecklists = checklists.filter(list => list.id !== listId)
            const newTask = { ...task, checklists: newChecklists }
            onSaveTask(newTask)
        } catch (err) {
            console.log('cant delete list');
            throw err
        }
    }



    async function onUpdateListTitle(listId, title) {
        try {
            const updatedChecklists = checklists.map(list =>
                list.id === listId ? { ...list, title } : list
            )
            const newTask = { ...task, checklists: updatedChecklists }
            onSaveTask(newTask)
        } catch (err) {
            console.log('cannot update list title')
            throw err
        }
    }

    async function onUpdateTodoTitle(listId, todoId, title) {
        try {
            const updatedChecklists = checklists.map(list =>
                list.id === listId ? ({
                    ...list,
                    todos: list.todos.map(todo =>
                        todo.id === todoId ? { ...todo, title } : todo
                    )
                }) : list)
            const newTask = { ...task, checklists: updatedChecklists }
            onSaveTask(newTask)
        } catch (err) {
            console.log('cannot save todo title')
            throw err
        }
    }

    async function onAddTodo(listId, newTodo) {
        try {
            const updatedChecklists = checklists.map(list =>
                list.id === listId ? { ...list, todos: [...list.todos, newTodo] } : list
            );
            const newTask = { ...task, checklists: updatedChecklists }
            onSaveTask(newTask)
        } catch (err) {
            console.log('cannot add todo')
            throw err
        }
    }

    async function onDeleteTodo(listId, todoId) {
        try {
            const updatedChecklists = checklists.map(list =>
                list.id === listId ? ({
                    ...list,
                    todos: list.todos.filter(todo => todo.id !== todoId)
                }) : list)
            const newTask = { ...task, checklists: updatedChecklists }
            onSaveTask(newTask)
        } catch (err) {
            console.log('cannot delete todo')
            throw err
        }
    }

    return (
        <TaskChecklistPreview
            onDeleteList={onDeleteList}
            setTask={setTask}
            onAddTodo={onAddTodo}
            onUpdateListTitle={onUpdateListTitle}
            onDeleteTodo={onDeleteTodo}
            onUpdateTodoTitle={onUpdateTodoTitle}
            onToggleDoneTodo={onToggleDoneTodo}
            checklists={checklists}
        />
    )
}