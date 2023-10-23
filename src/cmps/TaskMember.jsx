import { useEffect, useState } from "react";
import { taskSvg } from "./Svgs";
import { useSelector } from "react-redux";
import { boardService } from "../services/board.service.local";
import { MemberDetail } from "./MemberDetail";


export function TaskMember({ taskMembersId, setEditName, onSaveTask, task }) {
    const board = useSelector(storeState => storeState.boardModule.board)
    const [isMemberDetail, setMemberDetail] = useState(false)
    const [members, setMembers] = useState([])
    const [member, setMember] = useState([])
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
        setEditName('')
    }

    function toggleAddingMember() {
        setIsAddingMember(!isAddingMember);
        setEditName(isAddingMember ? 'Member' : '');
    }

    return (
        members.length > 0 &&
        (<section className="members">
            <p className="members-headline">Members</p>
            <div className="members-detail flex align-center">
                {members.map(member => (
                    <img key={member._id} src={member.imgUrl} alt="" onClick={() => onSetMemberDetail(member)} />
                ))}
                {isMemberDetail && <MemberDetail member={member} setMemberDetail={setMemberDetail} onSaveTask={onSaveTask} task={task} />}
                <button className="members-btn clean-btn flex align-center justify-center" onClick={toggleAddingMember}>{taskSvg.add}</button>
            </div>
        </section>)
    )
}