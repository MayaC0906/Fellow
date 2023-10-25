import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux'
import { groupMenu } from '../Svgs';
export function GroupMenu({
    setInputExpand,
    onDuplicateGroup,
    group,
    onRemoveGroup,
    setToggleGroupMenu,
    groupMenuPosition,
    setOpenMenuGroupId,
    openMenuGroupId,
    onSortGroup,
    onUpdateBoard
  }) {
    const board = useSelector((storeState) => storeState.boardModule.board)
    const groups = board?.groups
    const [menuContent, setMenuContent] = useState('default');

    const defaultContent = (
      <ul className="clean-list">
        <li onClick={() => onRemoveGroup(group.id)}>Delete</li>
        <li onClick={() => onDuplicateGroup(group)}>Copy list</li>
        {group.id === openMenuGroupId && (
          <li onClick={() => setInputExpand(true)}>Add card...</li>
        )}
        <hr />
        <li onClick={() => setMenuContent('sortBy')}>Sort By</li>
        <hr/>
        <li onClick={() => setMenuContent('moveCards')}>Move all cards in this list...</li>
      </ul>
    );

    async function sortByAlphaB() {
        // const tasks = {}
        const {tasks} = group
        const sortedGroup = {...group, tasks: tasks.sort((a, b) => {
          const firstTitle = a.title.toUpperCase()
          const secondTitle = b.title.toUpperCase()
          return firstTitle.localeCompare(secondTitle)
        })}  
        onSortGroup(sortedGroup)
    }
  
  const sortByContent = (
    <ul className="clean-list">
      <li onClick={() => {}}>Date created (newest first)</li>
      <li onClick={() => {}}>Date created (oldest first)</li>
      <li onClick={sortByAlphaB}>Card name (alphabetically)</li>
      <li onClick={() => { }}>Due Date</li>
    </ul>
  );


  async function moveTasks({target}) {
      console.log('target', target.value);
      const currGroupPosIdx = groups.findIndex(g => g.id === group.id )
      const groupTargetIdx = target.value
      const currGroupTasks = [...group.tasks]
      console.log('curr', currGroupTasks);
      groups[currGroupPosIdx].tasks.splice(0, group.tasks.length)
      // console.log('target group tasks', targetGroupTasks);
      board.groups[groupTargetIdx].tasks.push(...currGroupTasks)
      console.log('group', groups[groupTargetIdx].tasks);

      await onUpdateBoard(board)
  }



    const moveCardsContent = (
      <ul className="clean-list">
        {groups && groups.map((group, idx) => {
          return <li onClick={moveTasks} value={idx} key={group.id}>{group.title}</li>
        })}
      </ul>
    );

    const style = {
      position: 'fixed',
      top: groupMenuPosition.top + 'px',
      left: groupMenuPosition.left + 'px',
    };

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
            <button onClick={() => setMenuContent('default')} className="back-btn clean-btn">&lt;</button>
          )}
          <div>{headerText}</div>
          <button onClick={() => setOpenMenuGroupId(null)} className="close-btn">X</button>
        </header>
        {contentToDisplay}
      </section>
    );
}
