import { useParams } from "react-router"
import { utilService } from "../services/util.service"
import { addCoverImg, loadAttachments, removeAttachment, removeCover } from "../store/actions/board.actions";
import { useEffect, useState } from "react";
import { taskSvg } from "./Svgs";

export function TaskAttachments({ taskAttachments, setTask, cover, setEditName }) {

    const { boardId, groupId, taskId } = useParams()
    const [attachments, setAttachments] = useState(taskAttachments)

    useEffect(() => {
        onLoadAttachments(boardId, groupId, taskId)
    }, [])

    async function onLoadAttachments(boardId, groupId, taskId) {
        try {
            const attachments = await loadAttachments(boardId, groupId, taskId)
            setAttachments(attachments)
        } catch (err) {
            console.log('Cannot load attachments', err)
        }
    }

    async function onRemoveAttachment(attachmentId) {
        try {
            await removeAttachment(boardId, groupId, taskId, attachmentId)
            setAttachments(prevAttachments => ({
                ...prevAttachments,
                attachments: prevAttachments.filter(attachment => attachment.id !== attachmentId)
            }))
            setTask(prevTask => ({ ...prevTask, cover: { ...cover, img: '' } }))
        } catch (err) {
            console.log('Cannot remove task attachment', err)
        }
    }

    async function onToggleAttachmentCover({ isAttachmentCover, url }) {
        if (isAttachmentCover) {
            try {
                await removeCover(boardId, groupId, taskId)
                setTask(prevTask => ({ ...prevTask, cover: { ...cover, img: '' } }))
            } catch (err) {
                console.log('Cannot remove cover', err)
            }
        } else {
            try {
                await addCoverImg(boardId, groupId, taskId, url)
                setTask(prevTask => ({ ...prevTask, cover: { ...cover, img: url } }))
            } catch (err) {
                console.log('Cannot add cover', err)
            }
        }
    }

    function checkIsAttachmentCover(imgUrl) {
        return (cover.img === imgUrl)
    }

    if (!attachments.length) return
    return (
        <section className="task-attachments">

            <header>
                <div>
                    {taskSvg.attatchment}
                    Attachments
                    <button onClick={() => setEditName('Attachment')}>Add</button>
                </div>
            </header>

            {attachments.map(attachment => {
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
                            {taskSvg.title}
                            <button onClick={(() => { onToggleAttachmentCover({ isAttachmentCover, url: attachment.imgUrl }) })}
                                className="attachment-cover">
                                {isAttachmentCover ? 'remove cover' : 'make cover'}
                            </button>
                        </div>
                    </section>
                </section>)
            })
            }
        </section >)
}