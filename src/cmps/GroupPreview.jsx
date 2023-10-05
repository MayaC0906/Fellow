import { useState } from 'react'
import {TaskList} from './TaskList'
// import { TextInputs } from './TextInputs'
import { QuickGroupEdit } from './QuickGroupEdit'

import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';


export function GroupPreview({group, members, labels, onRemoveGroup}){
	const [toggleAddCardInput, setToggleCardInput] = useState(false)
	const [toggleGroupMenu, setToggleGroupMenu] = useState(false)
	// function handleSubmit({target}) {
    //     console.log(target);
    // }
    return (
        <section className="group-preview">
			<header className='group-preview-header'>			
				<form>
					<textarea
						name="title"
						className="edit-group-title"
						id={group.id}
						defaultValue={group.title}
						// onChange={} TODO
					></textarea>
				</form>
				
					<img onClick={() => setToggleGroupMenu(!toggleGroupMenu)} src="https://res.cloudinary.com/dpwmxprpp/image/upload/v1696437012/asset_14_gltqff.svg" alt="" />
				
			</header>
			<section className='group-edit'>
				{toggleGroupMenu && <QuickGroupEdit setToggleGroupMenu={setToggleGroupMenu} groupId={group.id} onRemoveGroup={onRemoveGroup}/>}
			</section>
			<section className='task-list-container'>

				<TaskList members={members} labels={labels} tasks={group.tasks}/>
			</section>
			{/* <TextInputs toggle={toggleAddCardInput} setToggle={setToggleCardInput} handleSubmit={handleSubmit} from={'task'}/> */}
			<Textarea />
        </section>
    )
}


