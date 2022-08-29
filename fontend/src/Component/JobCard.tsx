import React from "react";
import { Box, Paper, Typography } from "@mui/material"
import { Card } from "../Type";

const JobCard: React.FC<Card> = ({ id, state, create_Time, handleOpen }) => {

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    height: 128,
                },
                transition: "all 0.7s",
                '&:hover': {
                    transform: "translateY(-0.8rem)",
                    boxShadow: 5,
                    cursor: "pointer"
                }
            }}
            onClick={() => handleOpen(id)}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: "0.6rem",
                    bgcolor: "primary.light",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    pl: "1.5rem"
                }}
            >
                <Typography variant="body2" color="text.secondary" >
                    <strong>Id</strong>: {id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>State</strong>: {state}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Create Time</strong> : {create_Time}
                </Typography>
            </Paper>
        </Box>
    )

}

export default JobCard;