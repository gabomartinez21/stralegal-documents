import React, {useState, useEffect} from 'react';
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
function Texto({setArreglo, arreglo,index}) {
    const classes = useStyles();
    const [titulo, setTitulo] = useState('');

    useEffect(() => {
        if(index.length > 1){
            setTitulo(arreglo[index[0]][index[1]].titulo);
            
        }else{
            setTitulo(arreglo[index[0]].titulo);
        }
    }, [])

    const handleTitulo = e=>{
        const valores = [...arreglo];
        if(index.length > 1){
            valores[index[0]][index[1]].titulo = e.target.value
            
        }else{
            valores[index[0]].titulo = e.target.value
        }
        setArreglo(valores)
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
                    value={titulo}
                    className={classes.textInput}
                    onChange={handleTitulo}
                />
            </FormGroup>
        </div>
    )
}

export default Texto
