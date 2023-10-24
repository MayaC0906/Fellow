import { Textarea } from '@mui/joy';
import { additionTaskSvg, taskSvg } from './Svgs'
import { useState } from 'react';
import { useSelector } from 'react-redux';

export function MemberEdit({ editName, onCloseEditTask, onSaveTask, task }) {
    const board = useSelector(storeState => storeState.boardModule.board)
    const [filterMembers, setFilterdMembers] = useState(board.members)
    const [connectMembers, setConnectMembers] = useState(task.memberIds)

    function onMemberSearch({ target }) {
        const filteredMembers = board.members.filter(member =>
            member.fullname.toLowerCase().includes(target.value.toLowerCase())
        )
        setFilterdMembers(filteredMembers)
    }

    async function onToggleMemberToTask(memberId) {
        let newTask
        try {
            const memberIdx = task.memberIds.findIndex(id => id === memberId)
            if (memberIdx === -1) {
                newTask = { ...task, memberIds: [...task.memberIds, memberId] }
            } else {
                const updatedMembers = [...task.memberIds]
                updatedMembers.splice(memberIdx, 1)
                newTask = { ...task, memberIds: updatedMembers }
            }
            onSaveTask(newTask)
            setConnectMembers(newTask.memberIds)
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
                    <Textarea placeholder="Search members" onChange={onMemberSearch}
                        sx={{
                            fontSize: 14, fontWeight: 'medium', borderRadius: '3px', boxShadow: 'inset 0 0 0 1px #091e4224', bgcolor: 'white',
                            outline: 'none',
                            '&:focus': {
                                boxShadow: 'inset 0 0 0 2px #388bff'
                            }
                        }}>
                    </Textarea>
                </div>
                <div className='content'>
                    <p className='member-list-headline'>Board members</p>
                    <ul className='member-list clean-list'>
                        {filterMembers.map(member =>
                        (<li className="member-preview" key={member._id}>
                            <section className='member-detail flex align-center' onClick={() => onToggleMemberToTask(member._id, board)}>
                                <img src={member.imgUrl} alt="" />
                                <h2>{member.fullname}</h2>
                                {connectMembers.map(connected => {
                                    if (connected === member._id) {
                                        return (<span className='flex align-center'>{taskSvg.check}</span>)
                                    }
                                })}
                            </section>
                        </li>)
                        )}
                    </ul>
                </div>
            </section >
        </section >
    )
}
