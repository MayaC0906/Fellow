import { additionTaskSvg } from './Svgs'

export function AttachmentEdit({ editName, onCloseEditTask }) {
    console.log(editName);
    return (
        <section className="edit-modal">
            <div className="title-container">
                <p>{editName}</p>
                <button onClick={onCloseEditTask} className="close-modal">{additionTaskSvg.close}</button>
            </div>
            <section className="edit-modal-content">
                <div className="content">render here contene</div>
            </section>
        </section>
    )
}