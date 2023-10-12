import { useParams } from "react-router";
import { loadTask, removeLabelFromTask } from "../store/actions/board.actions";
import { additionTaskSvg } from "./Svgs";

export function MemberDetail({ member, setTask, setMemberDetail }) {
    const { fullname, _id, imgUrl } = member
    const { boardId, groupId, taskId } = useParams()

    async function removeMemberFromTask() {
        try {
            await removeLabelFromTask(boardId, groupId, taskId, _id)
            const task = await loadTask(boardId, groupId, taskId)
            setTask(prevTask => ({ ...prevTask, memberIds: task.memberIds }))
            setMemberDetail(false)
        } catch (err) {
            console.log('Cannot remove member', err)
            throw err
        }
    }
    return (
        <section className="edit-modal member-detail">
            <div className="title-container">
                <p>{fullname}</p>
                <button onClick={() => setMemberDetail(false)} className="close-modal">{additionTaskSvg.close}</button>
            </div>
            <img src={imgUrl} alt="" />
            <section className="edit-modal-content">
                <button className="content" onClick={removeMemberFromTask}>Remove from cards</button>
            </section>
        </section>
    )
}