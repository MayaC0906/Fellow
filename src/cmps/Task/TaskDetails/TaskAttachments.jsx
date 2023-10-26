import { utilService } from "../../../services/util.service"
import { taskSvg } from "../../Svgs";

export function TaskAttachments({ task, setEditName, onSaveTask }) {

    async function onRemoveAttachment(attachmentId) {
        try {
            const attachmentIdx = task.attachments.findIndex(attachment => attachment.id === attachmentId)
            task.attachments.splice(attachmentIdx, 1)
            const newTask = { ...task, attachments: task.attachments }
            onSaveTask(newTask)

        } catch (err) {
            console.log('Cannot remove task attachment', err)
        }
    }

    async function onToggleAttachmentCover({ isAttachmentCover, url }) {
        if (isAttachmentCover) {
            try {
                const newTask = { ...task, cover: { ...task.cover, img: '', backgroundColor:'', createdAt: null } }
                onSaveTask(newTask)
            } catch (err) {
                console.log('Cannot remove cover', err)
            }
        } else {
            try {
                const newTask = { ...task, cover: { ...task.cover, img: url, backgroundColor:'', createdAt: Date.now()} }
                onSaveTask(newTask)
            } catch (err) {
                console.log('Cannot add cover', err)
            }
        }
    }

    function checkIsAttachmentCover(imgUrl) {
        return (task.cover.img === imgUrl)
    }

    if (!task.attachments.length) return
    return (
        <section className="task-attachments">

            <header>
                <div>
                    {taskSvg.attatchment}
                    Attachments
                    <button onClick={() => setEditName('Attachment')}>Add</button>
                </div>
            </header>

            {task.attachments.map(attachment => {
                const isAttachmentCover = checkIsAttachmentCover(attachment.imgUrl)

                return (< section key={attachment.id} className="task-attachment" >
                    <div className="img-container">
                        <img src={attachment.imgUrl} alt="" />
                    </div>

                    <section className="img-info">
                        <h2>{utilService.getFileNameFromUrl(attachment.imgUrl)}</h2>
                        <div className="img-actions">
                            <h3>Created {utilService.formatImgTime(attachment.createdAt)}</h3>
                            <button onClick={() => { onRemoveAttachment(attachment.id) }}>Delete</button>
                        </div>
                        <div className="cover-container">
                            {taskSvg.cover}
                            <button onClick={(() => { onToggleAttachmentCover({ isAttachmentCover, url: attachment.imgUrl }) })}
                                className="attachment-cover">
                                {isAttachmentCover ? 'Remove cover' : 'Make cover'}
                            </button>
                        </div>
                    </section>
                </section>)
            })
            }
        </section >)
}