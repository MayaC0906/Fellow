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
                    <h2>Size</h2>
                    <section className="cover-sizes">
                        <div className="cover-size">
                            {task.cover.img && <img className="cover-img" src={task.cover.img} alt="cover-img" />}
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
                        <div className="cover-size">
                            {task.cover.img && <img className="cover-img" src={task.cover.img} alt="cover-img" />}
                                <section className="big-lines">
                                    <div className="long-line"></div>
                                    <div className="short-line"></div>
                                </section>
                        </div>
                    </section>
                    {task.cover.img || task.cover.backgroundColor && <button>Remove cover</button>}
                </div>
            </section >
        </section >
    )
}