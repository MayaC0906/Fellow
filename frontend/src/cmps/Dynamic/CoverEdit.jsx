import { utilService } from "../../services/util.service";
import { additionTaskSvg } from "../Svgs";

export function CoverEdit({ pos, editName, onCloseEditTask, onSaveTask, task}) {
    const coverColors = ['#4bce97', '#f5cd47', '#fea362', '#f87168', '#9f8fef',
        '#579dff', '#6cc3e0', '#94c748', '#e774bb', '#8590a2']

    const coverImgs = [{ imgUrl: 'https://images.unsplash.com/photo-1697701859524-f4cc65e4747a?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', name: 'Pawel Czerwinski', nameLink: 'https://unsplash.com/@pawel_czerwinski?utm_source=trello&utm_medium=referral&utm_campaign=api-credit' },
    { imgUrl: 'https://images.unsplash.com/photo-1696935518912-ee46a5c161d0?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', name: 'Lucija Ros', nameLink: 'https://unsplash.com/@lucija_ros?utm_source=trello&utm_medium=referral&utm_campaign=api-credit' },
    { imgUrl: 'https://images.unsplash.com/photo-1697577473134-46490cf51044?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NHx8fGVufDB8fHx8fA%3D%3D', name: 'Pawan Thap', nameLink: 'https://unsplash.com/@thapapawan?utm_source=trello&utm_medium=referral&utm_campaign=api-credit' },
    { imgUrl: 'https://images.unsplash.com/photo-1697201826242-141dec817a6f?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OHx8fGVufDB8fHx8fA%3D%3D', name: 'Ander Peña', nameLink: 'https://unsplash.com/@anderrek?utm_source=trello&utm_medium=referral&utm_campaign=api-credit' },
    { imgUrl: 'https://images.unsplash.com/photo-1696595883516-76c97aa3a164?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NHx8fGVufDB8fHx8fA%3D%3D', name: 'Cokile Ceoi', nameLink: 'https://unsplash.com/@c0ki1e?utm_source=trello&utm_medium=referral&utm_campaign=api-credit' },
    { imgUrl: 'https://images.unsplash.com/photo-1696144706485-ff7825ec8481?auto=format&fit=crop&q=80&w=1935&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', name: 'Joshua Rawson-Harris', nameLink: 'https://unsplash.com/@joshrh19?utm_source=trello&utm_medium=referral&utm_campaign=api-credit' }]

    async function onRemoveCover() {
        try {
            const newTask = { ...task, cover: { ...task.cover, img: '', backgroundColor: '', createdAt: null } }
            onSaveTask(newTask)
        } catch (err) {
            console.log('Cannot remove cover', err)
        }
    }

    function onChangeCover({ type, content }) {
        try {
            let newTask
            if (type === 'img') {
                newTask = { ...task, cover: { ...task.cover, img: content, backgroundColor: '', createdAt: Date.now() } }
            } else {
                newTask = { ...task, cover: { ...task.cover, backgroundColor: content, img: '', createdAt: Date.now() } }
            }
            onSaveTask(newTask)
        } catch (err) {
            console.log('Cannot add cover', err)
        }
    }

    async function onSaveAttachment(url) {
        const newAttachment = ({ id: utilService.makeId(), imgUrl: url, createdAt: Date.now() })
        task.attachments.push(newAttachment)
        const newTask = { ...task, attachments: task.attachments}
        onSaveTask(newTask)
    }

    async function uploadImg(ev) {

        const CLOUD_NAME = 'dehxwadkk'
        const UPLOAD_PRESET = 'qlj2jj4j'
        const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
        const FORM_DATA = new FormData()

        FORM_DATA.append('file', ev.target.files[0])
        FORM_DATA.append('upload_preset', UPLOAD_PRESET)

        try {
            const res = await fetch(UPLOAD_URL, {
                method: 'POST',
                body: FORM_DATA,
            })
            const { url } = await res.json()
            await onSaveAttachment(url)
            onChangeCover({ type: 'img', content: url })
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <section style={{top:pos.top, left: pos.left}} className="edit-modal">
            <div className="title-container">
                <p>{editName}</p>
                <button onClick={onCloseEditTask} className="close-modal">{additionTaskSvg.close}</button>
            </div>
            <section className="edit-modal-content">
                <div className='content'>
                    <section className="cover-edit">
                        <h2>Size</h2>
                        <section className="cover-sizes">
                            <div className="cover-size unfull"
                                style={{
                                    backgroundColor: task.cover.backgroundColor ? task.cover.backgroundColor : '#dcdfe4',
                                    backgroundImage: task.cover.img ? `url(${task.cover.img})` : ''
                                }}>
                                {task.cover.img && <div className="bgc-img" style={{}}></div>}
                                <div className="cover-footer">
                                    <section className="big-lines">
                                        <div className="long-line"></div>
                                        <div className="short-line"></div>
                                    </section>
                                    <div className="footer-bttom">
                                        <section className="small-lines">
                                            <div className="small-line"></div>
                                            <div className="small-line"></div>
                                        </section>
                                        <div className="circle"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="cover-size full"
                                style={{
                                    backgroundColor: task.cover.backgroundColor ? task.cover.backgroundColor : '#dcdfe4',
                                    backgroundImage: task.cover.img ? `url(${task.cover.img})` : ''
                                }}>
                                <section className="big-lines">
                                    <div className="long-line"></div>
                                    <div className="short-line"></div>
                                </section>
                            </div>
                        </section>
                        {task.cover.createdAt && <button className="remove-cover-btn" onClick={onRemoveCover}>Remove cover</button>}
                        <h2>Colors</h2>
                        <section className="backgroundColor-Pick">
                            {coverColors.map(color => {
                                return <div style={{ backgroundColor: color }} onClick={() => { onChangeCover({ type: 'backgroundColor', content: color }) }}></div>
                            })}
                        </section>
                        <h2>Attachments</h2>
                        {task.attachments.length > 0 && <section className="cover-attachments">
                            {task.attachments.map(attachment => {
                                return (<button onClick={() => { onChangeCover({ type: 'img', content: attachment.imgUrl }) }} style={{
                                    backgroundImage: `url(${attachment.imgUrl})`,
                                }}>
                                </button>)
                            })}
                        </section>}
                        <input type="file" id="fileInput" onChange={uploadImg} />
                        <label for="fileInput" className="custom-button">Upload a cover image</label>
                        <h2>Photos from Unsplash</h2>
                        <section className="unsplash-photos">
                            {coverImgs.map(coverImg => {
                                return (<div onClick={() => { onChangeCover({ type: 'img', content: coverImg.imgUrl }) }}>
                                    <img src={coverImg.imgUrl} alt="unsplash-img" />
                                    <a className="unsplash-link" title={coverImg.name} href={coverImg.nameLink}>{coverImg.name}</a>
                                </div>
                                )
                            })}
                        </section>
                    </section>
                </div>
            </section >
        </section >
    )
}