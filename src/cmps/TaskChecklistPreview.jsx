import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import { checkedSvg } from './Svgs';
import { taskService } from '../services/task.service.local';

export function TaskChecklistPreview({ onAddTodo, onUpdateListTitle, onDeleteTodo, checklists, onToggleDoneTodo, onUpdateTodoTitle }) {
    const [localChecklists, setLocalChecklists] = useState(checklists);
    const [expandedTodo, setExpandedTodo] = useState({ listId: null, todoId: null });
    const [expandedListId, setExpandedListId] = useState(null);
    const [expandedAddTodoListId, setExpandedAddTodoListId] = useState(null);

    const [txt, setTxt] = useState('');
    const [progressbarCalc, setProgressbarCalc] = useState(0);

    useEffect(() => {
        setLocalChecklists(checklists);
        calculateDoneTodos(checklists);
    }, [checklists]);



    

    async function handleToggle(listId, todoId, isDone,ev) {
        ev.stopPropagation();
        try {
            await onToggleDoneTodo(listId, todoId, isDone);
            const updatedChecklists = localChecklists.map(list => ({
                ...list,
                todos: list.todos.map(todo =>
                    todo.id === todoId ? { ...todo, isDone } : todo
                )
            }));
            calculateDoneTodos(updatedChecklists)
            setLocalChecklists(updatedChecklists)
        } catch (err) {
            console.error('Cannot toggle todo', err);
            throw err;
        }
    }

    function handleTextChange(event) {
        setTxt(event.target.value);
    }

    async function updateTodoTitle(listId, todoId, title) {
        try {
            await onUpdateTodoTitle(listId, todoId, title);
            const updatedChecklists = localChecklists.map(list => ({
                ...list,
                todos: list.todos.map(todo =>
                    todo.id === todoId ? { ...todo, title } : todo
                )
            }));
            setLocalChecklists(updatedChecklists);
            setExpandedTodo({ listId: null, todoId: null });
            setTxt('');
        } catch (err) {
            console.error('Cannot update todo title', err);
            throw err;
        }
    }

    async function updateListTitle(listId, title) {
        try {
            await onUpdateListTitle(listId, title);
            const updatedChecklists = localChecklists.map(list =>
                list.id === listId ? { ...list, title } : list
            );
            setLocalChecklists(updatedChecklists);
            setExpandedListId(null);
            setTxt('');
        } catch (err) {
            console.error('Cannot update list title', err);
            throw err;
        }
    }

    async function addTodo(listId, txt) {
        if (!txt) return;
        try {
            const newTodo = taskService.getDefaultTodo(txt)
            await onAddTodo(listId, newTodo);
            const updatedChecklists = localChecklists.map(list =>
                list.id === listId ? { ...list, todos: [...list.todos, newTodo] } : list
            );
            setLocalChecklists(updatedChecklists);
            setExpandedTodo({ listId: null, todoId: null });
        } catch (err) {
            console.error('Cannot add todo', err);
            throw err;
        }
    }

    async function deleteTodo(listId, todoId) {
        console.log('listId',listId, 'todoId', todoId);
        try {
            await onDeleteTodo(listId, todoId);
            const updatedChecklists = localChecklists.map(list => ({
                ...list,
                todos: list.todos.filter(todo => todo.id !== todoId)
            }));
            calculateDoneTodos(updatedChecklists)
            setLocalChecklists(updatedChecklists);
        } catch (err) {
            console.error('Cannot delete todo', err);
            throw err;
        }
    }

    function calculateDoneTodos(checklistsToUse) {
        const progressForEachList = checklistsToUse.map(list => {
            const totalTodos = list.todos.length;
            const doneTodos = list.todos.filter(todo => todo.isDone).length;
            return totalTodos === 0 ? 0 : (doneTodos / totalTodos) * 100;
        });
        setProgressbarCalc(progressForEachList);
    }

    console.log('bar calc', progressbarCalc);
    return (
        <section>
            {localChecklists.map((list, idx) => (
                <ul key={list.id} className="task-checklist clean-list">
                    {expandedListId !== list.id ?
                        <span className='header' onClick={() => setExpandedListId(list.id)}>
                            <span className='checklist-svg'>{checkedSvg.check}</span>
                            <span className='title'>{list.title}</span>
                        </span> :
                        <div className='add-group-input-expanded'>
                            <Textarea
                                sx={{ border: 'none'}}
                                name="title"
                                autoFocus
                                defaultValue={list.title}
                                onChange={handleTextChange}
                                minRows={2}
                            />
                            <section className='add-controls'>
                                <Button type="submit" onClick={() => updateListTitle(list.id, txt)}>Save</Button>
                                <button className='cancel' onClick={() => setExpandedListId(null)}>X</button>
                            </section>
                        </div>
                    }

                    <div className='progress-bar'>
                        <span>{progressbarCalc[idx] ? progressbarCalc[idx] : 0}%</span>
                        <div className='progress-bar-container'>
                            <div className="fill" style={{ width: `${progressbarCalc[idx] ? progressbarCalc[idx] : 0}%` }}></div>
                        </div>
                    </div>

                    {list.todos.map(todo => (
                        <li key={todo.id} className={`checklist-item ${todo.isDone ? 'done' : ''}`}>
                            <div className='checkbox'>
                                <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} checked={todo.isDone} onClick={(event) => {
                                    handleToggle(list.id, todo.id, !todo.isDone, event)}} />
                            </div>

                            {expandedTodo.listId === list.id && expandedTodo.todoId === todo.id ? 
                                <div className='add-group-input-expanded'>
                                    <Textarea 
                                        sx={{ border:'none'}}
                                        name="title"
                                        autoFocus
                                        defaultValue={todo.title}
                                        onChange={handleTextChange}
                                    />
                                    <section className='add-controls'>
                                        <Button type="submit" onClick={() => {
                                            updateTodoTitle(list.id, todo.id, txt);
                                            setExpandedTodo({ listId: null, todoId: null });
                                        }}>
                                            Save
                                        </Button>
                                        <button className='cancel' onClick={() => setExpandedTodo({ listId: null, todoId: null })}>X</button>
                                        <button className='delete' onClick={() => deleteTodo(list.id, todo.id)}>Delete</button>
                                    </section>
                                </div> :
                                <span onClick={() => {
                                    console.log("Trying to expand:", list.id, todo.id);
                                    setExpandedTodo({ listId: list.id, todoId: todo.id });
                                }}>{todo.title}</span>
                                
                            }
                        </li>
                    ))}

                {expandedAddTodoListId !== list.id ?
                    <button className='add-todo task-btn' onClick={() => setExpandedAddTodoListId(list.id)}>Add an item</button> :
                    <section>
                        <Textarea
                            sx={{ border: 'none' }}
                            name="title"
                            autoFocus
                            minRows={2}
                            defaultValue={'Add an item'}
                            onChange={handleTextChange}
                        />
                        <div>
                            <Button type='submit' onClick={() => {
                                addTodo(list.id, txt);
                                setExpandedAddTodoListId(null);
                            }}>Save</Button>
                            <button className='cancel task-btn' onClick={() => setExpandedAddTodoListId(null)}>Cancel</button>
                        </div>
                    </section>
                }
                </ul>
            ))}
        </section>
    )
}



