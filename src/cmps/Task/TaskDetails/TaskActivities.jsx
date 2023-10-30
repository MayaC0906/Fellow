
import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { utilService } from '../../../services/util.service'
// import { useParams } from 'react-router'
import { TaskComments } from "./TaskComments"

import { boardMenu } from '../../Svgs'
export function TaskActivities({ onSaveTask, groupId, task }) {
    const board = useSelector((storeState) => storeState.boardModule.board)
    const { activities } = board;
    const [showActivities, setShowActivities] = useState(true);

    const taskActivities = activities.filter(activity => activity.task.id === task.id)
                                     .map(activity => ({ ...activity, type: 'activity' }))

    const typedComments = task.comments.map(comment => ({ ...comment, type: 'comment' }))

    const combinedArray = [...taskActivities, ...typedComments].sort((a, b) => b.createdAt - a.createdAt)

    async function onRemoveComment(commentId) {
        try {
            const updatedComments = task.comments.filter(comment => comment.id !== commentId)
            const newTask = { ...task, comments: updatedComments }
            onSaveTask(newTask)
        } catch (err) {
            console.log('Cannot remove comment', err)
            throw err
        }
    }
    return (
        <div className='task-activities'>
            <header className='flex'>
                {boardMenu.activity}
                <span>Activity</span>
                <button className="task-btn" style={{marginTop:'0px'}} onClick={() => setShowActivities(!showActivities)}>
                    {showActivities ? 'Hide Details' : 'Show Details'}
                </button>
            </header>
            <TaskComments onSaveTask={onSaveTask} groupId={groupId} task={task} />

            {combinedArray.map(item => (
                item.type === 'activity' ? 
                (
                    showActivities && (
                        <div className='bgc-modal-layout activities' 
                             style={{height:'max-content', padding: '0px 12px 0px'}} 
                             key={item.id}>
                            <div className='activity' 
                                 style={{ display: '', alignItems: 'center', marginBottom: '10px', padding: '5px 0px' }}>
                                <span>
                                    <img 
                                        src={item.byMember.imgUrl}
                                        alt={item.byMember.fullname}
                                        style={{ width: '32px', borderRadius: '20px', marginRight: '10px' }}
                                    />
                                </span>
                                <article>    
                                    <strong>{item.byMember.fullname}</strong> {item.txt}
                                    <div style={{ fontSize: '12px', color: 'grey' }}>
                                        {utilService.formatDate(item.createdAt)}
                                    </div>
                                </article>
                            </div>
                        </div>
                    )
                ) :  
                (
                    <div className='comment-item flex' style={{ marginLeft:'56px' }}>
            
                   
                    <div style={{ flex: 1 , position:'relative'}}>
                    <img src={item.byMember.imgUrl}
                        style={{ width: '32px',
                        height: '32px',
                        borderRadius: '50%', 
                        marginRight: '10px',
                        position: 'absoulte'
                        }} /> 
                        <div className="flex" style={{gap:'6px'}}>
                            <strong>{item.byMember.fullname}</strong>
                            <div style={{ fontSize: '12px', color: 'grey', marginBottom: '5px' }}>
                                {utilService.formatDate(item.createdAt)}
                            </div>
                        </div>
                        <div className="comment-txt" >
                            {item.txt}
                        </div>
                        
                    </div>
                    <div className='comment-actions' style={{ display: 'flex',gap:'4px', alignItems: 'center' }}>
                            {/* <button style={{ marginRight: '5px' }}>🙂</button> */}
                            {/* <button className="clean-btn" onClick={() => Handle edit}>Edit</button> */}
                            <button className="clean-btn" onClick={() => {onRemoveComment(item.id)}}>Delete</button>
                        </div>
                </div>
                )
            ))}
        </div>
    )
}
