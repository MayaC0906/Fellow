import React from 'react'
import { useState, useRef } from 'react'
import { taskSvg } from '../Svgs'
import { additionTaskSvg } from '../Svgs'

export function BoardActivity({ board }) {
    const { activities } = board;
    const [selectedActivity, setSelectedActivity] = useState(null)
    const imgRefs = useRef({});
    const containerRef = useRef(null)
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })

    function formatDate(timestamp){
        const now = Date.now()
        const differenceInSeconds = (now - timestamp * 1000) / 1000
        const differenceInMinutes = differenceInSeconds / 60
        const differenceInHours = differenceInMinutes / 60

        if (differenceInMinutes < 1) {
        return 'just now'
        } else if (differenceInHours < 1) {
        return `${Math.round(differenceInMinutes)} minutes ago`
        } else if (differenceInHours < 24) {
        return `${Math.round(differenceInHours)} hours ago`
        } else if (differenceInHours < 48) {
        const date = new Date(timestamp * 1000)
        return `yesterday at ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
        } else {
        const date = new Date(timestamp * 1000)
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
        }
    };

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
    return (
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
                        <strong>{activity.byMember.fullname}</strong> {activity.txt}
                        <div style={{ fontSize: '12px', color: 'grey' }}>{formatDate(activity.createdAt)}</div>
                    </article>
                </div>
            ))}

            {selectedActivity && 
                <section className="specific-member" style={{ position: 'absolute',
                top: modalPosition.top,
                left: modalPosition.left,
                zIndex: '100',
                background: '#ffff'
                }}>
                <section className="specific-member-display flex">
                     <button onClick={() => setSelectedActivity(null)} className="specific-member-close flex">{additionTaskSvg.close}</button>
                     <img style={{borderRadius:'50%'}} src={selectedActivity.byMember.imgUrl} alt=""/>
                     <div className="flex">
                         <h2 className="full-name">{selectedActivity.byMember.fullname}</h2>
                         <h2 className="user-name">@userName - further</h2>
                     </div>
                 </section>
                 <hr />
             </section>
            }
        </div>
    );
}
