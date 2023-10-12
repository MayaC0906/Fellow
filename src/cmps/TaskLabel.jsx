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
        (<section className="members">
            <p>Labels</p>
            <div className="members-detail">
                {labels.map(label => (
                    <button style={{ backgroundColor: label.color, width: 'max-content', height: '25px' }} onClick={toggleAddingMember}>{label.title}</button>
                ))}
                <button onClick={toggleAddingMember}>{taskSvg.add}</button>
            </div>
        </section>)
    )
}