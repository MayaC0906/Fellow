import { additionTaskSvg, taskSvg } from "./Svgs";

export function MemberImage({ member, setIsMemberImageOpen, setMemberDetail }) {
    const { fullname, imgUrl } = member
    return (
        <section className="edit-modal img">
            <div className="title-container img-display">
                <button className="back-arrow" onClick={() => setIsMemberImageOpen(false)}>{taskSvg.arrowBack}</button>
                <p>{fullname} (username)</p>
                <button className="close-modal label" onClick={() => setMemberDetail(false)} >{additionTaskSvg.close}</button>
            </div>
            <section className="edit-modal-content flex justify-center">
                <img className="member-img-diplay" src={imgUrl} alt="" />
            </section>
        </section>
    )
}