
import { Modal, Fade, Backdrop, Box, Typography, Button, Stack, FormControl, InputLabel, MenuItem, TextField, IconButton } from "@mui/material"
import { useState } from "react";
import { Props, JobCardInputDto } from "../Type";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios"
import { constants } from "../constants"

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'primary.light',
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: 'column',
};

const CardModel: React.FC<Props> = ({ open, handleClose }) => {

    const [state, setState] = useState("active");
    const [client_name, setName] = useState("");
    const [client_contact, setContact] = useState("");
    const [notes, setNotes] = useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setState(event.target.value as string);
    };

    const newJob: JobCardInputDto = {
        state,
        client_name,
        client_contact,
        notes
    }

    const createAndClose = () => {
        handleClose();
        axios.post(`${constants.backend}` + "CreateNewJob", newJob);
    }
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>

                        <IconButton sx={{ alignSelf: "flex-end" }} onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>

                        <Stack spacing={3}
                            sx={{
                                ml: '3rem'
                            }}>

                            <Box>
                                <FormControl sx={{ minWidth: 220 }} size="small">
                                    <InputLabel id="demo-select-small" color={"secondary"}>state</InputLabel>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={state}
                                        label="state"
                                        onChange={handleChange}
                                        color={"secondary"}
                                    >
                                        <MenuItem value={"active"}>active</MenuItem>
                                        <MenuItem value={"scheduled"}>scheduled</MenuItem>
                                        <MenuItem value={"invoicing"}>invoicing</MenuItem>
                                        <MenuItem value={"to priced"}>to priced</MenuItem>
                                        <MenuItem value={"completed"}>completed</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <Box>

                                <Box
                                    component="form"
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField id="outlined-basic" size="small" label="Client_name" variant="outlined" color="secondary" onChange={(e) => setName(e.target.value)} />
                                </Box>

                            </Box>

                            <Box>
                                <Box
                                    component="form"
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField id="outlined-basic" size="small" label="Client_contact" variant="outlined" color="secondary" onChange={(e) => setContact(e.target.value)} />
                                </Box>
                            </Box>

                            <Box>
                                <Typography sx={{ color: "#333" }}>Notes:</Typography>
                                <textarea style={{ "backgroundColor": "#f5f5dc" }} onChange={(e) => setNotes(e.target.value)}>
                                </textarea>
                            </Box>
                        </Stack>

                        <Button variant="contained" color="primary" onClick={createAndClose} sx={{ alignSelf: "flex-end" }}>Create</Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )

}

export default CardModel;