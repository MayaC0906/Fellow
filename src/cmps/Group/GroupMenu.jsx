import React from 'react';

export function GroupMenu({
  setInputExpand,
  onDuplicateGroup,
  group,
  onRemoveGroup,
  setToggleGroupMenu,
  groupMenuPosition,
  openMenuGroupId
}) {
  const style = {
    position: 'fixed',
    top: groupMenuPosition.top + 'px',
    left: groupMenuPosition.left + 'px',
  };

  return (
    <section className="group-edit-modal" style={style}>
      <header>
        <div>List action</div>
        <button onClick={() => setOpenGroupId(null)} className="close-btn">
            X
        </button>
      </header>
      <ul className="clean-list">
        <li onClick={() => onRemoveGroup(group.id)}>Delete</li>
        <li onClick={() => onDuplicateGroup(group)}>Copy list</li>
        {group.id === openMenuGroupId && (
          <li onClick={() => setInputExpand(true)}>Add card...</li>
        )}
      </ul>
    </section>
  );
}
