import { Box, Button, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import JobCard from "./Component/JobCard"
import { Props, DetailCard } from "./Type"
import { useEffect, useState } from "react";
import CardModel from "./Component/CardModel";
import axios from "axios"
import { constants } from "./constants"
import DetailModel from "./Component/DetailModel";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function App() {

  const [openForNewCard, setOpenForNewCard] = useState(false);
  const [openForDetailCard, setOpenForDetailCard] = useState(false);
  const [jobList, setJobList] = useState<DetailCard[]>([]);
  const [isAscend, setIsAscend] = useState<Boolean>(true);
  const [curId, setCurId] = useState<number>(0);
  const [state, setState] = useState("All");

  const handleCloseForNewCard = () => {
    setOpenForNewCard(false);
  }

  const handleCloseForDetailCard = () => {
    setOpenForDetailCard(false);
  }

  const fetchData = async () => {
    return await axios.get(`${constants.backend}` + "GetJobByState/" + `${state}`);
  }

  useEffect(() => {
    fetchData().then(res => {
      setJobList(res.data);
      setIsAscend(true);
    });
  }, [openForNewCard || openForDetailCard || state])

  const closeForNewCard: Props = {
    open: openForNewCard,
    handleClose: handleCloseForNewCard,
    id: curId
  }

  const closeForDetailCard: Props = {
    open: openForDetailCard,
    handleClose: handleCloseForDetailCard,
    id: curId
  }

  const sortByDescendId = () => {
    let temp: DetailCard[] = jobList?.sort((x1, x2) => x2.id - x1.id);
    setJobList([...temp]);
    setIsAscend(false);
  }

  const sortByAscendId = () => {
    let temp: DetailCard[] = jobList?.sort((x1, x2) => x1.id - x2.id);
    setJobList([...temp]);
    setIsAscend(true);
  }


  return (
    <Box sx={{
      width: "100vw",
      height: "150vh",
      display: "flex",
      justifyContent: "center"
    }}>
      <Box
        sx={{
          marginTop: "3vh",
          width: '80vw',
          display: "flex",
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={800} fontSize={"2.4rem"} color={"primary.main"}>
            Your job list!
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{
            alignSelf: "flex-end"
          }}
          onClick={() => {
            setOpenForNewCard(true);
          }}
        >
          Create new Job
        </Button>

        <Box sx={{ alignSelf: "flex-end", marginTop: '2rem' }}>
          {
            isAscend ? <Button variant="contained" onClick={sortByDescendId} startIcon={<ArrowDownwardIcon />}>ID</Button> :
              <Button variant="contained" onClick={sortByAscendId} startIcon={<ArrowUpwardIcon />}>ID</Button>

          }
        </Box>

        <Box sx={{ alignSelf: "flex-start", marginTop: "-2.5rem" }}>
          {
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small" color="secondary" >state</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={state}
                label="state"
                onChange={(e) => setState(e.target.value)}
                renderValue={() => `${state}`}
                sx={{ bgcolor: "primary.main" }}
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"active"}>active</MenuItem>
                <MenuItem value={"scheduled"}>scheduled</MenuItem>
                <MenuItem value={"invoicing"}>invoicing</MenuItem>
                <MenuItem value={"to priced"}>to priced</MenuItem>
                <MenuItem value={"completed"}>completed</MenuItem>
              </Select>
            </FormControl>

          }
        </Box>


        <Grid
          container
          spacing={3}
          sx={{
            mt: "2vh",
          }}
        >
          {jobList &&
            jobList.map((item: DetailCard, index: number) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <JobCard {...item} handleOpen={(id) => { setOpenForDetailCard(true); setCurId(id) }} />
                </Grid>
              );
            })}
        </Grid>
      </Box>
      {
        openForNewCard ? <CardModel {...closeForNewCard} /> : null
      }
      {
        openForDetailCard ? <DetailModel {...closeForDetailCard} /> : null
      }
    </Box>
  );
}

export default App;
