import { useEffect, useState } from "react";
import { taskSvg } from "./Svgs";
import { useSelector } from "react-redux";
import { boardService } from "../services/board.service.local";
import { MemberDetail } from "./MemberDetail";


export function TaskMember({ taskMembersId, setEditName, setTask }) {
    const board = useSelector(storeState => storeState.boardModule.board)
    const [members, setMembers] = useState([])
    const [member, setMember] = useState([])
    const [isMemberDetail, setMemberDetail] = useState(false)
    const [isAddingMember, setIsAddingMember] = useState(false)

    useEffect(() => {
        onLoadMembers(taskMembersId)
    }, [taskMembersId])

    async function onLoadMembers(taskMembersId) {
        const taskMembers = boardService.getMembers(taskMembersId, board.members)
        setMembers(taskMembers)
    }

    function onSetMemberDetail(member) {
        setMemberDetail(!isMemberDetail)
        setMember(member)
    }

    function toggleAddingMember() {
        setIsAddingMember(!isAddingMember);
        setEditName(isAddingMember ? 'Member' : '');
    }

    return (
        members.length > 0 &&
        (<section className="members">
            <p>Members</p>
            <div className="members-detail">
                {members.map(member => (
                    <img key={member._id} src={member.imgUrl} alt="" onClick={() => onSetMemberDetail(member)} />
                ))}
                {isMemberDetail && <MemberDetail member={member} setTask={setTask} setMemberDetail={setMemberDetail} />}
                <button onClick={toggleAddingMember}>{taskSvg.add}</button>
            </div>
        </section>)
    )
}