import * as React from 'react'
import { useState, useEffect } from 'react'

import { taskService } from '../../../services/task.service.local'

import Checkbox from '@mui/material/Checkbox'
import Textarea from '@mui/joy/Textarea'
import Button from '@mui/joy/Button'

import { checkedSvg } from '../../Svgs'
import { checkList } from '../../Svgs'

export function TaskChecklistPreview({ onDeleteList, onAddTodo, onUpdateListTitle, onDeleteTodo, checklists, onToggleDoneTodo, onUpdateTodoTitle }) {

    const [localChecklists, setLocalChecklists] = useState(checklists)
    const [expandedTodo, setExpandedTodo] = useState({ listId: null, todoId: null })
    const [expandedListId, setExpandedListId] = useState(null)
    const [expandedAddTodoListId, setExpandedAddTodoListId] = useState(null)
    const [hideChecked, setHideChecked] = useState(checklists.map(() => false))
    const [txt, setTxt] = useState('')
    const [progressbarCalc, setProgressbarCalc] = useState(0)

    useEffect(() => {
        setLocalChecklists(checklists)
        calculateDoneTodos(checklists)
    }, [checklists]);

    async function handleToggle(listId, todoId, isDone, ev) {
        ev.stopPropagation();
        try {
            await onToggleDoneTodo(listId, todoId, isDone)
        } catch (err) {
            console.error('Cannot toggle todo', err)
            throw err
        }
    }

    function handleTextChange(event) {
        setTxt(event.target.value);
    }

    async function updateTodoTitle(listId, todoId, title) {
        try {
            await onUpdateTodoTitle(listId, todoId, title);
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
            setExpandedListId(null);
            setTxt('');
        } catch (err) {
            console.error('Cannot update list title', err);
            throw err;
        }
    }

    async function addTodo(listId) {
        if (!txt) return;
        try {
            const newTodo = taskService.getDefaultTodo(txt)
            await onAddTodo(listId, newTodo)
            setExpandedTodo({ listId: null, todoId: null })
        } catch (err) {
            console.error('Cannot add todo', err)
            throw err
        }
    }

    async function deleteTodo(ev, listId, todoId) {
        ev.stopPropagation()
        try {
            await onDeleteTodo(listId, todoId)
            calculateDoneTodos(checklists)
        } catch (err) {
            console.error('Cannot delete todo', err)
            throw err;
        }
    }

    function calculateDoneTodos(checklistsToUse) {
        const progressForEachList = checklistsToUse.map(list => {
            const totalTodos = list.todos.length
            const doneTodos = list.todos.filter(todo => todo.isDone).length
            return totalTodos === 0 ? 0 : (doneTodos / totalTodos) * 100
        });
        setProgressbarCalc(progressForEachList)
    }

    function toggleHideChecked(index) {
        const newHideChecked = [...hideChecked]
        newHideChecked[index] = !newHideChecked[index]
        setHideChecked(newHideChecked)
    }

    async function deleteList(listId) {
        try {
            await onDeleteList(listId)
            calculateDoneTodos(checklists)
        } catch (err) {
            console.error('cant delete list');
            throw err
        }
    }

    return (
        <section>
            {localChecklists.map((list, idx) => (
                <ul key={list.id} className="task-checklist clean-list">
                    <span className='checklist-svg'>{checkedSvg.check}</span>
                    {expandedListId !== list.id ?
                        <header>
                            <span className='list-title' onClick={() => setExpandedListId(list.id)}>
                                <span className='title'>{list.title}</span>
                            </span>
                            <div className='header-btns'>

                                <button className='clean-btn task-btn' onClick={() => toggleHideChecked(idx)}>
                                    {hideChecked[idx] ? "Show Checked Items" : "Hide Checked Items"}
                                </button>

                                <button onClick={() => deleteList(list.id)} className='clean-btn task-btn'>Delete</button>
                            </div>
                        </header> :
                        <div className='add-group-input-expanded'>
                            <Textarea
                                sx={{ border: 'none' }}
                                name="title"
                                autoFocus
                                defaultValue={list.title}
                                onChange={handleTextChange}
                                minRows={2}
                            />
                            <section className='add-controls'>
                                <Button type="submit" onClick={() => updateListTitle(list.id, txt)}>Save</Button>
                                <button className='delete clean-btn' onClick={() => setExpandedListId(null)}>{checkList.x}</button>
                            </section>
                        </div>
                    }

                    <div className='progress-bar'>
                        <span>{progressbarCalc[idx] ? progressbarCalc[idx].toFixed() : 0}%</span>
                        <div className='progress-bar-container'>
                            <div className="fill"
                                style={{
                                    width: `${progressbarCalc[idx] ? progressbarCalc[idx] : 0}%`,
                                    backgroundColor: progressbarCalc[idx] === 100 ? 'green' : ''
                                }}>
                            </div>
                        </div>
                    </div>

                    {list.todos.filter(todo => !hideChecked[idx] || !todo.isDone).map(todo => (

                        <li key={todo.id} className={`checklist-item ${todo.isDone ? 'done' : ''}`}>
                            <div className='checkbox'>
                                <Checkbox sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 16
                                    },
                                    color: 'rgba(23, 43, 77, 0.2)'
                                }
                                }
                                    checked={todo.isDone} onClick={(event) => {
                                        handleToggle(list.id, todo.id, !todo.isDone, event)
                                    }} />
                            </div>
                            {expandedTodo.listId === list.id && expandedTodo.todoId === todo.id ?
                                <form >
                                    <textarea
                                        rows={2}
                                        name="title"
                                        autoFocus
                                        defaultValue={todo.title}
                                        onChange={handleTextChange}
                                    />
                                    <section className='add-controls'>
                                        <section>
                                            <Button type="submit" onClick={() => {
                                                updateTodoTitle(list.id, todo.id, txt);
                                                setExpandedTodo({ listId: null, todoId: null });
                                            }}>
                                                Save
                                            </Button>
                                            <button className='cancel clean-btn' onClick={() => setExpandedTodo({ listId: null, todoId: null })}>{checkList.x}</button>
                                        </section>
                                        <button className='delete clean-btn' onClick={(event) => deleteTodo(event, list.id, todo.id)}>{checkList.garbage}</button>
                                    </section>
                                </form> :
                                <span className='todo-title' onClick={() => {
                                    console.log("Trying to expand:", list.id, todo.id);
                                    setExpandedTodo({ listId: list.id, todoId: todo.id });

                                }}>{todo.title}
                                    <button className='delete clean-btn' onClick={(event) => deleteTodo(event, list.id, todo.id)}>{checkList.garbage}</button>
                                </span>

                            }
                        </li>
                    ))}

                    {expandedAddTodoListId !== list.id ?
                        <button className='add-todo task-btn' onClick={() => setExpandedAddTodoListId(list.id)}>Add an item</button> :
                        <section className='add-todo-container'>
                            <Textarea
                                sx={{ border: 'none' }}
                                name="title"
                                autoFocus
                                minRows={2}
                                placeholder={'Add an item'}
                                onChange={handleTextChange}
                            />
                            <div>
                                <Button type='submit' onClick={() => {
                                    addTodo(list.id, txt);
                                    setExpandedAddTodoListId(null);
                                }}>Add</Button>
                                <button className='cancel task-btn' onClick={() => setExpandedAddTodoListId(null)}>Cancel</button>
                            </div>
                        </section>
                    }
                </ul>
            ))}
        </section>
    )
}



