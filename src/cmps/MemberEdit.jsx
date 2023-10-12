import { Textarea } from '@mui/joy';
import { additionTaskSvg } from './Svgs'
import { useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { loadTask, toggleMemberOrLabel } from '../store/actions/board.actions';
import { taskService } from '../services/task.service.local';
import { store } from '../store/store';

export function MemberEdit({ editName, onCloseEditTask, setTask }) {
    const board = useSelector(storeState => storeState.boardModule.board)
    const [members, setMembers] = useState(board.members)
    // const [isChoose, setIsChoose] = useState(false)
    const { boardId, groupId, taskId } = useParams()

    function onMemberSearch({ target }) {
        const filteredMembers = board.members.filter(member =>
            member.fullname.toLowerCase().includes(target.value.toLowerCase())
        )
        setMembers(filteredMembers)
    }

    async function onToggleMemberToTask(memberId) {
        try {
            await toggleMemberOrLabel(boardId, groupId, taskId, memberId)
            const task = await loadTask(boardId, groupId, taskId)
            setTask(prevTask => ({ ...prevTask, memberIds: task.memberIds }))
        } catch (err) {
            console.log('Could not save date =>', err)
        }
    }


    return (
        <section className="edit-modal">
            <div className="title-container">
                <p>{editName}</p>
                <button onClick={onCloseEditTask} className="close-modal">{additionTaskSvg.close}</button>
            </div>
            <section className="edit-modal-content">
                <div className="search">
                    <Textarea placeholder="Search members" onChange={onMemberSearch}></Textarea>
                </div>
                <div className='content'>
                    {members.map(member =>
                    (<section className="member-list" key={member._id}>
                        <div className='member-detail' onClick={() => onToggleMemberToTask(member._id, board)}>
                            <img src={member.imgUrl} alt="" />
                            {member.fullname}
                            {/* {isChoose && (<span>✔️</span>)} */}
                        </div>
                    </section>)
                    )}
                </div>
            </section>
        </section>
    )
}