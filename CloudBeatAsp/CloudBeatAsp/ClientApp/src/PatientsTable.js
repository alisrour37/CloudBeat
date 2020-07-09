import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import patient from './patient.jpg';
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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 2, 2),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 2, 2),
    createData('Eclair', 262, 16.0, 24, 6.0, 2, 2),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2, 2),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 2, 2),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2, 2),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 2, 2),
];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    image: {
        backgroundImage: `url(${patient})`,
        backgroundRepeat: "no-repeat",
    height:'100vh',
    backgroundSize: "cover",
    backgroundPosition: "center",
    }
});

export default function PatientsTable() {
    const classes = useStyles();

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
                    {rows.map((row) => (
                        <StyledTableRow key={row.name} onClick={()=>console.log('batataaa')}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.calories}</StyledTableCell>
                            <StyledTableCell align="right">{row.fat}</StyledTableCell>
                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                            <StyledTableCell align="right">{row.protein}</StyledTableCell>
                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                            <StyledTableCell align="right">{row.protein}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
 </div>
    );
}