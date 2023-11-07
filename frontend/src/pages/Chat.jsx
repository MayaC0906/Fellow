import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service.js'
import { updateBoard } from '../store/actions/board.actions.js'
import { utilService } from '../services/util.service.js'
import { checkList } from '../cmps/Svgs.jsx'

export function ChatApp({ isChatOpen, setChatOpen }) {
    const { boardId } = useParams()
    const [msg, setMsg] = useState({ txt: '' })
    const [topic, setTopic] = useState(boardId)
    const [isTyping, setIsTyping] = useState(false)
    const [typingUser, setTypingUser] = useState('')
    const board = useSelector((storeState) => storeState.boardModule.board)
    const user = useSelector(storeState => storeState.userModule.user)
    const [isChatMinimized, setIsChatMinimized] = useState(false)
    const messagesEndRef = useRef(null)
    let { msgs } = board

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [msgs])



    useEffect(() => {
        const userName = user.fullname
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        socketService.on('user-typing', (userName) => {
            setIsTyping(true)
            setTypingUser(userName)
            setTimeout(() => {
                setIsTyping(false)
                setTypingUser('')
            }, 3000)
        });
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
        }
    }, [user.fullname, board])

    function toggleChat() {
        setIsChatMinimized(!isChatMinimized);
    }

    function addMsg(newMsg) {
        const updatedBoard = {
            ...board,
            msgs: board.msgs ? [...board.msgs, newMsg] : [newMsg]
        };
        updateBoard(updatedBoard)
    }

    function stringToColor(str) {
        let hash = 0
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash)
        }

        let color = 'rgba(';
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xFF
            color += value + ','
        }
        color += '0.5)'
        return color
    }



    function sendMsg(ev) {
        ev.preventDefault()

        const from = user?.fullname || 'Me'
        const newMsg = { from, txt: msg.txt, when: Date.now() }
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        setMsg({ txt: '' })
    }
    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
        socketService.emit('typing', user.fullname || 'Me')
    }
    console.log('isTyping', isTyping)
    console.log(typingUser)
    return (
        <section className={`chat ${isChatMinimized ? 'minimized' : ''}`}>
            <div className="chat-header">
                <div className="chat-details">

                    <img src={board.style.backgroundImage} alt="Chat Background" />
                    <span>{board.title}</span>
                    {isTyping && typingUser !== user.fullname && <div className="typing-indicator">{typingUser} is typing...</div>}

                </div>
                <div className='chat-close-actions'>

                    <button className="toggle-chat clean-btn" onClick={toggleChat}>
                        {isChatMinimized ? '+' : '-'}
                    </button>
                    <button className="close-chat" onClick={() => setChatOpen(!isChatOpen)}>{checkList.x}</button>
                </div>
            </div>
            {!isChatMinimized && (
                <>
                    {msgs && (
                        <ul className="chat-list clean-list">
                            {msgs.map((message, index) => (
                                <li className="msg-item" style={{ backgroundColor: stringToColor(message.from) }} key={index}>
                                    <div className="txt-area">
                                        <span className="chat-name">{message.from === user?.fullname ? 'Me' : message.from}:</span>
                                        <span className="chat-txt">{message.txt}</span>
                                    </div>
                                    <span className="timestamp">{utilService.formatDate(message.when)}</span>
                                </li>
                            ))}
                            <div ref={messagesEndRef} />

                        </ul>
                    )}
                    <form className="chat-form" onSubmit={sendMsg}>
                        <input
                            type="text"
                            className="input"
                            value={msg.txt}
                            onChange={handleFormChange}
                            name="txt"
                            autoComplete="off"
                            placeholder="Type a message..."
                        />
                        <button className="send-btn">Send</button>
                    </form>
                </>
            )}
        </section>
    )
}