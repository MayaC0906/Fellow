import { useEffect, useState } from "react";
import { taskSvg } from "./Svgs";
import { useSelector } from "react-redux";
import { boardService } from "../services/board.service.local";


export function TaskMember({ taskMembersId, setEditName }) {
    const board = useSelector(storeState => storeState.boardModule.board)
    const [members, setMembers] = useState([])

    useEffect(() => {
        onLoadMembers(taskMembersId)
    }, [taskMembersId])

    async function onLoadMembers(taskMembersId) {
        const taskMembers = boardService.getMembers(taskMembersId, board.members)
        setMembers(taskMembers)
    }

    return (
        members.length > 0 &&
        (<section className="members">
            <p>Members</p>
            <div className="members-detail">
                {members.map(member => (
                    <img key={member._id} src={member.imgUrl} alt="" />
                ))}
                <button onClick={() => setEditName('Member')}>{taskSvg.add}</button>
            </div>
        </section>)
    )
}