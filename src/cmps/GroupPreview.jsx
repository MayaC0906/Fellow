import { useState } from 'react'
import { TaskList } from './TaskList'
// import { TextInputs } from './TextInputs'
import { QuickGroupEdit } from './QuickGroupEdit'
import { taskService } from '../services/task.service.local';
import { saveGroup, saveNewTask } from '../store/actions/board.actions';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import { useSelector, useDispatch } from 'react-redux'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service';


export function GroupPreview({ handleDrag,onEditGroup, isLabelsShown, setIsLabelsShown, group, members, labels, onRemoveGroup, onDuplicateGroup }) {
	// console.log('members from groupPreview', members);
	const [toggleGroupMenu, setToggleGroupMenu] = useState(false)
	const [isInputExpand, setInputExpand] = useState(false)
	const [txt, setTxt] = useState('')
	const [newTask, setNewTask] = useState(taskService.getEmptyTask())
	const board = useSelector((storeState) => storeState.boardModule.board)



	function handleChange(ev) {
		let { value, name: field } = ev.target
		setNewTask((prevGroup) => ({ ...prevGroup, [field]: value }))
		console.log(newTask);
	}


	async function onSaveNewTask(ev) {
		ev.preventDefault();
		if (!newTask.title) return;
		try {
			console.log('before', group);
			const newGroup = { ...group, tasks: [...group.tasks, newTask] }

			console.log('after', newGroup);
			await saveNewTask(newGroup, board._id)
			setNewTask(taskService.getEmptyTask())
			setInputExpand(!isInputExpand)
			showSuccessMsg('New task added')
		} catch (err) {
			console.log('Failed to save new group', err)
			throw err
		}
	}

	return (

		<section className="group-preview">
			<section className='header-wrapper'>
				<header className='group-preview-header'>
					<Textarea
						name="title"
						className="edit-group-title clean-btn"
						id={group.id}
						maxRows={1}
						defaultValue={group.title}
						// onChange={(event) => onEditGroup(group.id,event)}
						onBlur={(event) => onEditGroup(group.id, event)}
						// onChange={} TODO
						onKeyDown={(event) => onEditGroup(group.id, event)}
						sx={{ border: 'none' }}
					></Textarea>
					<section>
						<img onClick={() => setToggleGroupMenu(!toggleGroupMenu)} src="https://res.cloudinary.com/dpwmxprpp/image/upload/v1696437012/asset_14_gltqff.svg" alt="" />
					</section>
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
					handleDrag={handleDrag}
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
								onChange={handleChange}
							/>
							<section className='add-controls'>
								<Button type="submit" onClick={onSaveNewTask} >Add Card</Button>
								<button className='cancel' onClick={() => setInputExpand(!isInputExpand)}>X</button>
							</section>
						</div>}
				</footer>
			</section>
		</section>
	)
}


