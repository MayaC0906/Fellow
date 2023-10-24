import { additionTaskSvg } from "../../Svgs";
import { useState } from "react";
import { TaskMemberImage } from "./TaskMemberImage";

export function TaskMemberDetail({ member, setMemberDetailOpen, removeMemberFromTask }) {
    const [isMemberImageOpen, setIsMemberImageOpen] = useState(false)
    const { fullname, imgUrl } = member

    return isMemberImageOpen ? (
        <TaskMemberImage
            member={member}
            setIsMemberImageOpen={setIsMemberImageOpen}
            setMemberDetailOpen={setMemberDetailOpen}
        />
    ) : (
        <section className="specific-member">
            <section className="specific-member-display flex">
                <button onClick={() => setMemberDetailOpen(false)} className="specific-member-close flex">{additionTaskSvg.close}</button>
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