export function QuickGroupEdit({setInputExpand,onDuplicateGroup,group,onRemoveGroup,setToggleGroupMenu, groupHeaderPosition }){


    const style = {
        position: 'fixed',
        top: groupHeaderPosition.top + 'px',
        left: groupHeaderPosition.left + 'px',
      };
    
    return (
        <section className="group-edit-modal" style={style}>
                <header>
                    <div>List action</div>
                    <button onClick={() => setToggleGroupMenu(false)} className="close-btn">X</button>
                </header>
                <ul className="clean-list">

                <li onClick={() => onRemoveGroup(group.id)}>Delete</li>
                <li onClick={() => onDuplicateGroup(group)}>Copy list</li>
                <li onClick={() => setInputExpand(true)}>Add card...</li>
                </ul>
                {/* <span>Copy list...</span>
                <span>Move list...</span>
                <span>Watch</span> */}
            </section>
        )
}