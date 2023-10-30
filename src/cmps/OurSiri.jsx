import React, { useEffect, useState } from 'react'
import { boardService } from '../services/board.service.local'
import { useSelector } from 'react-redux'
import { saveGroup } from '../store/actions/board.actions'
import { taskService } from '../services/task.service.local'
import { saveNewTask } from '../store/actions/board.actions'
import { utilService } from '../services/util.service'
import siri2 from '../../src/assets/img/siri2.gif'
import unactive from '../../src/assets/img/unactive.gif'
import { addBoard } from '../store/actions/board.actions'
import { useNavigate } from 'react-router'

export function OurSiri({isSiriOpen, setSiriOpen}) {
    const user = useSelector((storeState) => storeState.userModule.user)
    const board = useSelector((storeState) => storeState.boardModule.board)
    const boards = useSelector((storeState) => storeState.boardModule.boards)
    const [listening, setListening] = useState(false)
    const [shouldContinueListening, setShouldContinueListening] = useState(false)
    const [transcript, setTranscript] = useState('')
    const navigate = useNavigate()
    const {groups} = board
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)()

    useEffect(() => {
        recognition.lang = 'en-US'
        recognition.interimResults = false
        recognition.maxAlternatives = 1
        recognition.continuous = true
    
        recognition.onresult = function(event) {
            setTranscript(event.results[0][0].transcript)
            getAction(event.results[0][0].transcript)
        };
    
        recognition.onstart = function() {
            setListening(true);
        }
    
        recognition.onend = function() {
            setListening(false);
            if (shouldContinueListening) {
                recognition.start();
            }
        }
    
        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error)
        }
    
        return () => {
            recognition.stop()
        };
    }, [shouldContinueListening])


    async function onSaveNewBoard() {
        const savedBoard = getEmptyBoard()
        const imgs = 
                [
                    'https://images.unsplash.com/photo-1698255921824-9c87f3f8514a?auto=format&fit=crop&q=80&w=2105&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    'https://images.unsplash.com/photo-1697577473134-46490cf51044?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    'https://images.unsplash.com/photo-1696935518912-ee46a5c161d0?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    'https://images.unsplash.com/photo-1697701859524-f4cc65e4747a?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    'https://images.unsplash.com/photo-1697297937792-ec7c0adf6c16?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    'https://images.unsplash.com/photo-1696643830146-44a8755f1905?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    'https://images.unsplash.com/photo-1696144706485-ff7825ec8481?auto=format&fit=crop&q=80&w=1935&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                ]
        let chosenImg = utilService.getRandomIntInclusive(0, imgs.length)
        let backGroundgImg = imgs[chosenImg]
        if (backGroundgImg) {
            savedBoard.style.backgroundImage = backGroundgImg
            try {
                let dominantColor = await utilService.getDominantColor(backGroundgImg)
                savedBoard.style.dominantColor = dominantColor
                savedBoard.style.isBright = utilService.isRgbBright(dominantColor.rgb)
            } catch (err) {
                console.log('Could not get dominant color')
            }
        }
        try {
            const txt = `${user.fullname} opened this board via Siri.`
            const addedBoard = await addBoard(savedBoard, user, txt)
            navigate(`/board/${addedBoard._id}`)
        } catch (err) {
            console.log('Could not add new board')
        }
    }

    function getEmptyBoard() {
        return {
            title: `${user.fullname}'s board(from Siri)`,
            isStarred: false,
            archivedAt: Date.now(),
            style: {
                backgroundImage: "",
                backgroundColor: "",
                dominantColor: {},
                isBright: null
            },
            labels: [
                {
                    "id": "l101",
                    "title": "Urgent",
                    "color": "#4BCE97"
                },
                {
                    "id": "l102",
                    "title": "Tasks",
                    "color": "#F5CD47"
                },
                {
                    "id": "l103",
                    "title": "Data",
                    "color": "#FEA362"
                },
                {
                    "id": "l104",
                    "title": "",
                    "color": "#F87168"
                },
                {
                    "id": "l105",
                    "title": "",
                    "color": "#9F8FEF"
                },
                {
                    "id": "l106",
                    "title": "",
                    "color": "#579DFF"
                },
            ],
            members: [
                {
                    "_id": "m101",
                    "fullname": "Maya Cohen",
                    "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367862/WhatsApp_Image_2023-10-04_at_00.10.22_fkybop.jpg",
                    "username": "Maya"
                },
                {
                    "_id": "r101",
                    "fullname": "Reut Edry",
                    "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367856/WhatsApp_Image_2023-10-04_at_00.17.06_fd94b6.jpg",
                    "username": "Reut"
                },
                {
                    "_id": "s101",
                    "fullname": "Sahar Machpud",
                    "imgUrl": "https://res.cloudinary.com/dpwmxprpp/image/upload/v1696367658/1642589384427_hywpod.jpg",
                    "username": "Sahar"
                }
            ],
            groups: [
                { id: utilService.makeId(), title: '', tasks: [], style: {} }
            ],
            activities: [],
            cmpsOrder: ["StatusPicker", "MemberPicker", "DatePicker"]
        }
    }

    const COMMANDS = [
        "add group",
        "create group",
        "add task in",
        "create task in",
        "add board",
        "create board"        
    ];

    function similarity(s1, s2) {
        let longer = s1;
        let shorter = s2;
        if (s1.length < s2.length) {
            longer = s2;
            shorter = s1;
        }
        let longerLength = longer.length;
        if (longerLength === 0) {
            return 1.0;
        }
        return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
    }

    function editDistance(s1, s2) {
        s1 = s1.toLowerCase()
        s2 = s2.toLowerCase()

        let costs = new Array()
        for (let i = 0; i <= s1.length; i++) {
            let lastValue = i
            for (let j = 0; j <= s2.length; j++) {
                if (i === 0) costs[j] = j;
                else {
                    if (j > 0) {
                        let newValue = costs[j - 1];
                        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1
                        costs[j - 1] = lastValue
                        lastValue = newValue
                    }
                }
            }
            if (i > 0) costs[s2.length] = lastValue
        }
        return costs[s2.length]
    }

    function getClosestCommand(trans) {
        let maxSim = 0;
        let bestMatch = ""

        COMMANDS.forEach(cmd => {
            let sim = similarity(trans, cmd)
            if (sim > maxSim) {
                maxSim = sim
                bestMatch = cmd
            }
        });

        return maxSim > 0.4 ? bestMatch : null
    }

    const groupTitles = groups.map(group => group.title.toLowerCase())
    const STATIC_EXPECTED_WORDS = ["task", "in", "create", "group"]
    const EXPECTED_WORDS = [...groupTitles, ...STATIC_EXPECTED_WORDS]


    function normalizeString(str) {
        console.log('str', str)
        return str.trim().toLowerCase()
    }
    

    function parseGroupName(trans) {
        console.log('trans', trans)
        
        let match;
        if (match = trans.match(/add task in (.+)$/)) {
            console.log('add task from parse')
            return match[1].split(" ").pop()
        } else if (match = trans.match(/create task in (.+)$/)) {
            console.log('create task from parse')
            return match[1].split(" ").pop()
        }
        
        return null
    }
    
    
    
    
    
    function findGroupByTitle(title) {
        const target = normalizeString(title)
        let bestMatch = null
        let highestSimilarity = 0
        
        for(let group of groups) {
            const currentTitle = normalizeString(group.title)
            const currentSimilarity = similarity(target, currentTitle)
            
            if(currentSimilarity > 0.4 && currentSimilarity > highestSimilarity) {
                bestMatch = group
                highestSimilarity = currentSimilarity
            }
        }
        
        return bestMatch
    }
    
    function correctWord(word) {
        let maxSim = 0
        let bestMatch = word
    
        EXPECTED_WORDS.forEach(expectedWord => {
            let sim = similarity(word, expectedWord)
            if (sim > maxSim) {
                maxSim = sim
                bestMatch = expectedWord
            }
        });
    
        return maxSim > 0.5 ? bestMatch : word
    }
    
    

    function getAction(trans) {
        const correctedTrans = trans.split(' ').map(correctWord).join(' ')
        const closestCommand = getClosestCommand(correctedTrans)
        console.log(closestCommand)
        console.log(correctedTrans)
        if (closestCommand === "create group" || closestCommand === "add group") {
            let group = boardService.getEmptyGroup()
            group.title = 'New list from Siri'
            let txt = `added a new group titled '${group.title}'.`
            saveGroup(group, board._id, user, txt)
            stopListening()
            closeModal()
        } 

        if (closestCommand === "create board" || closestCommand === "add board") {
            onSaveNewBoard()
            stopListening()
            closeModal()
        } 

        if (closestCommand === "add task in" || closestCommand === "create task in") {
            console.log('correct', correctedTrans)
            const groupName = parseGroupName(correctedTrans)
            console.log('groupname:::', groupName)
            if (!groupName) {
                console.log("No group specified in the command.")
                stopListening()
                return;
            }

            let group = findGroupByTitle(groupName)
            if (!group) {
                console.log(`Group titled '${groupName}' not found.`)
                stopListening()
                return
            }

            let newTask = taskService.getEmptyTask()
            newTask.title = 'New task from Siri'
            let txt = `added a new task titled '${newTask.title}' to group '${group.title}'.`
            saveNewTask(board._id, group.id, newTask, user, txt)
            stopListening()
            closeModal()
        }
        stopListening()
    }

    function startListening(){
        setShouldContinueListening(true)
        recognition.start()
    }
    

    function stopListening() {
        recognition.onend = null
        recognition.onerror = null
        recognition.onresult = null
        recognition.onstart = null
        setShouldContinueListening(false)
        setListening(false)
        recognition.stop()
        resetTranscript()
    }

    function resetTranscript() {
        setTranscript('')
    }

    function closeModal() {
        console.log('enter')
        stopListening()
        setSiriOpen(!isSiriOpen)
    }

    return (
        <>
            <div className="siri-overlay"  ></div>
            <div className="siri-modal">
                <div className={`siri-container ${listening ? 'speaking' : ''}`}>
                    <div className="siri-instructions">
                        <h3>How to Use:</h3>
                        <ol>
                            <li>Say "Create/add board" to create your own board</li>
                            <li>Say "Create/add group" to add a new group.</li>
                            <li>Say "Create/add task in [group name]" to specify which group the task should be added to.</li>
                        </ol>
                    <button className="close-siri-btn" onClick={closeModal}>&times;</button>
                    </div>
                    {listening ?                       
                        <img src={siri2} alt="Listening..." className="siri-gif" onClick={stopListening} />            
                        :
                        <div className='flex align-items' style={{flexDirection:'column', color:'white', alignItems:'center', fontSize:'12px'} }>
                            <img src={unactive} alt="Idle Siri" className="siri-static" onClick={startListening} />
                            Click to speak
                        </div> 
                    }
    
                </div>
            </div>
        </>
    );
}




















// useEffect(() => {
//     recognition.lang = 'en-US'
//     recognition.interimResults = false
//     recognition.maxAlternatives = 1
//     recognition.continuous = true

//     recognition.onresult = function(event) {
//         setTranscript(event.results[0][0].transcript)
//         getAction(event.results[0][0].transcript)
//     };

//     recognition.onstart = function() {
//         setListening(true);
//     }

//     recognition.onend = function() {
//         setListening(false);
//         if (shouldContinueListening) {
//             recognition.start();
//         }
//     }

//     recognition.onerror = function(event) {
//         console.error('Speech recognition error:', event.error)
//     }

//     return () => {
//         recognition.stop()
//     };
// }, [shouldContinueListening])

// function correctWord(word) {
//     let maxSim = 0
//     let bestMatch = word

//     EXPECTED_WORDS.forEach(expectedWord => {
//         let sim = similarity(word, expectedWord)
//         if (sim > maxSim) {
//             maxSim = sim
//             bestMatch = expectedWord
//         }
//     });

//     return maxSim > 0.5 ? bestMatch : word
// }
