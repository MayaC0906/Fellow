// import react from '@vitejs/plugin-react-swc';
import { useParams } from 'react-router';
// import { useState } from 'react';
import { TaskChecklistPreview } from './TaskChecklistPreview';
// import {updateTodoIsDone} from ''

import {updateTodoIsDone, updateTodoTitle, deleteTodo, addTodo, updateListTitle} from '../store/actions/board.actions.js'



export function TaskCheckList({checklists}){
    const { boardId, groupId, taskId } = useParams()
    
    // console.log(toggleTodo);

    async function onToggleDoneTodo(listId,todoId,isDone){
        try{
            await updateTodoIsDone(boardId, groupId, taskId, listId,todoId,isDone)
        } catch (err) {
            console.log('cannot toggle todo done');
            throw err
        }
    } 

    async function onUpdateTodoTitle(listId,todoId, txt){
        try {
            await updateTodoTitle(boardId,groupId,taskId,listId,todoId,txt)
        } catch (err) {
            console.log('cannot save todo title')
            throw err
        }
    }

    async function onAddTodo(listId, txt){
        try {
            await addTodo(boardId, groupId, taskId, listId, txt)
        } catch (err) {
            console.log('cannot add todo')
            throw err
        }
    }

    async function onDeleteTodo(listId, todoId){
        try {
            await deleteTodo(boardId, groupId, taskId,listId, todoId)
        } catch (err) {
            console.log('cannot delete todo')
            throw err
        }
    }

    async function onUpdateListTitle(listId, txt){
        try {
            await updateListTitle(boardId, groupId ,taskId,listId, txt)
        } catch (err) {
            console.log('cannot update list title')
            throw err
        }
    }
    // console.log(checklists);
    return (
        <TaskChecklistPreview onAddTodo={onAddTodo} onUpdateListTitle={onUpdateListTitle} onDeleteTodo={onDeleteTodo} onUpdateTodoTitle={onUpdateTodoTitle} onToggleDoneTodo={onToggleDoneTodo} checklists={checklists}/>
    )
}