/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { TextField, Typography, FormGroup, makeStyles, Button, Checkbox, FormControlLabel } from '@material-ui/core';
import ReactQuill from "react-quill";
import {ArrowDropUp, ArrowDropDown} from '@material-ui/icons';
import styled from 'styled-components'

const useStyles = makeStyles((theme) => ({
  textInput: {
    '& input': {
      padding: '12px 15px!important',
    }
  },
  boxInput: {
    border: "1px solid #dfdfdf",
    borderRadius: 7,
    padding: "9px 5px",
    marginTop: theme.spacing(2),
    '& p': {
      margin: '10px 0',
    }
  },
}));

function Texto({ 
  setArreglo,
  arreglo,
  index,
  modulo,
  handleDelete,
  moveUp,
  moveDown
}) {
  const classes = useStyles();
  const [texto, setTexto] = useState('');
  const [variable, setVariable] = useState();
  const [check, setCheck] = useState(false);


  useEffect(() => {
    if (arreglo[index[0]]) {
      if (modulo === 'socio') {
        if (index.length > 1) {
          if (arreglo[index[0]][index[1] + 1]) {
            setTexto(arreglo[index[0]][index[1] + 1].socio);
            setVariable(arreglo[index[0]][index[1] + 1].variable);
          } else {
            setTexto(arreglo[index[0]][index[1]].socio);
            setVariable(arreglo[index[0]][index[1]].variable);
          }
        } else {
          setTexto(arreglo[index[0]].socio);
          setVariable(arreglo[index[0]].variable)
        }
      } else {
        if (index.length > 1) {
          if (arreglo[index[0]][index[1] + 1]) {
            setTexto(arreglo[index[0]][index[1] + 1].texto);
            setCheck(arreglo[index[0]][index[1] + 1].checked);
          } else {
            setTexto(arreglo[index[0]][index[1]].texto);
            setCheck(arreglo[index[0]][index[1]].checked);

          }
        } else {
          setTexto(arreglo[index[0]].texto);
          setCheck(arreglo[index[0]].checked);
        }
      }
    }
  }, [index]);

  const handleVariable = e => {
    const valores = [...arreglo];
    setVariable(e.target.value)
    if (index.length > 1) {
      if (arreglo[index[0]][index[1] + 1]) {
        valores[index[0]][index[1] + 1].variable = e.target.value;
      } else {
        valores[index[0]][index[1]].variable = e.target.value;
      }

    } else {
      valores[index[0]].variable = e.target.value;

    }
    setArreglo(valores)
  }

  const handleText = value => {
    const valores = [...arreglo];
    if (modulo === 'socio') {
      if (index.length > 1) {
        if (arreglo[index[0]][index[1] + 1]) {
          valores[index[0]][index[1] + 1].socio = value;
        } else {
          valores[index[0]][index[1]].socio = value;
        }
      } else {
        valores[index[0]].socio = value;
      }
    } else {
      if (index.length > 1) {
        if (arreglo[index[0]][index[1] + 1]) {
          valores[index[0]][index[1] + 1].texto = value;
        } else {
          valores[index[0]][index[1]].texto = value;
        }
      } else {
        valores[index[0]].texto = value;
      }
    }
    setTexto(value);
    setArreglo(valores)
  }
  const handleChange = () => {
    setCheck(!check);
    const valores = [...arreglo];
    if (index.length > 1) {
      if (arreglo[index[0]][index[1] + 1]) {
        valores[index[0]][index[1] + 1].checked = !check;
      } else {
        valores[index[0]][index[1]].checked = !check;
      }

    } else {
      valores[index[0]].checked = !check;

    }
    setArreglo(valores)
  }
  return ( 
    <div>
      <ArrowButtons>
        <Button 
          onClick = {() => moveDown(index)}
          variant="outlined"
          className = "btn-arrow">
          <ArrowDropDown/>
        </Button> 
        <Button 
          onClick = {()=> moveUp(index)}
          variant="outlined"
          className = "btn-arrow">
            <ArrowDropUp/>
        </Button> 
        <Button 
          onClick = {() => handleDelete(index) }
          variant="outlined"
          className = "btnEliminar">
            X
        </Button> 

      </ArrowButtons>
      <FormGroup className={classes.boxInput}>
        {(modulo === 'socio') && ( 
          <TextField
            id="textoBase"
            variant="outlined"
            placeholder="Variable"
            name="variable"
            value={ variable }
            onChange={ handleVariable }
          />

        )
      } 
      <Typography variant="h6" > Texto </Typography> 
      {modulo === 'socio' && ( 
        <Typography variant="body2" > Este modulo sirve para replicar diferentes socios y sus firmas </Typography>  
      )} 
      <ReactQuill 
        theme="snow"
        value={ texto }
        onChange={ handleText }
        style={
          {
            minHeight: "300px",
            display: "grid",
            gridTemplateRows: "42px auto"
          }
        }
      /> 
      <div>
      <FormControlLabel 
        control={ 
          <Checkbox 
            checked = { check }
            onChange = { handleChange }
            name = "checkedA" /> 
        }
        label = "Unir con parrafo superior" 
      />

      </div>

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