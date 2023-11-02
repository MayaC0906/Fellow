import { Checkbox } from "@mui/joy";
import { additionTaskEdiSvg, additionTaskSvg, appHeaderSvg, taskSvg, workspaceSvg } from "../Svgs";
import { useSelector } from "react-redux";
import { useState } from "react";

export function TaskFilter({ setIsFiltersOpen, taskFilterBy, setTaskFilterby, checkboxContainer, handelCheckBox, setCheckboxContainer }) {
    const user = useSelector(storeState => storeState.userModule.user)
    const board = useSelector(storeState => storeState.boardModule.board)
    const [isOpenMemberSelect, setIsOpenMemberSelect] = useState(false)
    const [isLabelSelectOpen, setIsLabelSelectOpen] = useState(false)
    const firstLabels = board.labels.slice(0, 3)

    function getCheckBox(type, name, key) {
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
                    onClick={() => toggleFilterOptions(type, name, key)}
                    checked={checkboxContainer.includes(name)} />
            </section >
        )
    }

    function onHandelTxtFilterChange(ev) {
        const field = ev.target.name
        let value = ev.target.value
        setTaskFilterby(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function toggleFilterOptions(type, name, key) {
        let checkboxName = ''
        switch (name) {
            case 'me':
            case 'all-members':
            case 'no-members':
            case 'no-label':
            case 'all-labels':
            case 'no-date':
            case 'overdue':
            case 'duesoon':
            case 'complete':
                setTaskFilterby(prevFilter => ({ ...prevFilter, [type]: { ...prevFilter[type], [key]: !prevFilter[type][key] } }))
                break;
            default:
        }

        switch (key) {
            case 'someMembers':
            case 'someLabel':
                const someOptions = taskFilterBy[type][key]
                if (someOptions.includes(name)) {
                    const updated = someOptions.filter(id => id !== name);
                    setTaskFilterby(prevFilter => ({ ...prevFilter, [type]: { ...prevFilter[type], [key]: updated } }))
                } else {
                    setTaskFilterby(prevFilter => ({ ...prevFilter, [type]: { ...prevFilter[type], [key]: [...prevFilter[type][key], name] } }))
                }
                break;
        }

        checkboxName = name
        if (checkboxName) handelCheckBox(checkboxName)
    }

    function onClearTaskFilterBy() {
        setTaskFilterby({
            txt: '',
            byMembers: {
                isAll: false,
                isMe: false,
                isNoOne: false,
                someMembers: []
            },
            byDuedate: {
                isDate: false,
                isOverdue: false,
                isDuesoon: false,
                isComplete: false
            },
            byLabels: {
                isNoOne: false,
                isAll: false,
                someLabel: []
            }
        })
        setCheckboxContainer([])
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
                        onChange={(event) => onHandelTxtFilterChange(event)}
                    />
                    <h2>search cards, members, labels, and more.</h2>
                </section>
                <section className="members">
                    <p>Members</p>
                    <ul className="clean-list">
                        <li>
                            {getCheckBox('byMembers', 'no-members', 'isNoOne')}
                            <section className="titles" onClick={() => toggleFilterOptions('byMembers', 'no-members', 'isNoOne')}>
                                <span>{workspaceSvg.member}</span>
                                <h2>No Members</h2>
                            </section>
                        </li>
                        <li>
                            {getCheckBox('byMembers', 'me', 'isMe')}
                            <section className="titles" onClick={() => toggleFilterOptions('byMembers', 'me', 'isMe')}>
                                <img src={user.imgUrl} alt="" />
                                <h2>Cards assign to me</h2>
                            </section>
                        </li>
                        <li>
                            <div className="member-select-picker">
                                {getCheckBox('byMembers', 'all-members', 'isAll')}
                                <section className="select-member" onClick={() => setIsOpenMemberSelect(!isOpenMemberSelect)}>
                                    <div className="select-title">Select members</div>
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
                                            {getCheckBox('byMembers', boardMember._id, 'someMembers')}
                                        </section >
                                        <section className="titles" onClick={() => toggleFilterOptions('byMembers', boardMember._id, 'someMembers')}>
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
                            {getCheckBox('byDuedate', 'no-date', 'isDate')}
                            <section className="titles" onClick={() => toggleFilterOptions('byDuedate', 'no-date', 'isDate')}>
                                <span className="calender">{taskSvg.calender}</span>
                                <h2>No dates</h2>
                            </section>
                        </li>
                        <li>
                            {getCheckBox('byDuedate', 'overdue', 'isOverdue')}
                            <section className="titles" onClick={() => toggleFilterOptions('byDuedate', 'overdue', 'isOverdue')}>
                                <span className="overdue-svg">{taskSvg.clock}</span>
                                <h2>Overdue</h2>
                            </section>
                        </li>
                        <li>
                            {getCheckBox('byDuedate', 'duesoon', 'isDuesoon')}
                            <section className="titles" onClick={() => toggleFilterOptions('byDuedate', 'duesoon', 'isDuesoon')}>
                                <span className="duesoon-svg">{taskSvg.clock}</span>
                                <h2>Due in next day</h2>
                            </section>
                        </li>
                        <li>
                            {getCheckBox('byDuedate', 'complete', 'isComplete')}
                            <section className="titles" onClick={() => toggleFilterOptions('byDuedate', 'complete', 'isComplete')}>
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
                            {getCheckBox('byLabels', 'no-label', 'isNoOne')}
                            <section className="titles" onClick={() => toggleFilterOptions('byLabels', 'no-label', 'isNoOne')}>
                                <span>{additionTaskEdiSvg.label}</span>
                                <h2>No labels</h2>
                            </section>
                        </li>
                        {firstLabels.map(firstLabel =>
                        (
                            <li key={firstLabel.id}>
                                <section className='checkbox no-labels'>
                                    {getCheckBox('byLabels', firstLabel.id, 'someLabel')}
                                </section >
                                <button onClick={() => toggleFilterOptions('byLabels', firstLabel.id, 'someLabel')} className='color clean-btn' style={{ backgroundColor: firstLabel.color }}>{firstLabel.title}</button>
                            </li>
                        ))}
                        <li>
                            <div className="member-select-picker">
                                {getCheckBox('byLabels', 'all-labels', 'isAll')}
                                <section className="select-member" onClick={() => setIsLabelSelectOpen(!isLabelSelectOpen)}>
                                    <div className="select-title">Select labels</div>
                                    <span>{appHeaderSvg.arrowDown}</span>
                                </section>
                            </div>
                        </li>
                        {isLabelSelectOpen && (
                            <ul className="member-select-display labels-ul-modal clean-list">
                                {board.labels.map(boardLabel =>
                                (
                                    <li>
                                        {getCheckBox('byLabels', boardLabel.id, 'someLabel')}
                                        <button onClick={() => toggleFilterOptions('byLabels', boardLabel.id, 'someLabel')} className='color clean-btn' style={{ backgroundColor: boardLabel.color }}>{boardLabel.title}</button>
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