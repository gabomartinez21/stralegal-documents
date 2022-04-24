import React, {useState, useEffect} from 'react';
import {TextField, Typography, FormGroup, makeStyles, Button } from '@material-ui/core';
import {ArrowDropUp, ArrowDropDown} from '@material-ui/icons';
import styled from 'styled-components'

const useStyles = makeStyles((theme) => ({
    textInput: {
        '& input':{
            padding:'12px 15px!important',
        }
    },
    boxInput:{
      border: "1px solid #dfdfdf",
      borderRadius: 7,
      padding: "9px 5px",
      marginTop:theme.spacing(2),
      '& p':{
          margin:'10px 0',
      }
    },
}));
function Texto({
  setArreglo,
  arreglo,
  index,
  handleDelete,
  moveUp,
  moveDown
}) {
    const classes = useStyles();
    const [titulo, setTitulo] = useState('');
    useEffect(() => {
        if(arreglo[index[0]]){
            if(index.length > 1){
                if(arreglo[index[0]][index[1]+1]){
                    setTitulo(arreglo[index[0]][index[1]+1].titulo);
                    
                }else{
                    setTitulo(arreglo[index[0]][index[1]].titulo);

                }
                
            }else{
                setTitulo(arreglo[index[0]].titulo);
            }

        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleTitulo = e=>{
        const valores = [...arreglo];
        setTitulo(e.target.value);
        if(index.length > 1){
            if(arreglo[index[0]][index[1]+1]){
                valores[index[0]][index[1]+1].titulo = e.target.value;
                
            }else{
                valores[index[0]][index[1]].titulo = e.target.value;

            }
        }else{
            valores[index[0]].titulo = e.target.value;
        }
        setArreglo(valores);
    }
    return (
        <div>
          <ArrowButtons>
            <Button 
              onClick = {() => moveDown(index)}
              variant = "outlined"
              className = "btn-arrow">
              <ArrowDropDown/>
            </Button> 
            <Button 
              onClick = {()=> moveUp(index)}
              variant = "outlined"
              className = "btn-arrow">
                <ArrowDropUp/>
            </Button> 
            <Button 
              onClick = {() => handleDelete(index) }
              variant = "outlined"
              className = "btnEliminar">
                X
            </Button> 

          </ArrowButtons>
            <FormGroup className={classes.boxInput}>
              <Typography variant="h6">Titulo</Typography>
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

const ArrowButtons = styled.div`
  display:flex;
  margin-top:18px;
  justify-content:flex-end;
  background-color: #e3e3e3;
`
