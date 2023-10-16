import { useEffect, useState } from "react";
import { taskSvg } from "./Svgs";
import { useSelector } from "react-redux";
import { boardService } from "../services/board.service.local";


export function TaskLabel({ taskLabelsId, setEditName }) {
    const board = useSelector(storeState => storeState.boardModule.board)
    const [labels, setLabels] = useState([])
    const [isAddingMember, setIsAddingMember] = useState(false)


    useEffect(() => {
        onLoadLabels(taskLabelsId)
    }, [taskLabelsId])

    async function onLoadLabels(taskLabelsId) {
        const taskMembers = boardService.getLabels(taskLabelsId, board.labels)
        setLabels(taskMembers)
    }

    function toggleAddingMember() {
        setIsAddingMember(!isAddingMember);
        setEditName(isAddingMember ? 'Label' : '');
    }

    return (
        labels.length > 0 &&
        (<section className="labels">
            <p className="members-headline">Labels</p>
            <div className="labels-detail flex align-center">
                {labels.map(label => (
                    <button className="labels-display" style={{ backgroundColor: label.color }} onClick={toggleAddingMember}>{label.title}</button>
                ))}
                <button className="labels-add clean-btn flex align-center" onClick={toggleAddingMember}>{taskSvg.add}</button>
            </div>
        </section>)
    )
}