import { useParams } from "react-router";
import { loadTask, removeLabelOrMemberFromTask } from "../store/actions/board.actions";
import { additionTaskSvg } from "./Svgs";
import { useState } from "react";
import { MemberImage } from "./MemberImage";

export function MemberDetail({ member, setTask, setMemberDetail }) {
    const [isMemberImageOpen, setIsMemberImageOpen] = useState(false)
    const { fullname, _id, imgUrl } = member
    const { boardId, groupId, taskId } = useParams()

    async function removeMemberFromTask() {
        try {
            await removeLabelOrMemberFromTask(boardId, groupId, taskId, _id)
            const task = await loadTask(boardId, groupId, taskId)
            setTask(prevTask => ({ ...prevTask, memberIds: task.memberIds }))
            setMemberDetail(false)
        } catch (err) {
            console.log('Cannot remove member', err)
            throw err
        }
    }
    return isMemberImageOpen ? (
        <MemberImage
            member={member}
            setIsMemberImageOpen={setIsMemberImageOpen}
            setMemberDetail={setMemberDetail}
        />
    ) : (
        <section className="specific-member">
            <section className="specific-member-display flex">
                <button onClick={() => setMemberDetail(false)} className="specific-member-close flex">{additionTaskSvg.close}</button>
                <img src={imgUrl} alt="" onClick={() => setIsMemberImageOpen(true)} />
                <div className="flex">
                    <h2 className="full-name">{fullname}</h2>
                    <h2 className="user-name">@userName - further</h2>
                </div>
            </section>
            <hr />
            <button className="remove clean-btn" onClick={removeMemberFromTask}>Remove from cards</button>
        </section>
    )
}