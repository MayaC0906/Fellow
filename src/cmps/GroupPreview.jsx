import { useState } from 'react'
import {TaskList} from './TaskList'
// import { TextInputs } from './TextInputs'
import { QuickGroupEdit } from './QuickGroupEdit'

import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';


export function GroupPreview({ onEditGroup ,isLabelsShown, setIsLabelsShown, group , members, labels, onRemoveGroup, onDuplicateGroup }){
	const [toggleGroupMenu, setToggleGroupMenu] = useState(false)
	const [isInputExpand, setInputExpand] = useState(false)
	const [txt, setTxt] = useState('')


	function handleTextChange(event) {
        setTxt(event.target.value);
    }


    return (
		
        <section className="group-preview">
			<section className='header-wrapper'>
				<header className='group-preview-header'>			
						<Textarea 
							name="title"
							className="edit-group-title clean-btn"
							id={group.id}
							defaultValue={group.title}
							// onChange={(event) => onEditGroup(group.id,event)}
							onBlur={(event) => onEditGroup(group.id,event)}
							// onChange={} TODO
							onKeyDown={(event) => onEditGroup(group.id,event)}
							sx={{ border:'none'}}
						></Textarea>
						<img onClick={() => setToggleGroupMenu(!toggleGroupMenu)} src="https://res.cloudinary.com/dpwmxprpp/image/upload/v1696437012/asset_14_gltqff.svg" alt="" />
				</header>
			</section>
			<section className='group-edit'>
				{toggleGroupMenu && 
					<QuickGroupEdit
					group={group}
					setToggleGroupMenu={setToggleGroupMenu}
					// groupId={group.id}
					onRemoveGroup={onRemoveGroup}
					onDuplicateGroup={onDuplicateGroup}
					/>}
			</section>
			<section className='task-list-container'>
				<TaskList 
				isLabelsShown={isLabelsShown}
				setIsLabelsShown={setIsLabelsShown}
				members={members} labels={labels}
				tasks={group.tasks}
				groupId={group.id}
				/>
			</section>
			<section className='footer-wrapper'>
				<footer>
						{!isInputExpand ?
						<div className='add-group-msg' onClick={() => setInputExpand(!isInputExpand)}>+ Add new card</div> :
						<div className='add-group-input-expanded'>
							<Textarea name="title"
								placeholder="Enter card title..."
								autoFocus
								minRows={2}
								// value={newGroup.title}
								onChange={handleTextChange} 
								/>
								<section className='add-controls'>
									<Button type="submit" >Add Card</Button>
									<button className='cancel' onClick={() => setInputExpand(!isInputExpand)}>X</button>
								</section>
						</div>}
				</footer>
			</section>
        </section>
    )
}


