import { additionTaskSvg } from "./Svgs";
import { useState } from "react";
import { MemberImage } from "./MemberImage";

export function MemberDetail({ member, setMemberDetail, onSaveTask, task }) {
    const [isMemberImageOpen, setIsMemberImageOpen] = useState(false)
    const { fullname, _id, imgUrl } = member

    async function removeMemberFromTask() {
        try {
            const updatedMembers = task.memberIds.filter(member => member !== _id)
            task.memberIds = updatedMembers
            onSaveTask(task)
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