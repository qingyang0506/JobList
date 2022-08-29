

import { Modal, Fade, Backdrop, Box, Typography, Button, Stack, IconButton } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { DetailCard, Props, CardUpdateDto } from "../Type";
import { constants } from "../constants";
import CloseIcon from '@mui/icons-material/Close';

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
    flexDirection: "column"
};

const DetailModel: React.FC<Props> = ({ open, handleClose, id }) => {

    const [job, setJob] = useState<DetailCard | null>(null);
    const [state, setState] = useState("");
    const [notes, setNotes] = useState("");

    const fectchDataById = async () => {
        return await axios.get(`${constants.backend}` + "GetJob/" + `${id}`);
    }

    useEffect(() => {
        fectchDataById().then(res => {
            setJob(res.data);
            setState(res.data.state);
            setNotes(res.data.notes);
        });
    }, []);

    const updateJob: CardUpdateDto = {
        id: id,
        state,
        notes
    }

    const updateAndClose = () => {
        handleClose();
        axios.put(`${constants.backend}` + "UpdateJob", updateJob);
    }
    const deletAndClose = () => {
        handleClose();
        axios.delete(`${constants.backend}` + "DeleteJob/" + `${id}`);
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
                        <Stack spacing={2}
                            sx={{ ml: "2rem" }}>
                            <Typography variant="body2" color="text.secondary" >
                                <strong>Id</strong>: {id}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>State</strong>: <select
                                    style={{ "backgroundColor": "#f5f5dc" }}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value={"active"} selected={state === "active"}>active</option>
                                    <option value={"scheduled"} selected={state === "scheduled"} >scheduled</option>
                                    <option value={"invoicing"} selected={state === "invoicing"}>invoicing</option>
                                    <option value={"to priced"} selected={state === "to priced"}>to priced</option>
                                    <option value={"completed"} selected={state === "completed"}>completed</option>
                                </select>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Create Time</strong> : {job?.create_Time}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" >
                                <strong>Client Name</strong>: {job?.client_name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>client contact</strong>: {job?.client_contact}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Notes</strong> : <textarea style={{ "backgroundColor": "#f5f5dc" }} value={notes} onChange={(e) => setNotes(e.target.value)}>
                                </textarea>
                            </Typography>
                        </Stack>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                mt: "2rem"
                            }}
                        >

                            <Button variant="contained" onClick={updateAndClose}
                            >
                                Save
                            </Button>
                            <Button variant="contained" onClick={deletAndClose}
                                sx={{
                                    ml: '1.5rem'
                                }}
                            >
                                Delete
                            </Button>

                        </Box>

                    </Box>
                </Fade>
            </Modal>
        </div>
    )

}

export default DetailModel;