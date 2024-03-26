import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'

import dayjs from 'dayjs';

import { additionTaskSvg, groupMenu, taskSvg } from '../Svgs';

export function GroupMenu({
  setInputExpand,
  onDuplicateGroup,
  group,
  onRemoveGroup,
  groupMenuPosition,
  setOpenMenuGroupId,
  openMenuGroupId,
  onUpdateGroup,
  onUpdateBoard
}) {

  const board = useSelector((storeState) => storeState.boardModule.board)

  const [menuContent, setMenuContent] = useState('');

  const groups = board?.groups
  const { tasks } = group


  useEffect(() => {
    setMenuContent('default')
  }, [])

  const defaultContent = (
    <ul className="clean-list">
      <li onClick={() => onRemoveGroup(group)}>Delete...</li>
      <li onClick={() => onDuplicateGroup(group)}>Copy list...</li>
      {group.id === openMenuGroupId && (
        <li onClick={() => setInputExpand(true)}>Add card...</li>
      )}
      <li onClick={onSetGroupWatch}>Watch {group.isWatch && <span className=''>{taskSvg.check}</span>}</li>
      <hr />
      <li onClick={() => setMenuContent('sortBy')}>Sort By...</li>
      <hr />
      <li onClick={() => setMenuContent('moveCards')}>Move all cards in this list...</li>
    </ul>
  );
  async function onSetGroupWatch() {
    const updatedGroup = { ...group, isWatch: !group.isWatch }
    onUpdateGroup(updatedGroup)
  }

  async function sortByCreatedOld() {
    const sortedByDuedate = {
      ...group, tasks: tasks.sort((a, b) => {
        const firstCreated = a.createdAt
        const secondCreated = b.createdAt
        return firstCreated - secondCreated
      })
    }
    onUpdateGroup(sortedByDuedate)
  }

  async function sortByDuedate() {
    const sortedByDuedate = {
      ...group, tasks: tasks.sort((a, b) => {
        const firstDate = a.dueDate.date ? dayjs(a.dueDate.date, 'MMM D [at] h:mm A').valueOf() : null
        const secondDate = b.dueDate.date ? dayjs(b.dueDate.date, 'MMM D [at] h:mm A').valueOf() : null

        if (firstDate === null && secondDate === null) return 0
        if (firstDate === null) return 1
        if (secondDate === null) return -1

        const currDate = new Date()
        const diff1 = Math.abs(firstDate - currDate)
        const diff2 = Math.abs(secondDate - currDate)
        return diff1 - diff2
      })
    }
    onUpdateGroup(sortedByDuedate)
  }

  async function sortByAlphaB() {
    const { tasks } = group
    const sortedGroup = {
      ...group, tasks: tasks.sort((a, b) => {
        const firstTitle = a.title.toUpperCase()
        const secondTitle = b.title.toUpperCase()
        return firstTitle.localeCompare(secondTitle)
      })
    }
    onUpdateGroup(sortedGroup)
  }

  const moveCardsContent = (
    <ul className="clean-list">
      {groups && groups.map((group, idx) => {
        return <li onClick={moveTasks} value={idx} key={group.id}>{group.title}</li>
      })}
    </ul>
  );

  async function moveTasks({ target }) {
    const currGroupPosIdx = groups.findIndex(g => g.id === group.id)
    const groupTargetIdx = target.value
    const currGroupTasks = [...group.tasks]

    groups[currGroupPosIdx].tasks.splice(0, group.tasks.length)

    board.groups[groupTargetIdx].tasks.push(...currGroupTasks)

    await onUpdateBoard(board)
  }

  async function sortByCreatedNew() {
    const sortedByDuedate = {
      ...group, tasks: tasks.sort((a, b) => {
        const firstCreated = a.createdAt
        const secondCreated = b.createdAt
        return secondCreated - firstCreated
      })
    }
    onUpdateGroup(sortedByDuedate)
  }
  const style = {
    position: 'fixed',
    top: groupMenuPosition.top + 'px',
    left: groupMenuPosition.left + 'px',
  };
  const sortByContent = (
    <ul className="clean-list">
      <li onClick={sortByCreatedNew}>Date created (newest first)</li>
      <li onClick={sortByCreatedOld}>Date created (oldest first)</li>
      <li onClick={sortByAlphaB}>Card name (alphabetically)</li>
      <li onClick={sortByDuedate}>Due Date</li>
    </ul>
  );

  let contentToDisplay;
  let headerText;
  switch (menuContent) {
    case 'sortBy':
      contentToDisplay = sortByContent;
      headerText = "Sort list";
      break;
    case 'moveCards':
      contentToDisplay = moveCardsContent;
      headerText = "Move all cards in list";
      break;
    default:
      contentToDisplay = defaultContent;
      headerText = "List action";
      break;
  }

  return (
    <section className="group-edit-modal" style={style}>
      <header>
        {menuContent !== 'default' && (
          <button onClick={() => setMenuContent('default')} className="back-btn clean-btn">
            {groupMenu.backArr}</button>
        )}
        <div>{headerText}</div>
        <button onClick={() => {
          setOpenMenuGroupId(null)
          setMenuContent('default')
        }} className="close-btn">{additionTaskSvg.close}</button>

      </header>
      {contentToDisplay}
    </section>
  );
}
