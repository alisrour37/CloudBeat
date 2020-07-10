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
import Model from './Model.png';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


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
    const [patientName,setPatientName] = useState()
    const [minheartrate, setminheartrate] = useState([])
    const [avgheartrate, setavgheartrate] = useState([])
    const [maxheartrate, setmaxheartrate] = useState([])
    useEffect(() => {
       
    axios.get("https://localhost:5001/api/patient")
    .then(res=>{
        
        setPatients(res.data)
    });
    
    }, [])

    const options = {
        chart: {
          type: 'spline'
        },
        title: {
          text: patientName
        },
        series: [
            {
                name:'Minimum Heart Rate',
                data: minheartrate
              }, 
              {
                name:'Average Heart Rate',
                data: avgheartrate
              },
              {
                name:'Maximum Heart Rate',
                data: maxheartrate
              }      ],
              yAxis: {
                
                title: {
                    text: 'Heart Rate (BPM)'
                }
            },
      };
    const answers = () =>{
    return (
        <div style={{backgroundColor:'white', width:'80%'}}>
    <Typography >Question 1: I would use Database indexing which helps in searching much faster, but still has a downside which is the inclusion of new indices for elements that didn't exist previously in the database</Typography> 
    <Typography >Question 2: select p.Name, count(e.PatientId) as NumberofEvents
    from Patients as p, Events as e
    Where p.PatientId = e.PatientId
    Group By p.Name,p.PatientId
    Order By p.Name desc;</Typography>
    <Typography>Question 3: Software Architecture</Typography>
    <img src = {Model} ></img>
    </div>)  
};
   const getevents = (id,name) =>{
    setpatientId(!patientId)
    setPatientName(name) 
    axios.get("https://localhost:5001/api/event/"+id)
    .then(res=>{
        const minheart= []
        const avgheart=[]
        const maxheart=[]
        res.data.map((event)=>{
        minheart.push(event.heartRateMin);
        avgheart.push(event.heartRateAvg);
        maxheart.push(event.heartRateMax);
        });
        setminheartrate(minheart)
        setavgheartrate(avgheart)
        setmaxheartrate(maxheart)

    });
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
                        <StyledTableRow key={patient.patientId} onClick={()=>getevents(patient.patientId,patient.name)}>
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
            <div style={{width:'80%',marginTop:'30px', marginLeft:'200px'}}>
        <HighchartsReact  options={options} highcharts={Highcharts}/> 
        </div>
        : null
        }
        <div style={{marginLeft:'200px', marginTop:'50px'}}>
        <Button   onClick={()=> viewanswers()} variant="contained">View Answers</Button>
        {view ? answers() : null}
 </div>
 </div>
    );
}