import React, {useState, useEffect} from 'react';
import {TextField, Typography, FormGroup, makeStyles, Button } from '@material-ui/core';

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
function Firma({setArreglo, arreglo, index, modulo, handleDelete}) {
    const classes = useStyles();
    const [texto, setTexto] = useState();

    useEffect(()=>{
        
        if(arreglo[index[0]]){
            if(index.length > 1){
                if(arreglo[index[0]][index[1]+1]){
                    setTexto(arreglo[index[0]][index[1]+1].firma);
                    
                }else{
                    setTexto(arreglo[index[0]][index[1]].firma);

                }
            }else{
                setTexto(arreglo[index[0]].firma);
            }
            

        }
    }, []);

    const handleText = e=>{
        const valores = [...arreglo];
        
        if(index.length > 1){
            valores[index[0]][index[1]].firma = e.target.value;

        }else{
            valores[index[0]].firma = e.target.value;

        }

        setTexto(e.target.value);
        setArreglo(valores)
    }
    
    return (
        <div>
            <FormGroup className={classes.boxInput}>
                <Button onClick={() => handleDelete(index)} variante="outlined" className="btnEliminar">X</Button>
                <Typography variante="h3">Firma de:</Typography>
                <TextField 
                    id="textoBase"
                    variant="outlined"
                    name="texto"
                    value={texto}
                    multiline
                    onChange={handleText}
                />
            </FormGroup>
        </div>
    )
}

export default Firma
