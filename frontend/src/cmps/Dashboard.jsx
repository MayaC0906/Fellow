// import React from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux'
import { utilService } from '../services/util.service';
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function Dashboard({ setDashBoardOpen, isDashboardOpen }) {

    const board = useSelector((storeState) => storeState.boardModule.board)

    const { groups } = board;
    const { activities } = board;
    const chartData = groups.map(group => ({ x: group.title, y: group.tasks.length }))



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

    console.log(taskTimeData);



    const groupCompletionData = groups.map(group => {
        const completed = group.tasks.filter(task => task.dueDate.isComplete === true).length
        return {
            x: group.title,
            y: completed,
            y1: group.tasks.length - completed
        }
    });



    /////////////////////////////////////////////////maya

    //checklist
    const taskOverviewData = groups.flatMap(group => group.tasks.map(task => ({
        title: task.title,
        totalChecklistItems: task.checklists.reduce((acc, checklist) => acc + checklist.todos.length, 0),
        completedChecklistItems: task.checklists.reduce((acc, checklist) => acc + checklist.todos.filter(todo => todo.isDone).length, 0)
    })));

    const taskOverViewDataDisplay = taskOverviewData.filter(task => ((task.totalChecklistItems > 0) && (task.completedChecklistItems > 0)))
    const taskOverviewLabels = taskOverViewDataDisplay.map(task => task.title)
    const taskOverviewCompleted = taskOverViewDataDisplay.map(task => task.completedChecklistItems)
    const taskOverviewNotCompleted = taskOverViewDataDisplay.map(task => task.totalChecklistItems - task.completedChecklistItems)

    const optionsCheckList = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Overview checklists status',
            },
        },
    };

    const checkListLabels = taskOverviewLabels;
    const checkListData = {
        labels: checkListLabels,
        datasets: [
            {
                label: 'Complited',
                data: taskOverviewCompleted,
                backgroundColor: 'rgba(144, 238, 144, 0.5)',
            },
            {
                label: 'Not completed',
                data: taskOverviewNotCompleted,
                backgroundColor: 'rgba(255, 128, 128, 0.5)',
            },
        ],
    };
    //checklist

    //members

    const memberTaskCounts = board.members.map(member => {
        let count = 0;
        groups.forEach(group => {
            group.tasks.forEach(task => {
                if (task.memberIds.includes(member._id)) count++
            });
        });
        return { x: member.fullname, y: count }
    });


    const membersData = {
        labels: memberTaskCounts.map(data => data.x),
        datasets: [
            {
                label: 'Numbers of tasks',
                data: memberTaskCounts.map(data => data.y),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    //members 

    //tasksdates

    // const yearsLabels = taskTimeData.map(data => data.x.getFullYear());
    // const tasksOverTimeData = {
    //     labels: yearsLabels,
    //     datasets: [
    //         {
    //             label: 'Dataset 2',
    //             data: taskTimeData.map(data => data.y),
    //             borderColor: 'rgb(53, 162, 235)',
    //             backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //         },
    //     ],
    // };
    //tasksdates

    ///////////////////////////////////////////////////////// maya
    return (
        <div className="dashboard-overlay">
            <div className="dashboard-modal">
                <button className="close-button" onClick={() => setDashBoardOpen(!isDashboardOpen)}>X</button>
                <hr className='divider' style={{ position: 'absolute' }} />
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

                <div className="chart-section">
                    <section className="tasks-over-time-section">
                        <div className='tasks-upper-section'>
                            <Bar className='checklist-chart' options={optionsCheckList} data={checkListData} />
                            <div className='cheklist-dashboard'>
                                <h3>Check list todos:</h3>
                                <span className='green'>Done Todos: {taskOverviewCompleted.reduce((acc, curr) => acc + curr, 0)}</span>
                                <span className='red'>Undone Todos: {taskOverviewNotCompleted.reduce((acc, curr) => acc + curr, 0)}</span>
                            </div>
                        </div>
                    </section>

                    <section className="task-overview-section">
                            <section className="members-section">
                                <div className="members-container">
                                    {board.members.map(member => (
                                        <div key={member._id} className="member-indash">
                                            <img title={`${member.fullname}`} src={member.imgUrl} alt={member.fullname} className="member-img" />
                                        </div>
                                    ))}
                                </div>
                                <div className='members-chart'>
                                    <h3>Tasks per member</h3>
                                    <Pie data={membersData} />;
                                </div>
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
                            layout={{
                                barmode: 'stack', width: 480, height: 320, title: 'Task Completion',
                                xaxis: {
                                    tickangle: -30,
                                    // title: 'Tasks'
                                },
                            }}
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