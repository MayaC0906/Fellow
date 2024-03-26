import { useSelector } from "react-redux";
import { utilService } from "../../../services/util.service"
import { taskSvg } from "../../Svgs";

export function TaskAttachments({ task, setEditName, onSaveTask }) {

    const board = useSelector(storeState => storeState.boardModule.board)

    async function onRemoveAttachment(attachmentId, url) {
        try {
            const attachment = task.attachments.find(attachment => attachment.id === attachmentId)
            const txt = `deleted the ${utilService.getFileNameFromUrl(attachment.imgUrl)} attachment from ${board.title}}`
            const attachmentIdx = task.attachments.findIndex(attachment => attachment.id === attachmentId)
            task.attachments.splice(attachmentIdx, 1)
            let newTask = { ...task, attachments: task.attachments }
            if (task.cover.img === url) {
                newTask = { ...task, cover: { ...task.cover, img: '' } }
            }
            onSaveTask(newTask, txt)

        } catch (err) {
            console.error('Cannot remove task attachment', err)
        }
    }

    async function onToggleAttachmentCover({ isAttachmentCover, url }) {
        if (isAttachmentCover) {
            try {
                const newTask = { ...task, cover: { ...task.cover, img: '', backgroundColor: '', createdAt: null } }
                onSaveTask(newTask)
            } catch (err) {
                console.error('Cannot remove cover', err)
            }
        } else {
            try {
                const newTask = { ...task, cover: { ...task.cover, img: url, backgroundColor: '', createdAt: Date.now() } }
                onSaveTask(newTask)
            } catch (err) {
                console.error('Cannot add cover', err)
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
                <div className="task-details-title ">
                    {taskSvg.attatchment}
                    Attachments
                    <button className="task-btn" onClick={() => setEditName('Attachment')}>Add</button>
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
                            <button onClick={() => { onRemoveAttachment(attachment.id, attachment.imgUrl) }}>Delete</button>
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