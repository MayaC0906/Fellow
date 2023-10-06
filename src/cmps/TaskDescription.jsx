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
import { useParams } from 'react-router';
import { saveTaskDescription } from '../store/actions/board.actions';
import { useState } from 'react';

export function TaskDescription({ task }) {

    const [isDescExpand, setIsDescExpand] = useState(false)
    const [description, setDescription] = useState(task.description)
    const { boardId, groupId, taskId } = useParams()

    const [italic, setItalic] = useState(false);
    const [fontWeight, setFontWeight] = useState('normal');
    const [anchorEl, setAnchorEl] = useState(null);

    function onToggleDescription() {
        setIsDescExpand(!isDescExpand)
    }

    function onSaveDesscription(ev) {
        ev.preventDefault()
        saveTaskDescription(boardId, groupId, taskId, description)
        onToggleDescription()
        console.log('I want to save', description);
    }

    return (
        <section className="task-descriptoin">
            {description && <div onClick={onToggleDescription}
             className={isDescExpand ? 'hide' : ''}>{description}</div>}

            {!description && <div  onClick={onToggleDescription}
             className={isDescExpand ? 'hide' : ''}>Add a more detailed description...</div>}

            {isDescExpand && <FormControl sx={{ width: '90%'}}>
                <Textarea
                autoFocus
                    onChange={(event) => { setDescription(event.target.value) }}
                    defaultValue={description}
                    minRows={5}
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
                            <Button onClick={onSaveDesscription} sx={{ ml: 'auto' }}>Save</Button>
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
        </section>
    )
}