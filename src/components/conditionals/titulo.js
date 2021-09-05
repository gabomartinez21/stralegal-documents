import React from 'react'
import {TextField, Typography, FormGroup, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    textInput: {
        '& input':{
            padding:'12px 15px!important',
        }
    },
    boxInput:{
        marginTop:theme.spacing(2),
        '& p':{
            margin:'10px 0',
        }
    },
}));
function Texto() {
    const classes = useStyles();
    return (
        <div>
            <FormGroup className={classes.boxInput}>
                <Typography variante="h3">Titulo</Typography>
                <TextField 
                    id="name"
                    type="text"
                    placeholder="Titulo"
                    variant="outlined"
                    className={classes.textInput}
                />
            </FormGroup>
        </div>
    )
}

export default Texto
