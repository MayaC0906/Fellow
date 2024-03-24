import React from 'react'
import { useState, useRef } from 'react'
import { taskSvg } from '../Svgs'
import { additionTaskSvg } from '../Svgs'
import { UserActivity } from '../UserActivity'
import { Link } from 'react-router-dom'
import { utilService } from '../../services/util.service'

export function BoardActivity({ board }) {
    const { activities } = board;
    const [selectedActivity, setSelectedActivity] = useState(null)
    const imgRefs = useRef({});
    const containerRef = useRef(null)
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
    const [userActivityModal, setUserActivityModal] = useState({ isOpen: false, userId: '' })



    const handleImgClick = (activity) => {
        setSelectedActivity(activity)

        if (imgRefs.current[activity.id] && containerRef.current) {
            const imgRect = imgRefs.current[activity.id].getBoundingClientRect()
            const containerRect = containerRef.current.getBoundingClientRect()

            const top = imgRect.top - containerRect.top
            const left = imgRect.left - containerRect.left

            setModalPosition({ top: top, left: left })
        }
    }

    function onSetUserActivityModal(user) {
        setUserActivityModal(prevState => ({
            isOpen: !prevState.isOpen,
            user,
        }))
    }
    return (
        // <>
        <div className='bgc-modal-layout activities' ref={containerRef}>
            {activities.map((activity) => (
                <div className='activity' key={activity.id} style={{ display: '', alignItems: 'center', marginBottom: '10px' }}>
                    <span>
                        <img
                            ref={(el) => imgRefs.current[activity.id] = el}
                            onClick={() => handleImgClick(activity)}
                            src={activity.byMember.imgUrl}
                            alt={activity.byMember.fullname}
                            style={{ width: '32px', borderRadius: '20px', marginRight: '10px' }}
                        />
                    </span>
                    <article>
                        <strong>{activity.byMember.fullname} </strong>
                        {(() => {
                            if (activity.task && activity.task.title) {
                                const titleIndex = activity.txt.indexOf(activity.task.title);
                                if (titleIndex !== -1) {
                                    const beforeTitle = activity.txt.substring(0, titleIndex);
                                    const afterTitle = activity.txt.substring(titleIndex + activity.task.title.length);
                                    return (
                                        <>
                                            {beforeTitle}
                                            <Link to={`${activity.group.id}/${activity.task.id}`}>
                                                {activity.task.title}
                                            </Link>
                                            {afterTitle}
                                        </>
                                    );
                                }
                            }
                            return activity.txt;
                        })()}
                        <div style={{ fontSize: '12px', color: 'grey' }}>{utilService.formatDate(activity.createdAt)}</div>
                    </article>
                </div>
            ))}


            {selectedActivity &&
                <section className="specific-member" style={{
                    position: 'absolute',
                    top: modalPosition.top,
                    left: modalPosition.left,
                    height: 'max-content',
                    zIndex: '100',
                    background: '#ffff'
                }}>
                    <section className="specific-member-display flex">
                        <button onClick={() => setSelectedActivity(null)} className="specific-member-close flex">{additionTaskSvg.close}</button>
                        <img style={{ borderRadius: '50%' }} src={selectedActivity.byMember.imgUrl} alt="" />
                        <div className="flex">
                            <h2 className="full-name">{selectedActivity.byMember.fullname}</h2>
                            <h2 className="user-name">{selectedActivity.byMember.username}</h2>
                        </div>

                    </section>
                    <hr />
                    <div className='activity-member-view' onClick={() => onSetUserActivityModal(selectedActivity.byMember)}>View member's board activity</div>

                </section>
            }
            {userActivityModal.isOpen &&
                <UserActivity
                    setUserActivityModal={setUserActivityModal}
                    isOpen={userActivityModal.isOpen}
                    user={userActivityModal.user}
                />}
        </div>

        // </>
    );
}
