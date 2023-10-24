import { useEffect, useState } from "react";
import { taskSvg } from "../../Svgs";
import { useSelector } from "react-redux";
import { TaskMemberDetail } from "./TaskMemberDetail";


export function TaskMember({ taskMembersId, setEditName, editName, onSaveTask, task }) {
    const board = useSelector(storeState => storeState.boardModule.board)
    const [isMemberDetailOpen, setMemberDetailOpen] = useState(false)
    const [members, setMembers] = useState([])
    const [member, setMember] = useState([])

    useEffect(() => {
        onLoadMembers(taskMembersId)
    }, [taskMembersId])

    async function onLoadMembers(taskMembersId) {
        // const taskMembers = boardService.getMembers(taskMembersId, board.members)
        const taskMembers = board.members.filter(member => taskMembersId.includes(member._id))
        setMembers(taskMembers)
    }

    function onSetMemberDetail(member) {
        setMemberDetailOpen(!isMemberDetailOpen)
        setMember(member)
        setEditName('')
    }

    function toggleMemberDisplay() {
        if (editName === 'Member') setEditName('')
        else if (editName === '') setEditName('Member')
    }

    async function removeMemberFromTask() {
        try {
            const updatedMembers = task.memberIds.filter(taskMember => taskMember !== member._id)
            task.memberIds = updatedMembers
            onSaveTask(task)
            setMemberDetailOpen(false)
        } catch (err) {
            console.log('Cannot remove member', err)
            throw err
        }
    }

    return (
        members.length > 0 &&
        (<section className="members">
            <p className="members-headline">Members</p>
            <div className="members-detail flex align-center">
                {members.map(member => (
                    <img key={member._id} src={member.imgUrl} alt="" onClick={() => onSetMemberDetail(member)} />
                ))}
                {isMemberDetailOpen && <TaskMemberDetail
                    member={member}
                    setMemberDetailOpen={setMemberDetailOpen}
                    removeMemberFromTask={removeMemberFromTask}
                />}
                <button className="members-btn clean-btn flex align-center justify-center" onClick={toggleMemberDisplay}>{taskSvg.add}</button>
            </div>
        </section>)
    )
}