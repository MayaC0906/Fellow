import { useEffect, useState } from "react";
import { taskSvg } from "../../Svgs";
import { useSelector } from "react-redux";
import { TaskMemberDetail } from "./TaskMemberDetail";


export function TaskMember({ taskMembersId, setEditName, editName, onSaveTask, task, setEv, isPhoneDisplay }) {
    const board = useSelector(storeState => storeState.boardModule.board)
    const user = useSelector(storeState => storeState.userModule.user)
    const [isMemberDetailOpen, setMemberDetailOpen] = useState(false)
    const [members, setMembers] = useState([])
    const [member, setMember] = useState([])

    useEffect(() => {
        onLoadMembers(taskMembersId)
    }, [task.memberIds])

    async function onLoadMembers(taskMembersId) {
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
        else setEditName('Member')
    }

    async function removeMemberFromTask() {
        let txt
        try {
            const updatedMembers = task.memberIds.filter(taskMember => taskMember !== member._id)
            const newTask = { ...task, memberIds: updatedMembers }
            if (user._id === member._id) txt = `left ${task.title}`
            else txt = `removed ${member.fullname} from ${task.title}`
            onSaveTask(newTask, txt)
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
                {(isPhoneDisplay.isActionsShown || !isPhoneDisplay.isDisplay ) && <button onClick={(event)=>{
                    setEv(event)
                    toggleMemberDisplay()
                }}
                    className="members-btn clean-btn flex align-center justify-center" >
                    {taskSvg.add}
                </button>}

                {/* <button onClick={toggleMemberDisplay}
                    className="btn-member" >
                    {taskSvg.add}
                </button> */}
            </div>
        </section>)
    )
}