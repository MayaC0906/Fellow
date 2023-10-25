import React, { useState, useRef, useEffect } from 'react';
import { taskService } from '../../services/task.service.local';
import Button from '@mui/joy/Button';
import { useSelector } from 'react-redux';
import { showSuccessMsg } from '../../services/event-bus.service';
import { saveNewTask } from '../../store/actions/board.actions';
import { GroupMenu } from './GroupMenu';
import { TaskList } from '../Task/TaskList';
import { groupPreview } from '../Svgs';

export function GroupPreview({
  handleDrag,
  onEditGroup,
  isLabelsShown,
  setIsLabelsShown,
  group,
  members,
  labels,
  onRemoveGroup,
  onDuplicateGroup,
  openMenuGroupId,
  setOpenMenuGroupId
}) {
  const [isInputExpand, setInputExpand] = useState(false);
  const [newTask, setNewTask] = useState(taskService.getEmptyTask());
  const board = useSelector((storeState) => storeState.boardModule.board);
  const groupHeaderRef = useRef(null);
  const [groupMenuPosition, setGroupMenuPosition] = useState({ top: '', left: '' });


  function toggleGroupMenu(groupId) {
    if (openMenuGroupId === groupId) {
        setOpenMenuGroupId(null);
    } else {
        setOpenMenuGroupId(groupId);
    }
}


	useEffect(() => {
		if (openMenuGroupId !== null && groupHeaderRef.current) {
		getBounds();
		}
	}, [openMenuGroupId]);

	function getBounds() {
		if (groupHeaderRef.current) {
		const rect = groupHeaderRef.current.getBoundingClientRect();
		setGroupMenuPosition({
			top: rect.top + rect.height,
			left: rect.left
		});
		}
	}

	async function onSaveNewTask(ev) {
		ev.preventDefault();
		setInputExpand(false);
		if (!newTask.title) return;
		try {
		await saveNewTask(board._id, group.id, newTask);
		setNewTask(taskService.getEmptyTask());
		showSuccessMsg('New task added');
		} catch (err) {
		console.log('failed to save new task', err);
		throw err;
		}
	}

	function handleChange(ev) {
		let { value, name: field } = ev.target;
		setNewTask((prevGroup) => ({ ...prevGroup, [field]: value }));
	}

  return (
    <section className="group-preview">
		<section className="header-wrapper">
			<header className="group-preview-header">
			<input
				name="title"
				className="edit-group-title clean-btn"
				id={group.id}
				defaultValue={group.title}
				onBlur={(event) => onEditGroup(group.id, event)}
				onKeyDown={(event) => onEditGroup(group.id, event)}
			></input>
			<section>
				<img
				onClick={() => toggleGroupMenu(group.id)}
				src="https://res.cloudinary.com/dpwmxprpp/image/upload/v1696437012/asset_14_gltqff.svg"
				alt=""
				ref={groupHeaderRef}
				/>
			</section>
			</header>
		</section>
		<section className="group-edit">
			{group.id === openMenuGroupId && (
			<div className="group-menu">
				<GroupMenu
				group={group}
				setToggleGroupMenu={toggleGroupMenu}
				groupMenuPosition={groupMenuPosition}
				setInputExpand={setInputExpand}
				onRemoveGroup={onRemoveGroup}
				onDuplicateGroup={onDuplicateGroup}
				openMenuGroupId={openMenuGroupId}
				setOpenMenuGroupId={setOpenMenuGroupId} 
				/>
			</div>
			)}
		</section>
		<section className="task-list-container">
			<TaskList
			isLabelsShown={isLabelsShown}
			setIsLabelsShown={setIsLabelsShown}
			members={members}
			labels={labels}
			tasks={group.tasks}
			groupId={group.id}
			handleDrag={handleDrag}
			/>
		</section>
		<section className="footer-wrapper">
			<footer>
			{!isInputExpand ? (
				<div className="add-group-task" onClick={() => setInputExpand(true)}>
				<section>
					{groupPreview.plus}
					<span>Add new card</span>
				</section>
				{groupPreview.copy}
				</div>
			) : (
				<div>
				<textarea
					name="title"
					placeholder="Enter card title..."
					rows={4}
					onChange={handleChange}
				/>
				<section className="add-controls">
					<Button type="submit" onClick={onSaveNewTask}>
					Add Card
					</Button>
					<button className="cancel clean-btn" onClick={() => setInputExpand(false)}>
					X
					</button>
				</section>
				</div>
			)}
			</footer>
		</section>
    </section>
  );
}
