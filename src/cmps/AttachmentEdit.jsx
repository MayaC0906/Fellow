import { Fragment, useState } from 'react'
import { additionTaskSvg, taskSvg } from './Svgs'
import { utilService } from '../services/util.service.js'

export function AttachmentEdit({ editName, onCloseEditTask, task, onSaveTask }) {
    const [uploadedUrl, setUploadedUrl] = useState('')
    const [isUploading, setIsUploading] = useState('')

    async function uploadImg(ev) {

        const CLOUD_NAME = 'dehxwadkk'
        const UPLOAD_PRESET = 'qlj2jj4j'
        const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
        const FORM_DATA = new FormData()

        FORM_DATA.append('file', ev.target.files[0])
        FORM_DATA.append('upload_preset', UPLOAD_PRESET)

        try {
            setIsUploading('uploading')
            const res = await fetch(UPLOAD_URL, {
                method: 'POST',
                body: FORM_DATA,
            })
            setIsUploading('uploaded')
            setUploaded()
            const { url } = await res.json()
            setUploadedUrl(url)
        } catch (err) {
            console.error(err)
        }
    }

    function setUploaded() {
        setTimeout(() => {
            setIsUploading('')
        }, 2000);
    }

    async function onSaveAttachment() {
        let newTask = { ...task }
        const newAttachment = ({ id: utilService.makeId(), imgUrl: uploadedUrl, createdAt: Date.now() })
        task.attachments.push(newAttachment)
        if (!task.cover.img && !task.cover.backgroundColor) {
            newTask = { ...task, cover: { ...task.cover, img: uploadedUrl }, attachments: task.attachments }
        } else {
            newTask = { ...task, attachments: task.attachments, }
        }
        await onSaveTask(newTask)
        onCloseEditTask()
    }

    return (
        <Fragment>
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
                                <input type="file" id="fileInput" onChange={uploadImg} />
                                <label for="fileInput" className="custom-button">Choose a file</label>

                            </div>
                            <div className='add-attachment-link'>
                                <h2>Search or paste a link</h2>
                                <input type="text" placeholder='Find recent links or paste a new link' />
                            </div>
                            <div className='attachment-actions'>
                                <button className='cancel-btn' onClick={onCloseEditTask}>Cancel</button>
                                <button onClick={onSaveAttachment} className='insert-btn'>Insert</button>
                            </div>
                        </section>
                    </div>
                </section>
            </section>
            {(isUploading === 'uploading') && <div className='attachment-uploading'> {taskSvg.info} Uploading file...</div>}
            {(isUploading === 'uploaded') && <div className='attachment-uploading green' > {taskSvg.checkCircle} Success!</div>}
        </Fragment>
    )
}



