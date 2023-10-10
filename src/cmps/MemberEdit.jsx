import { Textarea } from '@mui/joy';
import { additionTaskSvg } from './Svgs'
import { useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { addMemberToTask, loadTask } from '../store/actions/board.actions';
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

    async function onAddMemberToTask(memberId) {
        // console.log('id:', memberId);
        try {
            console.log('BEFORE ADD MEMBER =>');
            const updatedTask = await addMemberToTask(boardId, groupId, taskId, memberId)
            // const state = store.getState()
            // const board = state.boardModule.board
            // console.log('state:', state.boardModule.board)
            // console.log('updated task in comp:', updatedTask.memberIds)
            // console.log('board inside comp func', board)
            console.log('BEFOR LOAD TASK =>');
            const task = await loadTask(boardId, groupId, taskId)
            // console.log('task from comp func:', task);
            // setTask(prevTask => ({ ...prevTask, memberIds: updatedTask.memberIds }))
            // setIsChoose(!isChoose)
        } catch (err) {
            console.log('Could not save date =>', err)
        }
    }

    console.log('board inside comp', board);

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
                        <div className='member-detail' onClick={() => onAddMemberToTask(member._id, board)}>
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