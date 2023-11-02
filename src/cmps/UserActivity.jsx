import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { utilService } from '../services/util.service.js';
// import { boardMenu } from '../../Svgs';
import { boardMenu } from './Svgs.jsx';
import ReactDOM from 'react-dom';
import { checkList } from './Svgs.jsx';
export function UserActivity({ user, setUserActivityModal, isOpen }) {
    // console.log('userId from activity', user);

    const board = useSelector((storeState) => storeState.boardModule.board);
    const { activities } = board;
    // console.log(activities);

    const userActivities = activities.filter(activity => activity.byMember._id === user._id);
    // console.log('user activity', userActivities);


    return ReactDOM.createPortal(
        <div className="user-act-modal-overlay">
            <div className="user-act-modal">
                <header className='flex'>
                    {boardMenu.activity}
                    <span>{user.fullname}({user.username})</span>
                    <button onClick={() => setUserActivityModal(!isOpen)} className='clean-btn close-act task-btn'
                        style={{ marginTop: '0px', marginLeft: '0px' }}>{checkList.x}
                    </button>
                </header>
                <div className='bgc-modal-layout activities'>
                    {userActivities.map((activity) => (
                        <div className='activity' key={activity.id} style={{ display: '', alignItems: 'center', marginBottom: '10px' }}>
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
                                <div style={{ fontSize: '12px', color: 'grey' }}>{utilService.formatDate(activity.createdAt)}</div>
                            </article>
                        </div>
                    ))}
                </div>
            </div>
        </div>,
        document.body
    );
}
