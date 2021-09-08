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
function Texto({setTextoDocumento, textoDocumento, index}) {
    const classes = useStyles();

    const handleText = e=>{
        const valores = [...textoDocumento];
        valores[index][e.target.name] = e.target.value
        setTextoDocumento(valores)
    }

    return (
        <div>
            <FormGroup className={classes.boxInput}>
                <Typography variante="h3">Texto Principal</Typography>
                <TextField 
                    id="textoBase"
                    variant="outlined"
                    rows={6}
                    name="texto"
                    multiline
                    onChange={handleText}
                />
            </FormGroup>
        </div>
    )
}

export default Texto
