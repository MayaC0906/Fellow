// // Guidelines
// // boardStore (no need for groupStore, taskStore), boardService
// // *. Support saving the entire board and also on the task level, 
// // *. No need for saving an activities array per task, 
// // *. those activities are easily filtered from the board activities

// // *. activites - when board is updated, the frontend does not send the activities
// //    array within the board 
// //    instead it only sends a new activity object: {txt, boardId, groupId, taskId}
// //    the backend adds this activity to the board with $push and can also emit socket notificatios

// // *. D & D Guidelines - vue-smooth-dnd / vuedraggable / react-beutiful-dnd
// // *. Same model for Monday style app (do not implement a generic columns feature)
// // *. We do not handle concurrent editing - needs versioning

// // Rendering performance:
// // Store Mutation - saveBoard
// // As start - you can replace the entire board
// // Later, support switching a specific task


// // <BoardDetails> => <BoardGroup v-for / map>
// // <BoardGroup> => <TaskPreview v-for / map>
// // <TaskDetails> (supports edit) - initially can be loaded in seperate route 
// // (later on we can place it in a modal and nested route)



// // The comment feature can be implemented with activity
// const activity = {
//     "id": makeId(),
//     "txt": "Changed Color",
//     "createdAt": Date.now(),
//     "byMember": userService.getLoggedinUser(),
//     "group": group, // optional
//     "task": task    // optional
// }

// // Store - saveTask
// function storeSaveTask(boardId, groupId, task, activity) {

//     board = boardService.saveTask(boardId, groupId, task, activity)
//     // commit(ACTION) // dispatch(ACTION)
// }

// // boardService
// function saveTask(boardId, groupId, task, activity) {
//     const board = getById(boardId)
//     // PUT /api/board/b123/task/t678

//     // TODO: find the task, and update
//     board.activities.unshift(activity)
//     saveBoard(board)
//     // return board
//     // return task
// }


// const board = [{
//     _id: "b101",
//     title: "Robot dev proj",
//     isStarred: false,
//     archivedAt: 1589983468418,
//     createdBy: {
//         "_id": "u103",
//         "fullname": "Sahar Machpud",
//         "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg"
//     },
//     style: {
//         backgroundImage: ""
//     },
//     labels: [
//         {
//             "id": "l101",
//             "title": "Urgent",
//             "color": "#f87462"
//         },
//         {
//             "id": "l102",
//             "title": "Tasks",
//             "color": "#b8acf6"
//         },
//         {
//             "id": "l103",
//             "title": "Data",
//             "color": "#c1f0f5"
//         }
//     ],
//     members: [
//         {
//             "_id": "u101",
//             "fullname": "Maya Cohen",
//             "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367862/WhatsApp_Image_2023-10-04_at_00.10.22_fkybop.jpg"
//         },
//         {
//             "_id": "u102",
//             "fullname": "Reut Edry",
//             "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
//         },
//         {
//             "_id": "u103",
//             "fullname": "Sahar Machpud",
//             "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg"
//         }
//     ],
//     groups: [
//         {
//             "id": "g101",
//             "title": "Backlog-server",
//             "tasks": [
//                 {
//                     "id": "c103",
//                     "title": "Demo data",
//                     "description": null,
//                     "cover": {
//                         "backgroundColor": "",
//                         "img": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696368347/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-07-20_131912_zfdlhz.png",
//                         "createdAt": 1696332780
//                     },
//                     "attachments": [
//                         {
//                             "id": "123abc",
//                             "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696368347/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-07-20_131912_zfdlhz.png"
//                         }
//                     ],
//                     "byMember": {
//                         "_id": "u102",
//                         "fullname": "Reut Edry",
//                         "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
//                     },
//                     "archivedAt": null,
//                     "labelIds": ["l101", "l102", "l103"],
//                     "memberIds": ["u101", "u102", "u103"],
//                     "watching": true,
//                     "dueDate": 1696764840,
//                     "checklists": [
//                         {
//                             "id": "YEhmF",
//                             "title": "Checklist",
//                             "todos": [
//                                 {
//                                     "id": "212jX",
//                                     "title": "Finishing untill 16:30",
//                                     "isDone": true
//                                 },
//                                 {
//                                     "id": "212je",
//                                     "title": "Successing",
//                                     "isDone": false
//                                 }
//                             ]
//                         }
//                     ],
//                     "comments": [
//                         {
//                             "id": "ZdPnm",
//                             "txt": "Important",
//                             "createdAt": 1696334520,
//                             "byMember": {
//                                 "_id": "u101",
//                                 "fullname": "Maya Cohen",
//                                 "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367862/WhatsApp_Image_2023-10-04_at_00.10.22_fkybop.jpg"
//                             }
//                         }
//                     ],
//                 },
//                 {
//                     "id": "c104",
//                     "title": "Connect to Mongo",
//                     "description": null,
//                     "archivedAt": null,
//                     "cover": {
//                         "backgroundColor": "",
//                         "img": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696368598/1_1_tasfsz.png"
//                     },
//                     "byMember": {
//                         "_id": "u103",
//                         "fullname": "Sahar Machpud",
//                         "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg"
//                     },
//                     "attachments": [
//                         {
//                             "id": "123abg",
//                             "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg",
//                             'createdAt': 1696333740,
//                         },
//                     ],
//                     "comments": [],
//                     "checklists": [],
//                     "memberIds": ["u102"],
//                     "labelIds": ["l101"],
//                     "dueDate": null,
//                     "watching": false
//                 },
//                 {
//                     "id": "c1045",
//                     "title": "Adding npm packages",
//                     "description": null,
//                     "archivedAt": null,
//                     "cover": {
//                         "backgroundColor": "",
//                         "img": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696371749/npm_zfi8q9.png"
//                     },
//                     "byMember": {
//                         "_id": "u102",
//                         "fullname": "Reut Edry",
//                         "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
//                     },
//                     "attachments": [
//                         {
//                             "id": "123abger",
//                             "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696371749/npm_zfi8q9.png",
//                             'createdAt': 1696348680,
//                         },
//                     ],
//                     "comments": [],
//                     "checklists": [],
//                     "memberIds": ["u102"],
//                     "labelIds": ["l101"],
//                     "dueDate": null,
//                     "watching": true
//                 }
//             ],
//             "style": {}
//         },
//         {
//             "id": "g102",
//             "title": "Group 2",
//             "tasks": [
//                 {
//                     "id": "c103",
//                     "title": "Demo data",
//                     "description": null,
//                     "cover": {
//                         "backgroundColor": "",
//                         "img": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696368347/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-07-20_131912_zfdlhz.png",
//                         "createdAt": 1696332780
//                     },
//                     "attachments": [
//                         {
//                             "id": "123abc",
//                             "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696368347/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-07-20_131912_zfdlhz.png"
//                         }
//                     ],
//                     "byMember": {
//                         "_id": "u102",
//                         "fullname": "Reut Edry",
//                         "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
//                     },
//                     "archivedAt": null,
//                     "labelIds": ["l101", "l102", "l103"],
//                     "memberIds": ["u101", "u102", "u103"],
//                     "watching": true,
//                     "dueDate": 1696764840,
//                     "checklists": [
//                         {
//                             "id": "YEhmF",
//                             "title": "Checklist",
//                             "todos": [
//                                 {
//                                     "id": "212jX",
//                                     "title": "Finishing untill 16:30",
//                                     "isDone": true
//                                 },
//                                 {
//                                     "id": "212je",
//                                     "title": "Successing",
//                                     "isDone": false
//                                 }
//                             ]
//                         }
//                     ],
//                     "comments": [
//                         {
//                             "id": "ZdPnm",
//                             "txt": "Important",
//                             "createdAt": 1696334520,
//                             "byMember": {
//                                 "_id": "u101",
//                                 "fullname": "Maya Cohen",
//                                 "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367862/WhatsApp_Image_2023-10-04_at_00.10.22_fkybop.jpg"
//                             }
//                         }
//                     ],
//                 },
//                 {
//                     "id": "c104",
//                     "title": "Connect to Mongo",
//                     "description": null,
//                     "archivedAt": null,
//                     "cover": {
//                         "backgroundColor": "",
//                         "img": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696368598/1_1_tasfsz.png"
//                     },
//                     "byMember": {
//                         "_id": "u103",
//                         "fullname": "Sahar Machpud",
//                         "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg"
//                     },
//                     "attachments": [
//                         {
//                             "id": "123abg",
//                             "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg",
//                             'createdAt': 1696333740,
//                         },
//                     ],
//                     "comments": [],
//                     "checklists": [],
//                     "memberIds": ["u102"],
//                     "labelIds": ["l101"],
//                     "dueDate": null,
//                     "watching": false
//                 },
//                 {
//                     "id": "c1045",
//                     "title": "Adding npm packages",
//                     "description": null,
//                     "archivedAt": null,
//                     "cover": {
//                         "backgroundColor": "",
//                         "img": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696371749/npm_zfi8q9.png"
//                     },
//                     "byMember": {
//                         "_id": "u102",
//                         "fullname": "Reut Edry",
//                         "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
//                     },
//                     "attachments": [
//                         {
//                             "id": "123abger",
//                             "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696371749/npm_zfi8q9.png",
//                             'createdAt': 1696348680,
//                         },
//                     ],
//                     "comments": [],
//                     "checklists": [],
//                     "memberIds": ["u102"],
//                     "labelIds": ["l101"],
//                     "dueDate": null,
//                     "watching": true
//                 }
//             ],
//             "style": {}
//         },
//         // {
//         //     "id": "g103",
//         //     "title": "Group 3",
//         //     "tasks": [
//         //         {
//         //             "id": "c103",
//         //             "title": "Do that",
//         //             "archivedAt": 1589983468418,
//         //         },
//         //         {
//         //             "id": "c104",
//         //             "title": "Help me",
//         //             "priority": null,
//         //             "description": "description",
//         //             "comments": [
//         //                 {
//         //                     "id": "ZdPnm",
//         //                     "txt": "also @yaronb please CR this",
//         //                     "createdAt": 1590999817436,
//         //                     "byMember": {
//         //                         "_id": "u101",
//         //                         "fullname": "Tal Tarablus",
//         //                         "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//         //                     }
//         //                 }
//         //             ],
//         //             "checklists": [
//         //                 {
//         //                     "id": "YEhmF",
//         //                     "title": "Checklist",
//         //                     "todos": [
//         //                         {
//         //                             "id": "212jX",
//         //                             "title": "To Do 1",
//         //                             "isDone": false
//         //                         }
//         //                     ]
//         //                 }
//         //             ],
//         //             "memberIds": ["u101"],
//         //             "labelIds": ["l101", "l102"],
//         //             "dueDate": 16156215211,
//         //             "byMember": {
//         //                 "_id": "u101",
//         //                 "username": "Tal",
//         //                 "fullname": "Tal Tarablus",
//         //                 "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//         //             },
//         //             "style": {
//         //                 "backgroundColor": "#26de81"
//         //             }
//         //         }
//         //     ],
//         //     "style": {}
//         // }
//     ],
//     activities: [
//         {
//             "id": "a101",
//             "txt": "marked the due date incomplete",
//             "createdAt": 1696368960,
//             "byMember": {
//                 "_id": "u102",
//                 "fullname": "Reut Edry",
//                 "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg"
//             },
//             "group": {
//                 "id": "g101",
//                 "title": "Backlog-server"
//             },
//             "task": {
//                 "id": "c103",
//                 "title": "Demo data"
//             }
//         },
//         {
//             "id": "b102",
//             "txt": "left this card",
//             "createdAt": 1696333780,
//             "byMember": {
//                 "_id": "u103",
//                 "fullname": "Sahar Machpud",
//                 "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg"
//             },
//             "group": {
//                 "id": "g101",
//                 "title": "Backlog-server"
//             },
//             "task": {
//                 "id": "c104",
//                 "title": "Connect to Mongo"
//             }
//         }

//     ],

//     cmpsOrder: ["StatusPicker", "MemberPicker", "DatePicker"]
// }
// ]


// const user = {
//     "_id": "u101",
//     "fullname": "Abi Abambi",
//     "username": "abi@ababmi.com",
//     "password": "aBambi123",
//     "imgUrl": "http://some-img.jpg",
//     "mentions": [{ //optional
//         "id": "m101",
//         "boardId": "m101",
//         "taskId": "t101"
//     }]
// }

// // <LabelPicker info={} onUpdate={} />
// // <MemberPicker info={} onUpdate={} />
// // <DatePicker info={} onUpdate={} />

// // <DynamicPicker info={} onUpdate={} >


// // For Monday Mostly:
// // Dynamic Components: 

// // <TaskPreview> => <tr> 
// //    <td v-for="(cmpType) in cmpsOrder">
// //         <Component :is="cmpType" :info="getCmpInfo(cmpType)" @updated="updateTask(cmpType, $event)">
// //    </td>
// // </tr>

// function updateTask(cmpType, data) {
//     // Switch by cmpType
//     // case MEMBERS:
//     //    task.members = data
//     //    activity = boardService.getEmptyActivity()
//     //    activity.txt = `Members changed for task ${}`
//     //    activity.task = '{mini-task}'
//     // case STATUS:
//     //    task.status = data

//     // dispatch to store: updateTask(task, activity)
// }


// const cmp1 = {
//     type: 'StatusPicker',
//     info: {
//         selectedStatus: 'pending',
//         statuses: [{}, {}]
//     }
// }

// const cmp2 = {
//     type: 'MemberPicker',
//     info: {
//         selectedMembers: ['m1', 'm2'],
//         members: ['m1', 'm2', 'm3']
//     }
// }

// const cmp3 = {
//     type: 'DatePicker',
//     info: {
//         selectedDate: '2022-09-07',
//     }
// }





// // React.js
// // export function TaskPreview({ task }) {
// //     //GET FROM STORE
// //     const cmpsOrder = [
// //       "status-picker",
// //       "member-picker",
// //       "date-picker",
// //       "priority-picker",
// //     ];
// //     return (
// //       <section>
// //         <h5>{task.txt}</h5>
// //         {cmpsOrder.map((cmp, idx) => {
// //           return (
// //             <DynamicCmp
// //               cmp={cmp}
// //               key={idx}
// //               onUpdate={(data) => {
// //                 console.log("Updating: ", cmp, "with data:", data);
// //                 // make a copy, update the task, create an action
// //                 // Call action: updateTask(task, action)
// //               }}
// //             />
// //           );
// //         })}
// //       </section>
// //     );
// //   }

// // export function DynamicCmp({ cmp, info, onUpdate }) {
// //     switch (cmp) {
// //         case "status-picker":
// //             return <StatusPicker info={info} onUpdate={onUpdate} />;
// //         case "member-picker":
// //             return <MemberPicker info={info} onUpdate={onUpdate} />;
// //         default:
// //             return <p>UNKNOWN {cmp}</p>;
// //     }
// // }

