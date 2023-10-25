import { additionTaskSvg } from "../Svgs";

export function CoverEdit({ editName, onCloseEditTask, onSaveTask, task }) {
    return (
        <section className="edit-modal">
            <div className="title-container">
                <p>{editName}</p>
                <button onClick={onCloseEditTask} className="close-modal">{additionTaskSvg.close}</button>
            </div>
            <section className="edit-modal-content">
                <div className='content'>
                </div>
            </section >
        </section >
    )
}