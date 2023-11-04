import { useState, useEffect } from "react";
import { utilService } from "../services/util.service";

export function UserNotifications({ setNewActivity, newActivity, user, isNotificationsOpen, setNotificationsOpen, notifications }) {
    // This will group notifications by their task ID into an object
    const [groupedByTask, setGroupedByTask] = useState({})

    useEffect(() => {
        const groupByTask = notifications.reduce((acc, newActivity) => {
            const groupingId = newActivity.task?.id || newActivity.group?.id || newActivity.id
            if (!acc[groupingId]) {
                acc[groupingId] = {
                    activities: [],
                    taskTitle: newActivity.task?.title || '',
                    groupTitle: newActivity.group?.title || '',
                    boardTitle: newActivity.board?.title || '',
                    boardBgc: newActivity.board?.bgc || '',
                    isGroupedByTask: !!newActivity.task?.id
                };
            }
            acc[groupingId].activities.unshift(newActivity)
            return acc
        }, {});
        setGroupedByTask(groupByTask)
    }, [notifications])

    useEffect(() => {
        if (!newActivity) return
        setGroupedByTask(prevGroupedByTask => {
            const groupId = newActivity.task?.id
            if (!newActivity.board.id) {
                console.error('Activity does not have a task ID:', newActivity)
                return prevGroupedByTask
            }
            const updatedGroupedByTask = { ...prevGroupedByTask }
            if (updatedGroupedByTask[groupId]) {
                updatedGroupedByTask[groupId].activities = [
                    newActivity,
                    ...updatedGroupedByTask[groupId].activities,
                ];
            } else {
                updatedGroupedByTask[groupId] = {
                    activities: [newActivity],
                    taskTitle: newActivity.task?.title || '',
                    groupTitle: newActivity.group?.title || '',
                    boardTitle: newActivity.board?.title || '',
                    boardBgc: newActivity.board?.bgc || '',
                    isGroupedByTask: true,
                }
            }

            return updatedGroupedByTask
        });
    }, [newActivity])

    const notificationCount = Object.values(groupedByTask).reduce((acc, group) => acc + group.activities.length, 0)

    return (
        <div style={{ width: '420px', position: 'absolute', zIndex: '45', height: '888px', overflow: 'auto' }} className={`board-menu notifications-modal ${isNotificationsOpen ? 'translate' : ''}`}>
            <div className="board-menu-container notifications">
                <div className="board-menu-notification-content">
                    <header className="board-menu-header">
                        <div>
                            <div className="notification-bell">
                                <span className="notification-count">{notificationCount}</span>
                            </div>
                            <h3>Notifications</h3>
                            <button className="close-btn clean-btn" onClick={() => setNotificationsOpen(!isNotificationsOpen)}>X</button>
                        </div>
                    </header>
                    <hr className="divider" />
                    <div className="notification-list">
                        {Object.entries(groupedByTask).map(([groupId, groupData]) => (
                            <div key={groupId} className="notification-group">
                                <div
                                    className="notification-group-header"
                                    style={{ backgroundImage: `linear-gradient(0deg, rgba(10, 11, 19, 0.7) 50%, rgba(10, 11, 19, 0.7) 0%), url(${groupData.boardBgc})` }}
                                >
                                    <div className="task-title-con">

                                        <div className="task-title">{groupData.taskTitle}</div>
                                    </div>
                                    <div className="board-group-info">
                                        <span className="board-title">{groupData.boardTitle}</span>
                                        {groupData.groupTitle && (
                                            <span className="group-title"> : {groupData.groupTitle}</span>
                                        )}
                                    </div>
                                </div>
                                <section className="bottom-notifications-area">
                                    {groupData.activities.map((activity) => (
                                        <div key={activity.id} className="notification-item">
                                            <img style={{ borderRadius: '50%' }} src={activity.byMember.imgUrl} alt={activity.byMember.fullname} className="notification-avatar" />
                                            <div className="notification-content">
                                                <strong>{activity.byMember.fullname}</strong> <span>{activity.txt}</span>
                                                <div className="notification-date">
                                                    {utilService.formatDate(activity.createdAt)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </section>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
