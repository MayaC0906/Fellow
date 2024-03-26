import { useState, useEffect } from "react";
import { utilService } from "../services/util.service";
import { checkList } from "./Svgs";

export function UserNotifications({ newActivity, isNotificationsOpen, setNotificationsOpen, notifications }) {

    const [groupedByTask, setGroupedByTask] = useState({})

    useEffect(() => {
        const groupByTask = notifications.reduce((acc, activity) => {
            const groupingId = activity.task?.id || activity.group?.id || activity.id
            const existingGroup = acc.find(group => group.id === groupingId)
            if (existingGroup) {
                existingGroup.activities.unshift(activity)
            } else {
                acc.push({
                    id: groupingId,
                    activities: [activity],
                    taskTitle: activity.task?.title || '',
                    groupTitle: activity.group?.title || '',
                    boardTitle: activity.board?.title || '',
                    boardBgc: activity.board?.bgc || '',
                    isGroupedByTask: !!activity.task?.id,
                })
            }
            return acc
        }, [])

        groupByTask.sort((a, b) => {
            const lastActivityA = a.activities[0].createdAt
            const lastActivityB = b.activities[0].createdAt;
            return lastActivityB - lastActivityA
        });

        setGroupedByTask(groupByTask)
    }, [notifications]);

    useEffect(() => {

        if (!newActivity) return

        setGroupedByTask(prevGroupedByTask => {
            const groupId = newActivity.task?.id || newActivity.group?.id || newActivity.id
            let groupExists = false;

            const updatedGroups = prevGroupedByTask.map(group => {
                if (group.id === groupId) {
                    groupExists = true
                    return {
                        ...group,
                        activities: [newActivity, ...group.activities],
                    };
                }
                return group
            });

            if (!groupExists) {
                updatedGroups.unshift({
                    id: groupId,
                    activities: [newActivity],
                    taskTitle: newActivity.task?.title || '',
                    groupTitle: newActivity.group?.title || '',
                    boardTitle: newActivity.board?.title || '',
                    boardBgc: newActivity.board?.bgc || '',
                    isGroupedByTask: !!newActivity.task?.id,
                })
            }

            updatedGroups.sort((a, b) => {
                const lastActivityA = a.activities[0].createdAt
                const lastActivityB = b.activities[0].createdAt
                return lastActivityB - lastActivityA
            })
            return updatedGroups
        })

    }, [newActivity])

    return (
        <div style={{ right: '0', width: '420px', position: 'absolute', zIndex: '45', height: '888px', overflow: 'auto' }} className={`board-menu notifications-modal ${isNotificationsOpen ? 'translate' : ''}`}>
            <div className="board-menu-container notifications">
                <div className="board-menu-notification-content">
                    <header className="board-menu-header">
                        <div>
                            <div className="notification-bell">
                            </div>
                            <span style={{ marginTop: '14px', fontSize: '16px' }}>Notifications</span>
                            <button style={{ right: '8px' }} className="close-btn clean-btn" onClick={() => setNotificationsOpen(!isNotificationsOpen)}>{checkList.x}</button>
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
                                    {groupData.taskTitle && <div className="task-title-con">
                                        <div className="task-title">{groupData.taskTitle}</div>
                                    </div>}
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
