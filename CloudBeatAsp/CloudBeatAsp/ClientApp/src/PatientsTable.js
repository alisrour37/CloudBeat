import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography, Button} from '@material-ui/core';
import patient from './patient.jpg';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Model from './Model.png'


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);



const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    image: {
        backgroundImage: `url(${patient})`,
       
        minHeight:'100%',
        height:'100vh',
        display:'block'
     }
});

export default function PatientsTable() {
    const classes = useStyles();
    const [patients, setPatients] = useState([])
    const [patientId, setpatientId] = useState(false)
    const [view, setview] = useState(false)
    const [events, setEvents] = useState([])
    
    useEffect(() => {
        axios.get("https://localhost:5001/api/event/"+patientId)
    .then(res=>{
        
        setEvents(res.data)
    });
    }, [])


    const answers = () =>{
    return (
        <div style={{backgroundColor:'white', width:'80%'}}>
    <Typography >Question 1: I would use Database indexing which helps in searching much faster, but still has a downside which is the inclusion of new indices for elements that didn't exist previously in the database</Typography> 
    <Typography >Question 2: I would go for Database indexing which helps in searching</Typography>
    <Typography>Question 3: Software Architecture</Typography>
    <img src = {Model} ></img>
    </div>)  
};
   

   const heartrategraph = () =>{
       
    
   }
   const viewanswers = () =>{
       setview(!view);
   }
    return (
       
        <div className={classes.image}>
        <Typography variant="h4" style={{color:'black',fontFamily:'Ubuntu', marginBottom:'20px'}}>Click on a row to check patient information</Typography>
       
        <TableContainer component={Paper} style ={{width:'70%', marginLeft:'200px',marginTop:'50px'}}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow >
                        <StyledTableCell>Patient ID</StyledTableCell>
                        <StyledTableCell align="right">Name</StyledTableCell>
                        <StyledTableCell align="right">Date of Birth</StyledTableCell>
                        <StyledTableCell align="right">Study Start Date</StyledTableCell>
                        <StyledTableCell align="right">Study End Date</StyledTableCell>
                        <StyledTableCell align="right">Device Serial Number</StyledTableCell>
                        <StyledTableCell align="right">Total Number of Events</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {patients.map((patient) => (
                        <StyledTableRow key={patient.patientId} onClick={()=>setpatientId(patient.patientId)}>
                            <StyledTableCell component="th" scope="row">
                                {patient.patientId}
                            </StyledTableCell>
                            <StyledTableCell align="right">{patient.name}</StyledTableCell>
                            <StyledTableCell align="right">{patient.dateOfBirth}</StyledTableCell>
                            <StyledTableCell align="right">{patient.studyStartTime}</StyledTableCell>
                            <StyledTableCell align="right">{patient.studyEndTime}</StyledTableCell>
                            <StyledTableCell align="right">{patient.deviceSerialNumber}</StyledTableCell>
                            <StyledTableCell align="right">{patient.numberOfEvents}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        {patientId ? 
        heartrategraph() : null
        }
        <div style={{marginLeft:'200px', marginTop:'50px'}}>
        <Button   onClick={()=> viewanswers()} variant="contained">View Answers</Button>
        {view ? answers() : null}
 </div>
 </div>
    );
}