import { useSelector } from "react-redux";
import { utilService } from "../services/util.service";
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { additionTaskSvg, groupHeaderSvg } from "./Svgs";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export function Dashboard({ setDashBoardOpen }) {

    const board = useSelector(storeState => storeState.boardModule.board)

    const usersNumber = board.members.length

    function roundNumber(num) {
        if (num === 0) return 0
        else return num.toFixed(1)
    }

    //Tasks number

    const overdueTasks = board.groups.reduce((count, group) => {
        const groupCount = group.tasks.reduce((groupCount, task) => {
            if (task.dueDate.isOverdue && !task.dueDate.isComplete) {
                return groupCount + 1
            }
            return groupCount;
        }, 0)
        return count + groupCount
    }, 0)

    const completedTasks = board.groups.reduce((count, group) => {
        const groupCount = group.tasks.reduce((groupCount, task) => {
            if (task.dueDate.isComplete) {
                return groupCount + 1
            }
            return groupCount;
        }, 0)
        return count + groupCount
    }, 0)

    const leftTasks = board.groups.reduce((count, group) => {
        const groupCount = group.tasks.reduce((groupCount, task) => {
            if (!task.dueDate.isComplete) {
                return groupCount + 1
            }
            return groupCount;
        }, 0)
        return count + groupCount
    }, 0)

    //RECENT ACTIVITIES
    const { activities } = board
    const activitiesToDisplay = [...activities].slice(-4)

    //LEFT TASKS PER GROUP
    let tasksLeftForGroup = board.groups.map(group => ({ groupTitle: group.title, leftTasks: null }))
    board.groups.forEach((group, index) => {
        const groupCount = group.tasks.reduce((groupCount, task) => {
            if (!task.dueDate.isComplete) {
                return groupCount + 1;
            }
            return groupCount;
        }, 0);
        tasksLeftForGroup[index].leftTasks = groupCount
    })
    const tasksLeftInGroupDisplay = tasksLeftForGroup.filter(group => group.leftTasks !== 0)

    const labels = tasksLeftInGroupDisplay.map(group => group.groupTitle)

    const data = {
        labels,
        datasets: [
            {
                data: tasksLeftInGroupDisplay.map(group => group.leftTasks),
                backgroundColor: 'rgba(68, 84, 111, 0.5)',

            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Active tasks per group',
            },
        },
    }

    //TASKS PER USER
    const boardMembers = board.members
    const membersWithTaskCounts = {};

    boardMembers.forEach((member) => {
        membersWithTaskCounts[member.fullname] = 0;
    })

    board.groups.forEach((group) => {
        group.tasks.forEach((task) => {
            if (task.memberIds.length > 0) {
                task.memberIds.forEach((memberId) => {
                    boardMembers.find((m) => {
                        if (m._id === memberId) {
                            membersWithTaskCounts[m.fullname]++
                        }
                    })

                })
            }
        })
    })
    const sortedMembers = Object.entries(membersWithTaskCounts).sort((a, b) => b[1] - a[1])

    return (
        <div className="dashboard-background">
            <h2>Dashboard {groupHeaderSvg.dashboard}</h2>
            <button onClick={() => { setDashBoardOpen(false) }}>
                {additionTaskSvg.close}
            </button>
            <article className="dashboard-container">
                <section className="dashboard-summary">
                    <section className="summary">
                        <div className="users-number">
                            <h3>Board users</h3>
                            <span>{usersNumber}</span>
                        </div>
                        <div className="tasks-status">
                            <h4 className="completed">Completed tasks</h4>
                            <span>{completedTasks} ({roundNumber((completedTasks / (leftTasks + completedTasks) * 100))} %)
                               </span>
                            <h4>Tasks left</h4>
                            <span>{leftTasks}</span>
                        </div>
                        <div className="tasks-overdue">
                            <h3>Overdue tasks</h3>
                            <span>{overdueTasks} ({roundNumber((overdueTasks / (leftTasks + completedTasks) * 100))} %)</span>
                        </div>
                    </section>
                </section>

                <section className="tasks-per-member">
                    {/* <h3>Tasks per member</h3> */}
                    <table>
                        <thead>
                            <tr>
                                <th>Member Name</th>
                                <th>Tasks Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedMembers.map(([memberName, taskCount]) => (
                                <tr key={memberName}>
                                    <td>{memberName.charAt(0).toUpperCase() + memberName.slice(1)}</td>
                                    <td>{taskCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className="recent-activities">
                    <section className="activity-dash" >
                        <span className='board-title'>Recent 3 board activities</span>
                        <span className='activity-title'>{board.title}</span>
                        <hr />
                        <div className='activities dashboard-activities' >
                            {activitiesToDisplay.map((activity) => (
                                <div className='activity' key={activity.id} style={{ display: '', alignItems: 'center' }}>
                                    <span>
                                        <img
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
                    </section>
                </section>

                <section className="tasks-per-group">
                    <Bar options={options} data={data} className="tasks-per-group-bar" />
                </section>

            </article>
        </div>
    )
}

