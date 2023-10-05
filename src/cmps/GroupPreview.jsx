import { useState } from 'react'
import {TaskList} from './TaskList'
// import { TextInputs } from './TextInputs'
import { QuickGroupEdit } from './QuickGroupEdit'

import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';


export function GroupPreview({isLabelsShown,setIsLabelsShown,group, members, labels, onRemoveGroup}){
	const [toggleGroupMenu, setToggleGroupMenu] = useState(false)

	// function handleSubmit({target}) {
    //     console.log(target);
    // }
    return (
        <section className="group-preview">
			<section className='header-wrapper'>

				<header className='group-preview-header'>			
						<Textarea 
							name="title"
							className="edit-group-title clean-btn"
							id={group.id}
							defaultValue={group.title}
							// onChange={} TODO
							></Textarea>
					
						<img onClick={() => setToggleGroupMenu(!toggleGroupMenu)} src="https://res.cloudinary.com/dpwmxprpp/image/upload/v1696437012/asset_14_gltqff.svg" alt="" />
				</header>
			</section>
			<section className='group-edit'>
				{toggleGroupMenu && <QuickGroupEdit setToggleGroupMenu={setToggleGroupMenu} groupId={group.id} onRemoveGroup={onRemoveGroup}/>}
			</section>
			<section className='task-list-container'>
				<TaskList isLabelsShown={isLabelsShown} setIsLabelsShown={setIsLabelsShown}  members={members} labels={labels} tasks={group.tasks}/>
			</section>
			{/* <TextInputs toggle={toggleAddCardInput} setToggle={setToggleCardInput} handleSubmit={handleSubmit} from={'task'}/> */}
			<section className='footer-wrapper'>

				<footer>
					<Textarea />
				
				</footer>
			</section>
			{/* {!toggleGroupMenu ?
                    <div className='add-group-msg' onClick={() => setInputExpand(!toggleGroupMenu)}>+ Add new card</div> :
                    <div className='add-group-input-expanded'>
                        <Textarea name="title"
                            placeholder="Enter list title..."
                            autoFocus
                            value={newGroup.title}
                            onChange={handleChange} />
                            <section className='add-controls'>
                                <Button type="submit" onClick={onSaveNewGroup}>Add List</Button>
                                <button className='cancel' onClick={() => setInputExpand(!toggleGroupMenu)}>X</button>
                            </section>
                    </div>} */}
        </section>
    )
}


