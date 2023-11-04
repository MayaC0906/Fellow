import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service.js'

export function ChatApp() {
    const { boardId } = useParams()
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [topic, setTopic] = useState(boardId)
    const [isTyping, setIsTyping] = useState(false);
    const [typingUser, setTypingUser] = useState('');
    // const [isBotMode, setIsBotMode] = useState(false)

    const user = useSelector(storeState => storeState.userModule.user)
    // const botTimeoutRef = useRef()

    useEffect(() => {
        const userName = user.fullname
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        socketService.on('user-typing', (userName) => {
            setIsTyping(true);
            setTypingUser(user);
            setTimeout(() => {
                setIsTyping(false);
                setTypingUser('');
            }, 10000);
        });
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            // botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
        }
    }, [])

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
    }, [topic])

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    // function sendBotResponse() {
    //     // Handle case: send single bot response (debounce).
    //     botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
    //     botTimeoutRef.current = setTimeout(() => {
    //         setMsgs(prevMsgs => ([...prevMsgs, { from: 'Bot', txt: 'You are amazing!' }]))
    //     }, 1250)
    // }

    function sendMsg(ev) {
        ev.preventDefault()
        // onSaveToyMsg(toyId, msg.txt)
        const from = user?.fullname || 'Me'
        const newMsg = { from, txt: msg.txt }
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        // if (isBotMode) sendBotResponse()
        // for now - we add the msg ourself
        // addMsg(newMsg)
        setMsg({ txt: '' })
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
        socketService.emit('typing', user.fullname || 'Me');
    }
    console.log('toymsgs', typingUser);
    console.log('isTyping', isTyping);
    return (
        <section className="chat">
            <div>
                <label>
                    {/* <input
                        type="radio" name="topic" value={toyId}
                        checked={topic === toyId} onChange={({ target }) => setTopic(target.value)} /> */}
                    <img alt="" />
                    {isTyping && typingUser !== user.fullname && <div>{typingUser.fullname} is typing...</div>}
                </label>
            </div>


            <ul className='clean-list'>
                <li >{msg.from = (user?.fullname === msg.from) ? 'Me' : msg.from}: {msg.txt}</li>
                {/* <img src="https://media.istockphoto.com/id/1403848173/vector/vector-online-chatting-pattern-online-chatting-seamless-background.jpg?s=612x612&w=0&k=20&c=W3O15mtJiNlJuIgU6S9ZlnzM_yCE27eqwTCfXGYwCSo=" alt="" /> */}
            </ul >
            <form onSubmit={sendMsg}>
                <input
                    type="text" value={msg.txt} onChange={handleFormChange}
                    name="txt" autoComplete="off" />
                <button>Send</button>
            </form>
        </section>
    )
}