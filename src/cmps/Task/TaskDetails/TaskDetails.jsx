import { useNavigate, useParams } from "react-router"
import { deleteTask, loadTask } from "../../../store/actions/board.actions"
import { useEffect, useState } from "react"
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
    const navigate = useNavigate()

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
        try {
            await saveNewTask(boardId, groupId, updatedTask, user, txt)
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
                        <div className="cover-btn dark-btn" onClick={() => setEditName('Cover')}><span>{taskSvg.cover}</span> <span></span>cover</div>
                    </div>}
                    {task.cover?.img && (
                        <div style={{ backgroundColor: imgBackground }} className="img-cover">
                            <div className="cover-btn dark-btn" onClick={() => setEditName('Cover')}><span>{taskSvg.cover}</span>cover</div>
                            <img src={task.cover.img} alt="" />
                        </div>
                    )}

                    <div className="task-detail-screen">
                        <TaskTitle className="task-detail-title" onSaveTask={onSaveTask} task={task} />
                        <section className="task-main">
                            <section className="task-info">
                                <section className="task-items-display flex">
                                    <TaskMember
                                        taskMembersId={task.memberIds}
                                        setEditName={setEditName}
                                        editName={editName}
                                        onSaveTask={onSaveTask}
                                        task={task}
                                    />
                                    <TaskLabel
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
                                    <TaskActivities task={task} />
                                </section>
                            </section >


                            <section className="edit-task-nav">
                                <TaskDetailsSideNav
                                    onActionDeleteTask={onActionDeleteTask}
                                    onDeleteTask={onDeleteTask}
                                    setTask={setTask}
                                    editName={editName}
                                    setEditName={setEditName}
                                    onSaveTask={onSaveTask}
                                    task={task}
                                />
                            </section >
                        </section>
                    </div>
                </article >
            </section >
        </div >
    )

}