import React from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux'
import { utilService } from '../services/util.service';


export function Dashboard({ setDashBoardOpen, isDashboardOpen }) {

    const board = useSelector((storeState) => storeState.boardModule.board)

    const { groups } = board;
    const { activities } = board;
    const chartData = groups.map(group => ({ x: group.title, y: group.tasks.length }))

    const memberTaskCounts = board.members.map(member => {
        let count = 0;
        groups.forEach(group => {
            group.tasks.forEach(task => {
                if (task.memberIds.includes(member._id)) count++
            });
        });
        return { x: member.fullname, y: count }
    });

    const taskDates = groups.flatMap(group => group.tasks.map(task => new Date(task.createdAt)))
    const dateCounts = {}; 

    taskDates.forEach(date => {
        const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        dateCounts[dateString] = (dateCounts[dateString] || 0) + 1
    })

    const taskTimeData = Object.entries(dateCounts).map(([date, count]) => ({
        x: new Date(date),
        y: count
    }))

    const groupCompletionData = groups.map(group => {
        const completed = group.tasks.filter(task => task.dueDate.isComplete === true).length
        return {
            x: group.title,
            y: completed,
            y1: group.tasks.length - completed
        }
    });

    const taskOverviewData = groups.flatMap(group => group.tasks.map(task => ({
        title: task.title,
        totalChecklistItems: task.checklists.reduce((acc, checklist) => acc + checklist.todos.length, 0),
        completedChecklistItems: task.checklists.reduce((acc, checklist) => acc + checklist.todos.filter(todo => todo.isDone).length, 0)
    })));

    const taskOverviewLabels = taskOverviewData.map(task => task.title)
    const taskOverviewCompleted = taskOverviewData.map(task => task.completedChecklistItems)
    const taskOverviewNotCompleted = taskOverviewData.map(task => task.totalChecklistItems - task.completedChecklistItems)


    return (
        <div className="dashboard-overlay">
            <div className="dashboard-modal">
                <button className="close-button" onClick={() => setDashBoardOpen(!isDashboardOpen)}>X</button>
                <hr className='divider' style={{position:'absolute'}}/>
                <div className="top-section">
                    
                    <span></span>
                    <section className="activity-dash" >
                    <span className='board-title'>{board.title}</span>
                        <span className='activity-title'>Recent board activities</span>
                        <div className='activities dashboard-activities' >
                            {activities.map((activity) => (
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
                    
                </div>
                {/* <hr /> */}
                <div className="chart-section">
                    <section className="tasks-over-time-section">
                        <div className='tasks-upper-section'>
                        
                        <Plot
                            data={[
                                {
                                    type: 'bar',
                                    x: taskTimeData.map(data => data.x),
                                    y: taskTimeData.map(data => data.y)
                                }
                            ]}
                            layout={{ 
                                width: 240, 
                                height: 300, 
                                title: 'Tasks Over Time',
                                xaxis: {
                                    type: 'date',
                                    tickangle: -45,
                                },
                                yaxis: {
                                    title: 'Number of Tasks',
                                    gridcolor: '#eee', 
                                },
                                margin: {
                                    l: 50, 
                                    r: 10,
                                    b: 50, 
                                    t: 40
                                }
                            }}
                        />
                            <Plot
                        data={[
                            {
                                type: 'bar',
                                name: 'Completed Items',
                                x: taskOverviewLabels,
                                y: taskOverviewCompleted
                            },
                            {
                                type: 'bar',
                                name: 'Not Completed',
                                x: taskOverviewLabels,
                                y: taskOverviewNotCompleted
                            }
                        ]}
                        layout={{ 
                            barmode: 'stack', 
                            width: 700, 
                            height: 300, 
                            title: 'Task Overview by Checklist Items',
                            xaxis: {
                                tickangle: -20,
                                // title: 'Tasks'
                            },
                            yaxis: {
                                title: 'Number of Checklist Items',
                                gridcolor: '#eee',
                                dtick: 1  // Ensure whole numbers are shown on the y-axis
                            },
                            margin: {
                                l: 50, 
                                r: 10,
                                b: 70, 
                                t: 40
                            }
                        }}
                    />
                        
                        </div>
                    </section>
                    
                    <section className="task-overview-section">
                    <section className="member-distribution-section flex">
                        <div className="members-section">
                            <div className="members-container">
                                {board.members.map(member => (
                                    <div key={member._id} className="member-indash">
                                        <img title={`${member.fullname}`} src={member.imgUrl} alt={member.fullname} className="member-img" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* <div className='board-admin'>
                                <span>Board admin</span>
                                <div className="member-indash">
                                        <img title={`${board.createdBy.fullname}`} src={board.createdBy.imgUrl} className="member-img" />
                                    </div>
                        </div> */}
                        <section >

                        <Plot
                            data={[
                                {
                                    type: 'pie',
                                    labels: memberTaskCounts.map(data => data.x),
                                    values: memberTaskCounts.map(data => data.y)
                                }
                            ]}
                            layout={{ width: 500, height: 360, title: 'Distribution by Member' }}
                            />
                            </section>
                    </section>
                     <Plot
                        data={[
                            {
                                type: 'bar',
                                name: 'Completed',
                                x: groupCompletionData.map(data => data.x),
                                y: groupCompletionData.map(data => data.y)
                            },
                            {
                                type: 'bar',
                                name: 'Not Completed',
                                x: groupCompletionData.map(data => data.x),
                                y: groupCompletionData.map(data => data.y1)
                            }
                        ]}
                        layout={{ barmode: 'stack', width: 480, height: 320, title: 'Task Completion',
                        xaxis: {
                            tickangle: -30,
                            // title: 'Tasks'
                        }, }}
                        /> 
                    </section>
                    
                </div>
            </div>
        </div>
    );
}












//maybe will be usable later

// <Plot
// data={[
//     {
//         type: 'bar',
//         x: taskTimeData.map(data => data.x),
//         y: taskTimeData.map(data => data.y)
//     }
// ]}
// layout={{ 
//     width: 400, 
//     height: 300, 
//     title: 'Tasks Over Time',
//     xaxis: {
//         type: 'date',
//         tickangle: -45,
//     },
//     yaxis: {
//         title: 'Number of Tasks',
//         gridcolor: '#eee', 
//     },
//     margin: {
//         l: 50, 
//         r: 10,
//         b: 50, 
//         t: 40
//     }
// }}
// />
// <Plot
// data={[
// {
//     type: 'bar',
//     name: 'Completed Items',
//     x: taskOverviewLabels,
//     y: taskOverviewCompleted
// },
// {
//     type: 'bar',
//     name: 'Not Completed',
//     x: taskOverviewLabels,
//     y: taskOverviewNotCompleted
// }
// ]}
// layout={{ 
// barmode: 'stack', 
// width: 550, 
// height: 300, 
// title: 'Task Overview by Checklist Items',
// xaxis: {
//     tickangle: -30,
//     // title: 'Tasks'
// },
// yaxis: {
//     title: 'Number of Checklist Items',
//     gridcolor: '#eee',
//     dtick: 1  // Ensure whole numbers are shown on the y-axis
// },
// margin: {
//     l: 50, 
//     r: 10,
//     b: 70, 
//     t: 40
// }
// }}
// />

// </section>