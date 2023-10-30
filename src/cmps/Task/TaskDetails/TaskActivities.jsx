
import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { utilService } from '../../../services/util.service'
// import { useParams } from 'react-router'
import { boardMenu } from '../../Svgs'
export function TaskActivities({ task }) {
    const board = useSelector((storeState) => storeState.boardModule.board);
    const { activities } = board;
    
    // Filter the activities for the current task
    const taskActivities = activities.filter(activity => activity.task.id === task.id);

    return (
        <div className='task-activities'>
            {/* Conditionally render the header */}
            {taskActivities.length > 0 && (
                <header className='flex'>
                    {boardMenu.activity}
                    <span>Activity</span>
                </header>
            )}

            {taskActivities.map((activity) => (
                <div className='bgc-modal-layout activities' 
                     style={{height:'max-content', padding: '0px 12px 0px'}} 
                     key={activity.id}>
                   
                    <div className='activity' 
                         style={{ display: '', alignItems: 'center', marginBottom: '10px', padding: '5px 0px' }}>
                        <span>
                            <img 
                                // ref={(el) => imgRefs.current[activity.id] = el}
                                // onClick={() => handleImgClick(activity)}
                                src={activity.byMember.imgUrl}
                                alt={activity.byMember.fullname}
                                style={{ width: '32px', borderRadius: '20px', marginRight: '10px' }}
                            />
                        </span>
                        <article>    
                            <strong>{activity.byMember.fullname}</strong> {activity.txt}
                            <div style={{ fontSize: '12px', color: 'grey' }}>
                                {utilService.formatDate(activity.createdAt)}
                            </div>
                        </article>
                    </div>
                </div>
            ))}
        </div>
    )
}
