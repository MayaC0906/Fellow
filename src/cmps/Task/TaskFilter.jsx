import { Checkbox } from "@mui/joy";
import { additionTaskEdiSvg, additionTaskSvg, appHeaderSvg, taskSvg, workspaceSvg } from "../Svgs";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";



export function TaskFilter({ setIsFiltersOpen, groups, taskFilterBy, setTaskFilterby }) {
    const user = useSelector(storeState => storeState.userModule.user)
    const board = useSelector(storeState => storeState.boardModule.board)
    const [isOpenMemberSelect, setIsOpenMemberSelect] = useState(false)
    const [isLabelSelectOpen, setIsLabelSelectOpen] = useState(false)
    const firstLabels = board.labels.slice(0, 3)
    // let check = {
    //     name: '',
    //     isChecked: null
    // }
    // const [checkboxMembers, setCheckboxMembers] = useState()

    function getCheckBox(func, name) {
        return (
            <section className='checkbox no-labels'>
                <Checkbox sx={{
                    '& .MuiSvgIcon-root': { fontSize: 10 }, padding: 0, width: 16, height: 16, color: 'rgba(23, 43, 77, 0.2)',
                    '&:checked': {
                        '& .MuiSvgIcon-root': {
                            '&.css-i4bv87-MuiSvgIcon-root': {
                                color: 'initial'
                            }
                        },
                    }
                }}
                    onClick={() => func(name)}
                // checked={checkboxMembers === name}
                />
            </section >
        )
    }

    function onHandelFilterChange(ev) {
        const field = ev.target.name
        let value = ev.target.value

        if (field === 'txt') {
            setTaskFilterby(prevFilter => ({ ...prevFilter, [field]: value }))
        }
    }

    function onToggleMember(name) {
        if (name === 'me') {
            setTaskFilterby(prevFilter => ({ ...prevFilter, byMembers: { ...prevFilter.byMembers, isMe: !prevFilter.byMembers.isMe } }))
            // setCheckboxMembers(taskFilterBy.byMembers.isMe)
        } else if (name === 'all') {
            setTaskFilterby(prevFilter => ({ ...prevFilter, byMembers: { ...prevFilter.byMembers, isAll: !prevFilter.byMembers.isAll } }))
        } else if (name === 'no-members') {
            setTaskFilterby(prevFilter => ({ ...prevFilter, byMembers: { ...prevFilter.byMembers, isNoOne: !prevFilter.byMembers.isNoOne } }))
        } else {
            const someMembersArr = taskFilterBy.byMembers.someMembers
            if (someMembersArr.includes(name)) {
                const updatedSomeMembers = someMembersArr.filter(memberId => memberId !== name);
                setTaskFilterby(prevFilter => ({ ...prevFilter, byMembers: { ...prevFilter.byMembers, someMembers: updatedSomeMembers } }))
            } else {
                setTaskFilterby(prevFilter => ({ ...prevFilter, byMembers: { ...prevFilter.byMembers, someMembers: [...prevFilter.byMembers.someMembers, name] } }))
            }
        }
    }

    function onToggleDuedate(name) {
        if (name === 'no-date') {
            setTaskFilterby(prevFilter => ({ ...prevFilter, byDuedate: { ...prevFilter.byDuedate, isDate: !prevFilter.byDuedate.isDate } }))
        } else if (name === 'overdue') {
            setTaskFilterby(prevFilter => ({ ...prevFilter, byDuedate: { ...prevFilter.byDuedate, isOverdue: !prevFilter.byDuedate.isOverdue } }))
        } else if (name === 'duesoon') {
            setTaskFilterby(prevFilter => ({ ...prevFilter, byDuedate: { ...prevFilter.byDuedate, isDuesoon: !prevFilter.byDuedate.isDuesoon } }))
        } else if (name === 'complete') {
            setTaskFilterby(prevFilter => ({ ...prevFilter, byDuedate: { ...prevFilter.byDuedate, isComplete: !prevFilter.byDuedate.isComplete } }))
        }
    }

    function onToggleLabel(name) {
        if (name === 'no-label') {
            setTaskFilterby(prevFilter => ({ ...prevFilter, byLabels: { ...prevFilter.byLabels, isNoOne: !prevFilter.byLabels.isNoOne } }))
        } else if (name === 'all') {
            setTaskFilterby(prevFilter => ({ ...prevFilter, byLabels: { ...prevFilter.byLabels, isAll: !prevFilter.byLabels.isAll } }))
        } else {
            const someLabelsArr = taskFilterBy.byLabels.someLabel
            if (someLabelsArr.includes(name)) {
                const updatedSomeLabels = someLabelsArr.filter(memberId => memberId !== name);
                setTaskFilterby(prevFilter => ({ ...prevFilter, byLabels: { ...prevFilter.byLabels, someLabel: updatedSomeLabels } }))
            } else {
                setTaskFilterby(prevFilter => ({ ...prevFilter, byLabels: { ...prevFilter.byLabels, someLabel: [...prevFilter.byLabels.someLabel, name] } }))
            }
        }
    }

    function onClearTaskFilterBy() {
        setTaskFilterby({
            txt: '',
            byMembers: {
                isAll: false,
                isMe: false,
                isNoOne: false,
                // name: false,
                someMembers: []
            },
            byDuedate: {
                isDate: false,
                isOverdue: false,
                isDuesoon: false,
                isComplete: false
            },
            // byDuedate: byDate,
            byLabels: {
                isNoOne: false,
                isAll: false,
                someLabel: []
            }
        })
    }

    const { txt } = taskFilterBy
    return (
        <div className="filter-container">
            <header>
                <h2>Filters</h2>
                <span onClick={() => setIsFiltersOpen(false)}>{additionTaskSvg.close}</span>
                <h2 onClick={onClearTaskFilterBy}>Clear all</h2>
            </header>
            <div className="content">
                <section className="search-key">
                    <p>Keyword</p>
                    <input
                        type="text"
                        name='txt'
                        value={txt}
                        placeholder="Enter a keyword..."
                        onChange={(event) => onHandelFilterChange(event)}
                    />
                    <h2>search cards, members, labels, and more.</h2>
                </section>
                <section className="members">
                    <p>Members</p>
                    <ul className="clean-list">
                        <li>
                            {getCheckBox(onToggleMember, 'no-members')}
                            <section className="titles" onClick={() => onToggleMember('no-members')}>
                                <span>{workspaceSvg.member}</span>
                                <h2>No Members</h2>
                            </section>
                        </li>
                        <li>
                            {getCheckBox(onToggleMember, 'me')}
                            <section className="titles" onClick={() => onToggleMember('me')}>
                                <img src={user.imgUrl} alt="" />
                                <h2>Cards assign to me</h2>
                            </section>
                        </li>
                        <li>
                            <div className="member-select-picker">
                                {getCheckBox(onToggleMember, 'all')}
                                <section className="select-input" onClick={() => setIsOpenMemberSelect(!isOpenMemberSelect)}>
                                    <input type="text" placeholder="Select members" />
                                    <span>{appHeaderSvg.arrowDown}</span>
                                </section>
                            </div>
                        </li>
                        {isOpenMemberSelect && (
                            <ul className="member-select-display clean-list">
                                {board.members.map(boardMember =>
                                (
                                    <li>
                                        <section className='checkbox user-place'>
                                            <Checkbox sx={{
                                                '& .MuiSvgIcon-root': { fontSize: 10 }, padding: 0, width: 16, height: 16, color: 'rgba(23, 43, 77, 0.2)',
                                                '&:checked': {
                                                    '& .MuiSvgIcon-root': {
                                                        '&.css-i4bv87-MuiSvgIcon-root': {
                                                            color: 'initial'
                                                        }
                                                    },
                                                }
                                            }}
                                                onClick={() => onToggleMember(boardMember._id)}
                                            // checked={checkboxMembers.includes(boardMember._id)}
                                            />
                                        </section >
                                        <section className="titles" onClick={() => onToggleMember(boardMember._id)}>
                                            <img src={boardMember.imgUrl} alt="" />
                                            <h2>{boardMember.fullname}</h2>
                                            <h2 className="username">@{boardMember.username}</h2>
                                        </section>
                                    </li>

                                )
                                )}
                            </ul>
                        )}
                    </ul>
                </section>
                <section className="members date">
                    <p>Due date</p>
                    <ul className="clean-list">
                        <li>
                            {getCheckBox(onToggleDuedate, 'no-date')}
                            <section className="titles" onClick={() => onToggleDuedate('no-date')}>
                                <span className="calender">{taskSvg.calender}</span>
                                <h2>No dates</h2>
                            </section>
                        </li>
                        <li>
                            {getCheckBox(onToggleDuedate, 'overdue')}
                            <section className="titles" onClick={() => onToggleDuedate('overdue')}>
                                <span className="overdue-svg">{taskSvg.clock}</span>
                                <h2>Overdue</h2>
                            </section>
                        </li>
                        <li>
                            {getCheckBox(onToggleDuedate, 'duesoon')}
                            <section className="titles" onClick={() => onToggleDuedate('duesoon')}>
                                <span className="duesoon-svg">{taskSvg.clock}</span>
                                <h2>Due in next day</h2>
                            </section>
                        </li>
                        <li>
                            {getCheckBox(onToggleDuedate, 'complete')}
                            <section className="titles" onClick={() => onToggleDuedate('complete')}>
                                <span className="complete-svg">{taskSvg.clock}</span>
                                <h2>Complete</h2>
                            </section>
                        </li>
                    </ul>
                </section>
                <section className="members labels">
                    <p>Labels</p>
                    <ul className="clean-list ul-labels">
                        <li>
                            {getCheckBox(onToggleLabel, 'no-label')}
                            <section className="titles" onClick={() => onToggleLabel('no-label')}>
                                <span>{additionTaskEdiSvg.label}</span>
                                <h2>No labels</h2>
                            </section>
                        </li>
                        {firstLabels.map(firstLabel =>
                        (
                            <li key={firstLabel.id}>
                                <section className='checkbox no-labels'>
                                    <Checkbox sx={{
                                        '& .MuiSvgIcon-root': { fontSize: 10 }, padding: 0, width: 16, height: 16, color: 'rgba(23, 43, 77, 0.2)',
                                        '&:checked': {
                                            '& .MuiSvgIcon-root': {
                                                '&.css-i4bv87-MuiSvgIcon-root': {
                                                    color: 'initial'
                                                }
                                            },
                                        }
                                    }}
                                        onClick={() => onToggleLabel(firstLabel.id)}
                                    />
                                </section >
                                <button onClick={() => onToggleLabel(firstLabel.id)} className='color clean-btn' style={{ backgroundColor: firstLabel.color }}>{firstLabel.title}</button>
                            </li>
                        ))}
                        <li>
                            <div className="member-select-picker">
                                {getCheckBox(onToggleLabel, 'all')}
                                <section className="select-input" onClick={() => setIsLabelSelectOpen(!isLabelSelectOpen)}>
                                    <input type="text" placeholder="Select labls" />
                                    <span>{appHeaderSvg.arrowDown}</span>
                                </section>
                            </div>
                        </li>
                        {isLabelSelectOpen && (
                            <ul className="member-select-display labels-ul-modal clean-list">
                                {board.labels.map(boardLabel =>
                                (
                                    <li>
                                        <section className='checkbox label-picker'>
                                            <Checkbox sx={{
                                                '& .MuiSvgIcon-root': { fontSize: 10 }, padding: 0, width: 16, height: 16, color: 'rgba(23, 43, 77, 0.2)',
                                                '&:checked': {
                                                    '& .MuiSvgIcon-root': {
                                                        '&.css-i4bv87-MuiSvgIcon-root': {
                                                            color: 'initial'
                                                        }
                                                    },
                                                }
                                            }}
                                                onClick={getCheckBox(onToggleLabel, boardLabel.id)}
                                            />
                                        </section >
                                        <button onClick={() => onToggleLabel(boardLabel.id)} className='color clean-btn' style={{ backgroundColor: boardLabel.color }}>{boardLabel.title} jj</button>
                                    </li>

                                )
                                )}
                            </ul>
                        )}
                    </ul>
                </section>
            </div>
        </div>
    )
}