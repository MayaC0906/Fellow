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
                <div className="content">
                    <div className='add-attachment'>
                        <h2>Attach a file from your computer</h2>
                        <h3>You can also drag and drop files to upload them.</h3>
                        <button>Choose a file</button>
                    </div>
                    <div className='attachment-actions'>
                        <button onClick={onCloseEditTask}>Cancel</button>
                        <button>Insert</button>
                    </div>
                </div>
            </section>
        </section>
    )
}