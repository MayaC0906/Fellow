import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
import { useState } from 'react';
import { taskSvg } from '../../Svgs';
import { useSelector } from 'react-redux'

import { boardService } from '../../../services/board.service.local';
export function TaskComments({onSaveTask ,task, groupId}) {
    const [isDescExpand, setIsDescExpand] = useState(false)
    const [txt, setTxt] = useState('')
    const [italic, setItalic] = useState(false);
    const [fontWeight, setFontWeight] = useState('normal');
    const [anchorEl, setAnchorEl] = useState(null);
    const user = useSelector((storeState) => storeState.userModule.user)

    function onToggleDescription() {
        setIsDescExpand(!isDescExpand)
    }


    async function onSaveComment(ev) {
        ev.preventDefault()
        const newTask = { ...task }
        const comment = boardService.getEmptyComment(user,txt, groupId, newTask.id)
        newTask.comments.push(comment)
        try {
            await onSaveTask(newTask)
            onToggleDescription()
            console.log('Task comment added successfully')
        } catch (err) {
            console.log('Cannot save comment', err);
        }
    }

   

    return (
        <section className="task-descriptoin">
                <img 
                    // ref={(el) => imgRefs.current[activity.id] = el}
                    // onClick={() => handleImgClick(activity)}
                    src={user.imgUrl}
                    // alt={activity.byMember.fullname}
                    style={{ 
                    height: '32px',
                    width:'32px',
                    borderRadius: '50%',
                    marginLeft: '12px',
                    marginTop:'3px',
                    position:'absolute'
                    }}             
                />
                <div onClick={onToggleDescription}
                    className={'write-comment ' + (isDescExpand ? 'hide ' : '' + (isDescExpand ? '' : 'add-description'))}>
                    {isDescExpand || 'Write a comment...'}
                    {/* <style</style> */}
                </div>

            {isDescExpand && < FormControl className="description-input" sx={{ width: '90%' }}>
                <Textarea
                    onChange={(event) => { setTxt(event.target.value) }}
                    // defaultValue={description}
                    minRows={2}
                    endDecorator={
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 'var(--Textarea-paddingBlock)',
                                pt: 'var(--Textarea-paddingBlock)',
                                borderTop: '1px solid',
                                borderColor: 'divider',
                                flex: 'auto',
                            }}
                        >
                            <IconButton
                                variant="plain"
                                color="neutral"
                                onClick={(event) => setAnchorEl(event.currentTarget)}
                            >
                                <FormatBold />
                                <KeyboardArrowDown fontSize="md" />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                                size="sm"
                                placement="bottom-start"
                                sx={{ '--ListItemDecorator-size': '24px' }}
                            >
                                {['200', 'normal', 'bold'].map((weight) => (
                                    <MenuItem
                                        key={weight}
                                        selected={fontWeight === weight}
                                        onClick={() => {
                                            setFontWeight(weight);
                                            setAnchorEl(null);
                                        }}
                                        sx={{ fontWeight: weight }}
                                    >
                                        <ListItemDecorator>
                                            {fontWeight === weight && <Check fontSize="sm" />}
                                        </ListItemDecorator>
                                        {weight === '200' ? 'lighter' : weight}
                                    </MenuItem>
                                ))}
                            </Menu>
                            <IconButton
                                variant={italic ? 'soft' : 'plain'}
                                color={italic ? 'primary' : 'neutral'}
                                aria-pressed={italic}
                                onClick={() => setItalic((bool) => !bool)}
                            >
                                <FormatItalic />
                            </IconButton>
                        </Box>

                    }
                    sx={{
                        minWidth: 300,
                        fontWeight,
                        fontStyle: italic ? 'italic' : 'initial',
                    }}
                />
            </FormControl>
            }
            {isDescExpand && <section className='desc-actions'>
                <button className='desc-btn save' onClick={onSaveComment}>Save</button>
                <button className='desc-btn cancel' onClick={onToggleDescription}> Cancel </button>
            </section>}

        </section>
    )
}