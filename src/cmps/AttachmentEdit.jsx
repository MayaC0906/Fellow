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
                    <section className='add-attachment-container'> 
                    <div className='add-attachment'>
                        <h2>Attach a file from your computer</h2>
                        <h3>You can also drag and drop files to upload them.</h3>
                        <button>Choose a file</button>
                    </div>
                    <div className='add-attachment-link'>
                        <h2>Search or paste a link</h2>
                        <input type="text" placeholder='Find recent links or paste a new link'/>
                    </div>
                    <div className='attachment-actions'>
                        <button className='cancel-btn' onClick={onCloseEditTask}>Cancel</button>
                        <button className='insert-btn'>Insert</button>
                    </div>
                    </section>
                </div>
            </section>
        </section>
    )
}