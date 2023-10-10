
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import { TaskProgressbar } from './TaskProgressbar';
import { Flag } from '@mui/icons-material';
import { taskService } from '../services/task.service.local';
import { checkedSvg } from './Svgs';
export function TaskChecklistPreview({onAddTodo, onUpdateListTitle, onDeleteTodo,checklists, onToggleDoneTodo,onUpdateTodoTitle }) {
    // const board = useSelector((storeState) => storeState.boardModule.board);
    const [localChecklists, setLocalChecklists] = useState(checklists);
    const [isTodoExpand, setTodoExpand] = useState(false)
    const [isAddTodoExpand, setAddTodoExpand] = useState(false)
    const [isListTitleExpand, setListTitleExpand] = useState(false)
    const [txt, setTxt] = useState('')
    const [selectedTodoId, setSelectedTodoId] = useState(null);
    const [progressbarCalc,setProgressbarCalc] = useState(0)

    // useEffect(() => {
    //     setLocalChecklists(checklists);
    // }, [board]);

    useEffect(() => {
        calculateDoneTodos();
    }, [localChecklists]);

    async function handleToggle(listId, todoId, isDone,ev) {
        ev.preventDefault()   
        try{
            await onToggleDoneTodo(listId,todoId, isDone);
            const updatedChecklists = localChecklists.map(list => ({
                ...list,
                todos: list.todos.map(todo => 
                    todo.id === todoId ? { ...todo,isDone } : todo
                )}));
                setLocalChecklists(updatedChecklists);
                calculateDoneTodos()
        }
        catch(err) {
            console.log('cannot toggle todo', err);
            throw err
        }
    }

    function handleTextChange(event) {
        setTxt(event.target.value);
    }

    async function updateTodoTitle(listId,todoId, title) {
        try{
            await onUpdateTodoTitle(listId,todoId, title);
            const updatedChecklists = localChecklists.map(list => ({
                ...list,
                todos: list.todos.map(todo => 
                    todo.id === todoId ? { ...todo,title } : todo
                )
            }));
            setLocalChecklists(updatedChecklists);
            setTodoExpand(!isTodoExpand)
            setTxt('')
        }
        catch(err) {
            console.log('cannot update todo title', err);
            throw err
        }
    }

    async function updateListTitle(listId, title) {
        try{
            await onUpdateListTitle(listId, title)
            const updatedChecklists = localChecklists.map(list => ({
                ...list, title
            }))
            setLocalChecklists(updatedChecklists)
            setListTitleExpand(!isListTitleExpand)
            setTxt('')
        } catch (err) {
            console.log('cannot update list title');
            throw err
        }
    }

    async function addTodo(listId, txt) {
        if(!txt) return 
        try {
            await onAddTodo(listId, txt);
            const newTodo = taskService.getDefaultTodo(txt)
            const updatedChecklists = localChecklists.map(list => ({
                ...list,
                todos: [...list.todos, newTodo]
            }));          
            setLocalChecklists(updatedChecklists);
            setAddTodoExpand(!isAddTodoExpand);
        } catch (err) {
            console.log('cannot add todo', err);
            throw err;
        }
    }
    

    async function deleteTodo(listId,todoId) {
        try {
            await onDeleteTodo(listId,todoId);
                const updatedChecklists = localChecklists.map(list => ({
                ...list,
                todos: list.todos.filter(todo => todo.id !== todoId)
            }));
            setLocalChecklists(updatedChecklists);
            setTodoExpand(!isTodoExpand);
        } catch (err) {
            console.log('cannot delete todo', err);
            throw err;
        }
    }

    function calculateDoneTodos() {
        const numOfTodos = localChecklists.reduce((total, list) => total + list.todos.length, 0)
    
        const numOfDoneTodos = localChecklists.reduce((total, list) => 
            total + list.todos.filter(todo => todo.isDone === true).length, 0
        );
        const doneTodos = (numOfDoneTodos / numOfTodos) * 100 
        setProgressbarCalc(doneTodos) 
    }
    
    
    return (
        <section>
            {localChecklists[0] && localChecklists[0].todos.length > 0 && localChecklists.map(list => (
                <ul key={list.id} className="task-checklist clean-list">
                    {!isListTitleExpand ? <span className='header' onClick={() => setListTitleExpand(!isListTitleExpand)}>
                        
                        <span className='checklist-svg'>{checkedSvg.check}</span>
                        <span className='title'>{list.title}</span>
                        
                        </span> : 
                     <div className='add-group-input-expanded'>
                     <Textarea 
                         sx={{ border:'none'}}
                         name="title"
                         autoFocus
                         defaultValue={list.title}
                         onChange={handleTextChange}
                         minRows={2}
                          />
                         <section className='add-controls'>
                             <Button type="submit" onClick={() => updateListTitle(list.id,txt)} >Save</Button>
                             <button className='cancel' onClick={() => setListTitleExpand(!isListTitleExpand)}>X</button>
                             {/* <button className='delete' onClick={()=> deleteTodo(todo.id)}>Delete</button> */}
                         </section>
                    </div>
                    
                    }
                    
                    <div className='progress-bar'>
                    <span>{progressbarCalc.toFixed()}%</span>
                        <div className='progress-bar-container'>
                        <div className="fill" style={{ width: `${progressbarCalc}%` }}></div>
                        </div>                        
                    </div>
                    {list.todos.map(todo => {
                        return (
                        <li key={todo.id} className={`checklist-item ${todo.isDone ? 'done' : ''}` }>
                            <div className='checkbox'>

                                <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} defaultChecked={todo.isDone} onChange={(event) => handleToggle(list.id, todo.id, !todo.isDone,event)} />
                            </div>
                            {!isTodoExpand || selectedTodoId !== todo.id ? 
                             <span onClick={() => { setSelectedTodoId(todo.id), setTodoExpand(!isTodoExpand) }}>{todo.title}</span> : 
                             <div className='add-group-input-expanded'>
                             <Textarea 
                                 sx={{ border:'none'}}
                                 name="title"
                                 autoFocus
                                 defaultValue={todo.title}
                                 onChange={handleTextChange}
                                  />
                                 <section className='add-controls'>
                                     <Button type="submit" onClick={() => updateTodoTitle(list.id,todo.id,txt)} >Save</Button>
                                     <button className='cancel' onClick={() => setTodoExpand(!isTodoExpand)}>X</button>
                                     <button className='delete' onClick={()=> deleteTodo(list.id,todo.id)}>Delete</button>
                                 </section>
                            </div>
                            }
                        </li>
                    )})}

                    {!isAddTodoExpand ? <button className='add-todo task-btn' onClick={() => setAddTodoExpand(!isAddTodoExpand)}>Add an item</button>
                    : <section>
                        <Textarea 
                                 sx={{ border:'none'}}
                                 name="title"
                                 autoFocus
                                 minRows={2}
                                 defaultValue={'Add an item'}
                                 onChange={handleTextChange}
                        />
                        <div>
                            <Button type='submit'  onClick={() => addTodo(list.id, txt)}>Save</Button>
                            <button className='cancel task-btn' onClick={() => setAddTodoExpand(!isAddTodoExpand)}>Cancel</button>
                        </div>
                        </section>}
                </ul>
            ))}
        </section>
    )
}

// {!isInputExpand ?
//     <div className='add-group-msg' onClick={() => setInputExpand(!isInputExpand)}>
//         <span>+ Add another list </span>
//         </div> :
    // <div className='add-group-input-expanded'>
    //     <Textarea 
    //         sx={{ border:'none'}}
    //         name="title"
    //         placeholder="Enter list title..."
    //         autoFocus
    //         value={newGroup.title}
    //         onChange={handleChange}
    //          />
    //         <section className='add-controls'>
    //             <Button type="submit" onClick={onSaveNewGroup}>Add List</Button>
    //             <button className='cancel' onClick={() => setInputExpand(!isInputExpand)}>X</button>
    //         </section>
    // </div>}


