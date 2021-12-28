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
function Texto({setArreglo, arreglo, index, modulo, handleDelete}) {
    const classes = useStyles();
    const [texto, setTexto] = useState();
    const [variable, setVariable] = useState();

    useEffect(()=>{
        
        if(arreglo[index[0]]){
            if(modulo === 'socio'){
                if(index.length > 1){
                    if(arreglo[index[0]][index[1]+1]){
                        setTexto(arreglo[index[0]][index[1]+1].socio);    
                        setVariable(arreglo[index[0]][index[1]+1].variable);
                    }else{
                        setTexto(arreglo[index[0]][index[1]].socio);    
                        setVariable(arreglo[index[0]][index[1]].variable);    

                    }
                }else{
                    setTexto(arreglo[index[0]].socio);    
                    setVariable(arreglo[index[0]].variable)    
                }
            }else if(modulo === 'repetir'){
                if(index.length > 1){
                    if(arreglo[index[0]][index[1]+1]){
                        setTexto(arreglo[index[0]][index[1]+1].repetir);    
                        setVariable(arreglo[index[0]][index[1]+1].variable);
                    }else{
                        setTexto(arreglo[index[0]][index[1]].repetir);    
                        setVariable(arreglo[index[0]][index[1]].variable);    

                    }
                }else{
                    setTexto(arreglo[index[0]].repetir);    
                    setVariable(arreglo[index[0]].variable)    
                }
            }else{
                if(index.length > 1){
                    if(arreglo[index[0]][index[1]+1]){
                        setTexto(arreglo[index[0]][index[1]+1].texto);
                        
                    }else{
                        setTexto(arreglo[index[0]][index[1]].texto);

                    }
                }else{
                    setTexto(arreglo[index[0]].texto);
                }
            }

        }
        
    }, []);

    const handleVariable = e => {
        const valores = [...arreglo];
        setVariable(e.target.value)
        if(index.length > 1){
            if(arreglo[index[0]][index[1]+1]){
                valores[index[0]][index[1]+1].variable = e.target.value;
            }else{
                valores[index[0]][index[1]].variable = e.target.value;
            }

        }else{
            valores[index[0]].variable = e.target.value;

        }
        setArreglo(valores)
    }

    const handleText = e=>{
        const valores = [...arreglo];
        if(modulo === 'repetir'){
            if(index.length > 1){
                if(arreglo[index[0]][index[1]+1]){
                    valores[index[0]][index[1]+1].repetir = e.target.value;
                }else{
                    valores[index[0]][index[1]].repetir = e.target.value;
                }
            }else{
                valores[index[0]].repetir = e.target.value;
            }
        }else if(modulo === 'socio'){
            if(index.length > 1){
                if(arreglo[index[0]][index[1]+1]){
                    valores[index[0]][index[1]+1].socio = e.target.value;
                }else{
                    valores[index[0]][index[1]].socio = e.target.value;

                }
    
            }else{
                valores[index[0]].socio = e.target.value;
    
            }

        }else{
            if(index.length > 1){
                if(arreglo[index[0]][index[1]+1]){
                    valores[index[0]][index[1]+1].texto = e.target.value;
                }else{
                    valores[index[0]][index[1]].texto = e.target.value;
                }
    
            }else{
                valores[index[0]].texto = e.target.value;
    
            }

        }
        setTexto(e.target.value);
        setArreglo(valores)
    }
    
    return (
        <div>
            <FormGroup className={classes.boxInput}>
                <Button onClick={() => handleDelete(index)} variante="outlined" className="btnEliminar">X</Button>
                {(modulo === 'repetir' || modulo === 'socio') && (
                    <TextField 
                        id="textoBase"
                        variant="outlined"
                        placeholder="Variable"
                        name="variable"
                        value={variable}
                        onChange={handleVariable}
                    />

                )}
                <Typography variante="h3">Texto</Typography>
                {modulo === 'socio' && (
                    <Typography variante="body2">Este modulo sirve para replicar diferentes socios y sus firmas</Typography>
                )}
                <TextField 
                    id="textoBase"
                    variant="outlined"
                    rows={6}
                    name="texto"
                    value={texto}
                    multiline
                    onChange={handleText}
                />

            </FormGroup>
        </div>
    )
}

export default Texto
