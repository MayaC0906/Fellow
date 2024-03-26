import 'regenerator-runtime'
import React from 'react';
import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { saveGroup, updateBoard } from '../store/actions/board.actions';
import { boardService } from '../services/board.service.local';
import { taskService } from '../services/task.service.local';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import siri2 from '../../src/assets/img/siri2.gif';
import unactive from '../../src/assets/img/unactive.gif';

export function OurSiri({ isSiriOpen, setSiriOpen }) {
    const user = useSelector((storeState) => storeState.userModule.user);
    const board = useSelector((storeState) => storeState.boardModule.board);

    const lastResultTimeRef = useRef(Date.now());

    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const { groups } = board

    if (!browserSupportsSpeechRecognition) {
        return <span>Your browser does not support speech recognition.</span>;
    }

    useEffect(() => {
        let timeoutId;
        if (listening && transcript) {
            timeoutId = setTimeout(handleInterimResult, 2000)
            lastResultTimeRef.current = Date.now()
        }

        return () => {
            clearTimeout(timeoutId);
        }
    }, [transcript, listening]);

    const processTranscript = (transcript) => {
        getAction(transcript);
    }

    const startListening = () => {
        resetTranscript();
        SpeechRecognition.startListening({
            continuous: true,
            language: 'en-US',
            interimResults: true
        })

        lastResultTimeRef.current = Date.now();
    }

    const handleInterimResult = (interimTranscript) => {
        console.log('interim', interimTranscript);
        const currentTime = Date.now();
        if (currentTime - lastResultTimeRef.current > 1000) {
            SpeechRecognition.stopListening();
            processTranscript(interimTranscript);
        } else {
            lastResultTimeRef.current = currentTime;
        }
    }

    function findGroupByTitle(title) {
        const target = normalizeString(title)
        let bestMatch = null
        let highestSimilarity = 0

        for (let group of groups) {
            const currentTitle = normalizeString(group.title)
            const currentSimilarity = similarity(target, currentTitle)

            if (currentSimilarity > 0.4 && currentSimilarity > highestSimilarity) {
                bestMatch = group
                highestSimilarity = currentSimilarity
            }
        }

        return bestMatch
    }

    const COMMANDS = [
        "add group",
        "create group",
        "add task in",
        "create task in",
        "add board",
        "create board"
    ]

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
        })

        return maxSim > 0.4 ? bestMatch : null
    }

    const groupTitles = groups.map(group => group.title.toLowerCase())
    const STATIC_EXPECTED_WORDS = ["task", "in", "create", "group"]
    const EXPECTED_WORDS = [...groupTitles, ...STATIC_EXPECTED_WORDS]

    function normalizeString(str) {
        return str.trim().toLowerCase().replace(/[\s-]+/g, ' ');
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

        return maxSim > 0.3 ? bestMatch : word
    }


    function getAction() {
        console.log('trans', transcript);
        const correctedTrans = transcript.split(' ').map(correctWord).join(' ');
        const closestCommand = getClosestCommand(transcript);
        console.log('correctedTrans', correctedTrans);
        if (closestCommand === "create group") {
            const title = extractTitle(correctedTrans);
            if (title) createGroup(title);
        } else if (closestCommand === "create task in") {
            const extractionResult = extractGroupNameAndTaskTitle(correctedTrans);
            if (extractionResult) {
                const { groupName, taskTitle } = extractionResult;
                createTaskInGroup(groupName, taskTitle);
            }
        } else if (closestCommand === "stop") {
            stopListening(); // Only set a flag to stop listening
        }
    }

    function createGroup(title) {
        let group = boardService.getEmptyGroup();
        group.title = title || 'New list from Siri';
        let txt = `added a new group titled '${group.title}'.`;
        saveGroup(group, board._id, user, txt);
    }

    function createTaskInGroup(groupName, taskTitle) {
        const { groups } = board
        let group = findGroupByTitle(groupName)
        const currGroupIdx = groups.findIndex(g => g.id === group.id)
        if (group) {
            let newTask = taskService.getEmptyTask()
            newTask.title = taskTitle || 'New task from Siri'
            const copyBoard = { ...board }
            copyBoard.groups[currGroupIdx].tasks.push(newTask)
            let txt = `added a new task titled '${newTask.title}' to group '${group.title}'.`
            updateBoard(copyBoard, user, txt)
        }
    }

    function extractTitle(transcript) {
        const titledKeyword = "title"
        const indexOfTitled = transcript.indexOf(titledKeyword)
        if (indexOfTitled !== -1) {
            return transcript.slice(indexOfTitled + titledKeyword.length).trim()
        }
        return null
    }

    function extractGroupNameAndTaskTitle(transcript) {
        const inKeyword = " in "
        const titledKeyword = "title "
        const indexOfIn = transcript.indexOf(inKeyword);
        const indexOfTitled = transcript.indexOf(titledKeyword);

        if (indexOfIn !== -1 && indexOfTitled !== -1) {
            const groupName = transcript.slice(indexOfIn + inKeyword.length, indexOfTitled).trim()
            const taskTitle = transcript.slice(indexOfTitled + titledKeyword.length).trim()
            return { groupName, taskTitle }
        }
        return null
    }



    return (
        <>
            <div className="siri-overlay"></div>
            <div className="siri-modal">
                <div style={{ color: 'white' }} className={`siri-container ${listening ? 'speaking' : ''}`}>

                    <button className="close-siri-btn" onClick={() => setSiriOpen(!isSiriOpen)}>&times;</button>

                    {listening ?
                        <img src={siri2} alt="Listening..." className="siri-gif" />
                        :
                        <div className='flex align-items' style={{ flexDirection: 'column', color: 'white', alignItems: 'center', fontSize: '12px' }}>
                            <img src={unactive} alt="Idle Siri" className="siri-static" onClick={startListening} />
                            Click to speak
                        </div>
                    }
                </div>
            </div>
        </>
    );
}


//JUST FOR DEMO

// import 'regenerator-runtime'

// import React, { useRef, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import siri2 from '../../src/assets/img/siri2.gif';
// import unactive from '../../src/assets/img/unactive.gif';
// import { saveGroup } from '../store/actions/board.actions';
// import { boardService } from '../services/board.service.local';

// export function OurSiri({ isSiriOpen, setSiriOpen }) {
//     const user = useSelector((storeState) => storeState.userModule.user);
//     const board = useSelector((storeState) => storeState.boardModule.board);
//     const { listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

//     if (!browserSupportsSpeechRecognition) {
//         return <span>Your browser does not support speech recognition.</span>;
//     }

//     const startListening = () => {
//         resetTranscript();
//         SpeechRecognition.startListening({
//             continuous: true,
//             language: 'en-US'
//         });
//         setTimeout(() => {
//             createGroup("Done");
//         }, 6000);
//     }

//     function createGroup(title) {
//         let group = boardService.getEmptyGroup();
//         group.title = title;
//         let txt = `Added a new group titled '${group.title}'.`;
//         saveGroup(group, board._id, user, txt);
//         stopListeningAndCreateGroup()

//     }

//     const stopListeningAndCreateGroup = () => {
//         SpeechRecognition.stopListening();
//     }
//     return (
//         <>
//             <div className="siri-overlay"></div>
//             <div className="siri-modal">
//                 <div style={{ color: 'white' }} className={`siri-container ${listening ? 'speaking' : ''}`}>
//                     <button className="close-siri-btn" onClick={() => {
//                         stopListeningAndCreateGroup()
//                         setSiriOpen(!isSiriOpen)
//                     }}>&times;</button>

//                     {listening ?
//                         <img src={siri2} alt="Listening..." className="siri-gif" />
//                         :
//                         <div className='flex align-items' style={{ flexDirection: 'column', color: 'white', alignItems: 'center', fontSize: '12px' }}>
//                             <img src={unactive} alt="Idle Siri" className="siri-static" onClick={startListening} />
//                             Click to speak
//                         </div>
//                     }
//                 </div>
//             </div>
//         </>
//     );
// }
