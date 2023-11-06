import { useNavigate, useParams } from "react-router"
import { deleteTask, loadTask } from "../../../store/actions/board.actions"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { TaskTitle } from "./TaskTitle"
import { TaskDescription } from "./TaskDescription"
import { TaskDetailsSideNav } from "../TaskDetailsSideNav"
import { loaderSvg, taskSvg } from "../../Svgs"
import { TaskAttachments } from "./TaskAttachments"
import { useSelector } from 'react-redux'
import { saveNewTask } from "../../../store/actions/board.actions"

import { TaskCheckList } from "./TaskChecklist-list"
import { TaskDate } from "./TaskDate"
import { TaskMember } from "./TaskMember"
import { TaskLabel } from "./TaskLabel"
import { utilService } from "../../../services/util.service"
import { TaskActivities } from "./TaskActivities"


export function TaskDetails() {
    const { boardId, groupId, taskId } = useParams()
    const [task, setTask] = useState('')
    const [imgBackground, setImgBackground] = useState('white')
    let [editName, setEditName] = useState('')
    const user = useSelector((storeState) => storeState.userModule.user)
    const board = useSelector((storeState) => storeState.boardModule.board)
    const navigate = useNavigate()
    const [isPhoneDisplay, setIsPhoneDisplay] = useState({ isDisplay: false, isActionsShown: false })
    const [ev, setEv] = useState(null)
    let groups = board.groups

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    function handleResize() {
        const screenWidth = window.innerWidth
        if (screenWidth <= 670) setIsPhoneDisplay((prevState => ({ ...prevState, isDisplay: true })))
        else setIsPhoneDisplay((prevState => ({ ...prevState, isDisplay: false, isActionsShown: false })))

    }

    useEffect(() => {
        onLoadTask(boardId, groupId, taskId)
    }, [])

    useEffect(() => {
        onChangeBgc()
    }, [task?.cover?.img])

    async function onLoadTask(boardId, groupId, taskId) {
        try {
            const newTask = await loadTask(boardId, groupId, taskId)
            setTask(newTask)
        } catch (err) {
            console.log('Can\'t load board', err);
            throw err
        }
    }

    async function onSaveTask(updatedTask, txt) {
        const currGroup = groups.findIndex(g => g.id === groupId)
        if (updatedTask.id) {
            const taskIdx = groups[currGroup].tasks.findIndex(task => task.id === updatedTask.id)
            groups[currGroup].tasks[taskIdx] = updatedTask
        } else {
            updatedTask.id = utilService.makeId()
            groups[currGroup].tasks.push(updatedTask)
        }
        const boardToSave = { ...board, groups: board.groups }
        console.log(boardToSave);
        const prevTask = { ...task }
        setTask(updatedTask)
        try {
            saveNewTask(boardId, groupId, updatedTask, user, txt, boardToSave)
        } catch (err) {
            console.log('cant save task');
            setTask(prevTask)
        }
    }

    async function onDeleteTask(taskId) {
        try {
            await deleteTask(boardId, groupId, taskId)
        } catch (err) {
            console.log('cant save task');
        }
    }

    //Dynamic component

    function onActionDeleteTask() {
        navigate(`/board/${boardId}`)
        onDeleteTask(task.id)
    }

    async function onChangeBgc() {
        try {
            const bgc = await utilService.getDominantColor(task.cover.img)
            setImgBackground(`rgb(${bgc.rgb})`)
        } catch (err) {
            console.log('Cannot change background', err);
        }
    }

    if (!task) return <div className="loader task-details"><div>{loaderSvg.loader}</div></div>

    return (
        <div className="task-details">
            <section className="modal-container">
                <article className="task-modal">

                    <Link className="close-btn" to={`/board/${boardId}`}>
                        {taskSvg.plus}
                    </Link>

                    {task.cover?.backgroundColor && <div className="color-cover" style={{ backgroundColor: task.cover.backgroundColor }}>
                        <div className="cover-btn dark-btn" onClick={(event) => {
                            setEditName('Cover')
                            setEv(event)
                        }}>
                            <span>{taskSvg.cover}</span> <span></span>Cover</div>
                    </div>}
                    {task.cover?.img && (
                        <div style={{ backgroundColor: imgBackground }} className="img-cover">
                            <div className="cover-btn dark-btn" onClick={(event) => {
                                setEv(event)
                                setEditName('Cover')
                            }}>
                                <span>{taskSvg.cover}</span>Cover</div>
                            <img src={task.cover.img} alt="" />
                        </div>
                    )}

                    <div className="task-detail-screen">
                        <TaskTitle className="task-detail-title" onSaveTask={onSaveTask} task={task} />
                        <section className="task-main">

                            {isPhoneDisplay.isDisplay && <button
                                className="actions-show-btn"
                                onClick={() => {
                                    setIsPhoneDisplay((prevState => ({
                                        ...prevState, isActionsShown: !prevState.isActionsShown
                                    })))
                                }}>
                                <span>Card actions</span>
                                <span>{taskSvg.dropDoen}</span>
                            </button>}
                            {(!isPhoneDisplay.isDisplay || isPhoneDisplay.isActionsShown) &&
                                <section className="edit-task-nav">
                                    <TaskDetailsSideNav
                                        ev={ev}
                                        setEv={setEv}
                                        onActionDeleteTask={onActionDeleteTask}
                                        onDeleteTask={onDeleteTask}
                                        setTask={setTask}
                                        editName={editName}
                                        setEditName={setEditName}
                                        onSaveTask={onSaveTask}
                                        task={task}
                                    />
                                </section >}
                            <section className="task-info">
                                <section className="task-items-display flex">
                                    <TaskMember
                                        setEv={setEv}
                                        taskMembersId={task.memberIds}
                                        setEditName={setEditName}
                                        editName={editName}
                                        onSaveTask={onSaveTask}
                                        task={task}
                                    />
                                    <TaskLabel
                                        setEv={setEv}
                                        taskLabelsId={task.labelIds}
                                        setEditName={setEditName}
                                        editName={editName}
                                    />
                                </section>

                                {task.dueDate.date && (
                                    <section className="task-date-show">
                                        <TaskDate
                                            task={task}
                                            setEditName={setEditName}
                                            editName={editName}
                                            onSaveTask={onSaveTask}
                                        />
                                    </section>
                                )}


                                <section className="task-content">
                                    <TaskDescription
                                        onSaveTask={onSaveTask}
                                        task={task} />
                                    <TaskAttachments
                                        setEditName={setEditName}
                                        onSaveTask={onSaveTask}
                                        task={task}
                                    />
                                    <TaskCheckList
                                        setTask={setTask}
                                        setEditName={setEditName}
                                        // checklists={task.checklists}
                                        onSaveTask={onSaveTask}
                                        task={task}
                                    />
                                    <TaskActivities onSaveTask={onSaveTask} groupId={groupId} task={task} />
                                </section>
                            </section >

                        </section>
                    </div>
                </article >
            </section >
        </div >
    )

}