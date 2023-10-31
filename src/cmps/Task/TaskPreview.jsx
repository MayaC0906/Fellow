import dayjs from "dayjs"
import { loaderSvg, taskSvg } from "../Svgs"
import { deleteTask, saveNewTask } from "../../store/actions/board.actions"
import { useNavigate, useParams } from "react-router"
import { darken } from 'polished';
import { useState, Fragment, useRef, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { TaskDetailsSideNav } from "./TaskDetailsSideNav";

export function TaskPreview({ task, setIsLabelsShown, isLabelsShown, taskLabels, taskMembers, taskChecklist, groupId, onScrollDown, tasks }) {
    const { dueDate } = task
    const { boardId } = useParams()
    let [editName, setEditName] = useState('')
    const [isQuickEdit, setIsQuickEdit] = useState(false)
    let taskRef = useRef(null)
    const [quickEditPosition, setQuickEditPosition] = useState({ top: '', left: '' })
    const [rtl, setRtl] = useState(false)
    const navigate = useNavigate()

    function getBounds(ev) {
        const taskRect = taskRef.current.getBoundingClientRect()
        const screenWidth = window.innerWidth
        if (screenWidth - ev.clientX < 175) {
            setRtl(true)
            setQuickEditPosition({
                top: taskRect.top,
                left: taskRect.x - 195
            })

        } else {
            setRtl(false)
            setQuickEditPosition({
                top: taskRect.top,
                left: taskRect.x + 230
            })
        }

    }

    function onLabelOpen(ev) {
        ev.preventDefault()
        setIsLabelsShown(!isLabelsShown)
    }

    async function onCompleteDueDate(ev) {
        ev.preventDefault()
        dueDate.isComplete = !dueDate.isComplete
        try {
            await saveNewTask(boardId, groupId, task)
        } catch (err) {
            console.log(`Couldn't save task`, err);
        }
    }

    function onOpenQuickEdit(ev) {
        if (window.innerHeight - ev.clientY < taskRef.current.offsetHeight + 110) {
            onScrollDown(ev)
        }
        getBounds(ev)
        ev.preventDefault()
        ev.stopPropagation()
        setIsQuickEdit(true)
    }

    async function onSaveTask(updatedTask) {
        try {
            await saveNewTask(boardId, groupId, updatedTask)
            setTask(updatedTask)
        } catch (err) {
            console.log('cant save task');
        }
    }

    async function onDeleteTask(taskId) {
        try {
            await deleteTask(boardId, groupId, taskId)
        } catch (err) {
            console.log('cant save task');
        }
    }
    function onActionDeleteTask() {
        navigate(`/board/${boardId}`)
        onDeleteTask(task.id)
    }

    if (!task) return <div className="loader task-preview">{loaderSvg.loader}</div>

    const defaultContent = <article ref={taskRef} key={task.id} className="task">
        {!isQuickEdit && <button
            className="quick-edit-badge"
            onClick={(event) => { onOpenQuickEdit(event, task) }}>
            <span className="icon-badge">{taskSvg.pencil}</span>
        </button>}
        {task.cover?.backgroundColor && <div className="task-cover"
            style={{ backgroundColor: task.cover.backgroundColor }}></div>}
        {task.cover?.img && <img className="task-cover" src={task.cover.img} alt="" />}

        <section className="task-info">
            <section className="labels">
                {taskLabels.map(label => {
                    return <div key={label.id}
                        className={"label " + (isLabelsShown ? 'open' : 'close')}
                        style={{ backgroundColor: label.color }}
                        onClick={onLabelOpen} >
                        {label.title && <span className="label-title"
                            style={{ color: darken(0.4, label.color) }}>
                            {label.title}</span>}
                    </div>
                })}
            </section>
            <h3>{task?.title}</h3>
            <section className="task-badges">
                {task.watching && <div className="task-badge">
                    <span className="icon-badge">{taskSvg.watch}</span>
                </div>}

                {dueDate.date &&
                    <div className={`task-badge duedate ${dueDate.isComplete ? 'complete' : ''}
                 ${dueDate.isOverdue && !dueDate.isComplete ? 'overdue' : ''}
                  ${dueDate.isDueSoon && !dueDate.isComplete ? 'duesoon' : ''}`}
                        onClick={(e) => onCompleteDueDate(e)}>

                        <span className="clock icon-badge">{taskSvg.clock}</span>

                        {dueDate.isComplete ? <span className="checklist icon-badge">
                            {taskSvg.checklist}</span>
                            : <span className="empty-square icon-badge">{taskSvg.square}</span>}

                        <span className='date-data number-badge'>
                            {dayjs(dueDate.date, 'MMM D [at] h:mm A').format('MMM D, YYYY')}</span>

                    </div>}

                {task.description && <div className="task-badge">
                    <span className="icon-badge">{taskSvg.description}</span>
                </div>}
                {task.comments?.length > 0 && <div className="task-badge">
                    <span className="icon-badge">{taskSvg.comment}</span>
                    <span className="number-badge">{task.comments.length}</span>
                </div>}
                {task.attachments?.length > 0 && <div className="task-badge">
                    <span className="icon-badge">{taskSvg.attatchment}</span>
                    <span className="number-badge">{task.attachments.length}</span>
                </div>}
                {task.checklists?.length > 0 &&
                    <div className={"task-badge " +
                        (taskChecklist.done === taskChecklist.all ? 'complete' : '')}>
                        <span className="icon-badge">{taskSvg.checklist}</span>
                        <span className="number-badge">{taskChecklist.done}/{taskChecklist.all}</span>
                    </div>}
            </section>

            {task.memberIds?.length > 0 &&
                <section className="task-members">
                    {taskMembers.map(member => <img key={member._id}
                        className="member" src={member.imgUrl} alt="" />)}
                </section>
            }
        </section>
    </article>
    return (
        <Fragment>
            <div className={"task-container " + (isQuickEdit ? 'quickedit' : '')}
            >
                {!isQuickEdit && <Link to={`${groupId}/${task.id}`}>
                    {defaultContent}
                </Link>}
                {isQuickEdit && defaultContent}
                {isQuickEdit &&
                    <section className={"edit-actions " + (rtl ? 'rtl' : '')}
                        style={{ top: quickEditPosition.top, left: quickEditPosition.left + 30 }}>
                        <button className="open-card-btn" onClick={() => {
                            setIsQuickEdit(false)
                            navigate(`${groupId}/${task.id}`)
                        }}>
                            <span>{taskSvg.title}</span>
                            Open card
                        </button>
                        <TaskDetailsSideNav
                            rtl={rtl}
                            onActionDeleteTask={onActionDeleteTask}
                            isQuickEdit={true}
                            editName={editName}
                            setEditName={setEditName}
                            onSaveTask={onSaveTask}
                            task={task} />
                        <button
                            className="save-btn" onClick={(event) => {
                                event.preventDefault
                                setIsQuickEdit(false)
                            }}>Save</button>
                    </section>
                }
            </div>

            {
                isQuickEdit && <div onClick={(event) => {
                    event.stopPropagation()
                    setIsQuickEdit(false)
                }}
                    className="back-drop-quick">
                </div>
            }
        </Fragment >
    )
}