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
function Texto({setArreglo, arreglo, index, modulo}) {
    const classes = useStyles();

    const handleText = e=>{
        const valores = [...arreglo];
        if(modulo === 'repetir'){
            if(index.length > 1){
                valores[index[0]][index[1]].repetir = e.target.value;
    
            }else{
                valores[index[0]].repetir = e.target.value;
    
            }

        }else{
            if(index.length > 1){
                valores[index[0]][index[1]].texto = e.target.value;
    
            }else{
                valores[index[0]].texto = e.target.value;
    
            }

        }
        setArreglo(valores)
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
