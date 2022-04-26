import React, {useState, useEffect} from 'react';
import {TextField, Typography, FormGroup, makeStyles, Button } from '@material-ui/core';
import styled from 'styled-components';
import {ArrowDropUp, ArrowDropDown} from '@material-ui/icons';

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
function Firma({
  setArreglo,
  arreglo,
  index,
  modulo,
  handleDelete,
  moveUp,
  moveDown
}) {
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
    }, [index]);

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
          <ArrowButtons>
            <Button 
              onClick = {() => moveDown(index)}
              variante = "outlined"
              className = "btn-arrow">
              <ArrowDropDown/>
            </Button> 
            <Button 
              onClick = {()=> moveUp(index)}
              variante = "outlined"
              className = "btn-arrow">
                <ArrowDropUp/>
            </Button> 
            <Button 
              onClick = {() => handleDelete(index) }
              variante = "outlined"
              className = "btnEliminar">
                X
            </Button> 

          </ArrowButtons>
            <FormGroup className={classes.boxInput}>
                <Typography variant="h6">Firma de:</Typography>
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
const ArrowButtons = styled.div`
  display:flex;
  margin-top:18px;
  justify-content:flex-end;
  background-color: #e3e3e3;
`