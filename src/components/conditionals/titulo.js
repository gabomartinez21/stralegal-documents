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
function Texto({setTextoDocumento, textoDocumento,index}) {
    const classes = useStyles();

    const handleTitulo = e=>{
        const valores = [...textoDocumento];
        valores[index][e.target.name] = e.target.value
        setTextoDocumento(valores)
    }
    return (
        <div>
            <FormGroup className={classes.boxInput}>
                <Typography variante="h3">Titulo</Typography>
                <TextField 
                    name="titulo"
                    type="text"
                    placeholder="Titulo"
                    variant="outlined"
                    className={classes.textInput}
                    onChange={handleTitulo}
                />
            </FormGroup>
        </div>
    )
}

export default Texto
