/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import {
  TextField,
  Typography,
  FormGroup,
  makeStyles,
  MenuItem,
  FormControl,
  Select,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core';
import {ArrowDropUp, ArrowDropDown} from '@material-ui/icons';
import Texto from './texto'
import Titulo from './titulo'
import Firma from './firma'
import Repetir from './repetir'
import styled from 'styled-components'

const useStyles = makeStyles((theme) => ({
  accordion: {
    marginTop: "1.5rem",
    "& .MuiAccordionDetails-root": {
      display: 'block'
    },
    "&.MuiAccordion-root.Mui-expanded": {
      marginTop: "0",

    }
  },
  textInput: {
    '& input': {
      padding: '12px 15px!important',
    }
  },
  addCondition: {
    width: '50%',
    maxWidth: '400px'
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

function Condicional({ 
  setArreglo,
  arreglo,
  index,
  handleDelete,
  handleDuplicate,
  moduleParent,
  setModuleParent,
  moveUp,
  moveDown
}) {
  const classes = useStyles();
  const [moduleType, setModuleType] = useState([
    [],
    []
  ]);
  const [expanded, setExpanded] = useState('panel0');
  const [condicional, setCondicional] = useState([
    [{ tituloCond: "" }],
    [{ tituloCond: "" }]
  ])
  const [firstTime, setFirstTime] = useState(true);
  const [deleteActive, setDeleteActive] = useState(false);
  // console.log(condicional)

  // console.log(index)
  useEffect(() => {

    if (firstTime) {
      if (arreglo[index[0]]) {

        if (index.length > 1) {
          if (arreglo[index[0]][index[1] + 1]) {
            setCondicional(arreglo[index[0]][index[1] + 1].condicion);
          } else {
            setCondicional(arreglo[index[0]][index[1]].condicion);
          }
        } else {
          setCondicional(arreglo[index[0]].condicion);
        }
      }
      setFirstTime(false)
    } else {
      if (!deleteActive) {
        const copyTextoDocumento = [...arreglo];
        if (index.length > 1) {
          if (arreglo[index[0]][index[1] + 1]) {
            copyTextoDocumento[index[0]][index[1] + 1].condicion = condicional
          } else {
            copyTextoDocumento[index[0]][index[1]].condicion = condicional
          }

        } else {

          if (copyTextoDocumento[index[0]]) {
            copyTextoDocumento[index[0]].condicion = condicional
          }
        }
        setArreglo(copyTextoDocumento)
      }
      setDeleteActive(false);
    }
  }, [condicional]);

  const getModules = () => {

    const modulesNew = [];
    if (index.length > 1) {
      if (arreglo[index[0]][index[1] + 1] && arreglo[index[0]][index[1] + 1].condicion !== undefined) {
        arreglo[index[0]][index[1] + 1].condicion.forEach((module) => {
          const modulesDB = [];
          module.forEach((random) => {
            if (random.texto !== undefined) {
              modulesDB.push('texto');
            } else if (random.condicion !== undefined) {
              modulesDB.push('condicion');
            } else if (random.titulo !== undefined) {
              modulesDB.push("titulo");
            } else if (random.repetir !== undefined) {
              modulesDB.push('repetir');
            }

          })
          modulesNew.push(modulesDB)
        })
        setModuleType(modulesNew);

      } else {

        if (arreglo[index[0]][index[1]].condicion !== undefined) {
          arreglo[index[0]][index[1]].condicion.forEach((module) => {
            const modulesDB = [];
            module.forEach((random) => {
              if (random.texto !== undefined) {
                modulesDB.push('texto');
              } else if (random.condicion !== undefined) {
                modulesDB.push('condicion');
              } else if (random.titulo !== undefined) {
                modulesDB.push("titulo");
              } else if (random.repetir !== undefined) {
                modulesDB.push('repetir');
              }

            })
            modulesNew.push(modulesDB)
          })
          setModuleType(modulesNew);

        }
      }
    } else {
      if (arreglo[index[0]] && arreglo[index[0]].condicion !== undefined) {
        arreglo[index].condicion.forEach((module) => {
          const modulesDB = [];
          module.forEach((random) => {
            if (random.texto !== undefined) {
              modulesDB.push('texto');
            } else if (random.condicion !== undefined) {
              modulesDB.push('condicion');
            } else if (random.titulo !== undefined) {
              modulesDB.push("titulo");
            } else if (random.repetir !== undefined) {
              modulesDB.push('repetir');
            }

          })
          modulesNew.push(modulesDB)
        })
        setModuleType(modulesNew);
      }
    }
  }

  useEffect(() => {
    getModules();
  }, [])


  const handleAddModule = (pos, type) => {
    let modulo;
    switch (type) {
      case 'texto':
        modulo = [...condicional[pos]]
        modulo.push({ texto: '', checked: false });
        const condicionTexto = [...condicional]
        condicionTexto[pos] = modulo;
        setCondicional(condicionTexto)
        break;
      case 'repetir':
        modulo = [...condicional[pos]]
        modulo.push({
          repetir: [{
            variable: ''
          }]
        });
        const condicionRepetir = [...condicional]
        condicionRepetir[pos] = modulo;
        setCondicional(condicionRepetir)
        break;
      case 'socio':
        modulo = [...condicional[pos]]
        modulo.push({ repetir: '' });
        const condicionSocio = [...condicional]
        condicionSocio[pos] = modulo;
        setCondicional(condicionSocio)
        break;
      case 'titulo':
        modulo = [...condicional[pos]]
        modulo.push({ titulo: '' });
        const condicionTitulo = [...condicional]
        condicionTitulo[pos] = modulo;
        setCondicional(condicionTitulo)
        break;
      case 'firma':
        modulo = [...condicional[pos]]
        modulo.push({ firma: '' });
        const condicionFirma = [...condicional]
        condicionFirma[pos] = modulo;
        setCondicional(condicionFirma)
        break;
      case 'condicion':
        modulo = [...condicional[pos]]
        modulo.push({
          condicion: [
            [{ tituloCond: "" }],
            [{ tituloCond: "" }]
          ]
        });
        const condicionCondicion = [...condicional]

        condicionCondicion[pos] = modulo;
        setCondicional(condicionCondicion)
        break;
      default:
        break;
    }
  }

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleTitle = (e, modulo, ind) => {
    modulo[0].tituloCond = e.target.value;
    const condicionNueva = [...condicional]
    condicionNueva[ind] = modulo;
    setCondicional(condicionNueva)
  }
  const handleAddCondition = () => {
    setCondicional([...condicional, [{ tituloCond: "" }]])
    setModuleType([...moduleType, []])
  }
  const handleDeleteCondition = (indexCond) => {
    const newConditions = condicional.filter((cond, i) => i !== indexCond);
    setCondicional(newConditions);
  }

  const handleAgregar = (e, ind) => {
    const moduleCopy = [...moduleType];
    handleAddModule(ind, e.target.value);
    moduleCopy[ind].push(e.target.value);
    setModuleType(moduleCopy)
  }

  const handleDeleteModule = (indexMod, indexCond) => {
    const moduleTypeCopy = [...moduleType];
    const moduleCopy = moduleType[indexMod[0]].filter((mod, i) => i !== indexMod[1]);
    const condicionalCopy = [...condicional];
    const newCondicionalCopy = condicionalCopy[indexMod[0]].filter((cond, i) => i !== (indexMod[1] + 1))
    condicionalCopy[indexMod[0]] = newCondicionalCopy
    moduleTypeCopy[indexMod[0]] = moduleCopy;
    setCondicional(condicionalCopy)
    setModuleType(moduleTypeCopy)
  }

  const handleDuplicateCond = (index) => {
    const moduleCopy = [...moduleParent];
    const textoDocumentoCopy = [...arreglo];

    const newModule = [
      [],
      []
    ];
    const newTextoDocumento = [];
    moduleCopy[index[0]].forEach((mod, i) => {
      if (i === index[1]) {
        newModule[index[0]].push(mod)
        newModule[index[0]].push(mod)
      } else {
        newModule[index[0]].push(mod)
      }
    })
    textoDocumentoCopy[index[0]].forEach((textoDoc, i) => {
      if (i === index[1] + 1) {
        newTextoDocumento.push(textoDoc)
        newTextoDocumento.push(textoDoc)
      } else {
        newTextoDocumento.push(textoDoc)
      }
    })

    setDeleteActive(true);
    setArreglo(newTextoDocumento)
    setModuleParent(newModule);
  }
  
  const downPosition = (indexCod) => {
    const moduleCopy = [...moduleType];
    const textCopy = [...condicional];

    if(indexCod[1]+1 < moduleCopy[indexCod[0]].length && indexCod[1]+1 <= textCopy[indexCod[0]].length-1){
      const auxMod = moduleCopy[indexCod[0]][indexCod[1]+1];
      const auxText = textCopy[indexCod[0]][indexCod[1]+2];
      //cambio en el modulo
      moduleCopy[indexCod[0]][indexCod[1]+1] = moduleCopy[indexCod[0]][indexCod[1]] 
      moduleCopy[indexCod[0]][indexCod[1]] = auxMod;
      // cambio en el texto 
      textCopy[indexCod[0]][indexCod[1]+2] = textCopy[indexCod[0]][indexCod[1]+1] 
      textCopy[indexCod[0]][indexCod[1]+1] = auxText; 
      setModuleType(moduleCopy)
      setCondicional(textCopy)
    }
  }
  const upPosition = (indexCod) => {
    const moduleCopy = [...moduleType];
    const textCopy = [...condicional];
    
    if(indexCod[1]-1 >= 0){
      const auxMod = moduleCopy[indexCod[0]][indexCod[1]-1];
      const auxText = textCopy[indexCod[0]][indexCod[1]+1];
      // cambio en el modulo
      moduleCopy[indexCod[0]][indexCod[1]-1] = moduleCopy[indexCod[0]][indexCod[1]]; 
      moduleCopy[indexCod[0]][indexCod[1]] = auxMod;
      // cambio en el texto 
      textCopy[indexCod[0]][indexCod[1]+1] = textCopy[indexCod[0]][indexCod[1]];
      textCopy[indexCod[0]][indexCod[1]] = auxText; 
      
      setModuleType(moduleCopy)
      setCondicional(textCopy)
    }

  }

  return ( 
    <div>
      <ArrowButtons>
        <Button 
          key={Math.random() * 550}
          onClick = {() => moveDown(index)}
          variant="outlined"
          className = "btn-arrow">
          <ArrowDropDown/>
        </Button> 
        <Button 
          key={Math.random() * 550}
          onClick={()=> moveUp(index)}
          variant="outlined"
          className="btn-arrow">
            <ArrowDropUp/>
        </Button> 
        <Button 
          key={Math.random() * 550}
          onClick={() => handleDelete(index) }
          variant="outlined"
          className="btnEliminar">
            X
        </Button> 

      </ArrowButtons>
      {condicional.map((moduleCond, i) => ( 
        <Accordion 
          className={classes.accordion}
          square expanded={expanded === `panel${i}`}
          onChange={handleChange(`panel${i}`)}>
          <AccordionSummary aria-controls={ `panel${i}d-content` } id= {`panel${i}d-header`} >
            <Typography > Condicion { i + 1 } </Typography> </AccordionSummary> <AccordionDetails >
            <div className = "row" >
              <FormGroup className = { classes.boxInput }>
                <Typography variant="h6"> Variable Condici??n </Typography> 
                <TextField 
                  id = "name"
                  type = "text"
                  placeholder = "Titulo"
                  value = { moduleCond[0].tituloCond }
                  onChange = {(e) => handleTitle(e, moduleCond, i) }
                  variant = "outlined"
                  className = { classes.textInput }
                  helperText = "Introduce el valor de la respuesta a la condici??n de las variables"
                />
              </FormGroup> 
            </div> 
            <div className = "condicionales" > {
              React.Children.toArray(
                moduleType[i].map((type, indexC) => {
                  if (type === 'condicion') {
                    return <Condicional
                      setArreglo = { setCondicional }
                      arreglo = { condicional }
                      index = {
                        [i, indexC] }
                      handleDelete = { handleDeleteModule }
                      moduleParent = { moduleType }
                      setModuleParent = { setModuleType }
                      moveUp={upPosition}
                    moveDown={downPosition}
                    />
                  }
                  if (type === 'titulo') {
                    return <Titulo
                      setArreglo = { setCondicional }
                      arreglo = { condicional }
                      index = {
                        [i, indexC] }
                      handleDelete = { handleDeleteModule }
                      moveUp={upPosition}
                      moveDown={downPosition}
                    />
                  }
                  if (type === 'texto') {
                    return <Texto
                      setArreglo = { setCondicional }
                      arreglo = { condicional }
                      index = {
                        [i, indexC] }
                      handleDelete = { handleDeleteModule }
                      moveUp={upPosition}
                      moveDown={downPosition}
                    />
                  }
                  if (type === 'repetir') {
                    return <Repetir
                      setArreglo = { setCondicional }
                      arreglo = { condicional }
                      index = {
                        [i, indexC] }
                      handleDelete = { handleDeleteModule }
                      moveUp={upPosition}
                      moveDown={downPosition}
                    />
                  }
                  if (type === 'socio') {
                    return <Texto
                      setArreglo = { setCondicional }
                      arreglo = { condicional }
                      index = {
                        [i, indexC] }
                      modulo = "socio"
                      handleDelete = { handleDeleteModule }
                      moveUp={upPosition}
                      moveDown={downPosition}
                    />
                  }
                  if (type === 'firma') {
                    return <Firma
                      setArreglo = { setCondicional }
                      arreglo = { condicional }
                      index = {
                        [i, indexC] }
                      handleDelete = { handleDeleteModule }
                      moveUp={upPosition}
                      moveDown={downPosition}
                    />
                  }
                  return null;
                })
              )
            } 
            </div> 
            <FormGroup className = { classes.boxInput } >
              <FormControl className = { classes.addCondition } >
              <p> Agregar los elementos necesarios para la condici??n </p> 
                <Select 
                  id = "demo-simple-select"
                  value = ""
                  onChange = {(e) => handleAgregar(e, i) }
                >
                  <MenuItem value = "" disabled > Agregar modulo </MenuItem>
                  <MenuItem value = "condicion" > Condicional </MenuItem>
                  <MenuItem value = "texto" > Texto </MenuItem>
                  <MenuItem value = "titulo" > Titulo Documento </MenuItem>
                  <MenuItem value = "repetir" > Modulo repetitivo </MenuItem>
                  <MenuItem value = "socio" > Socio </MenuItem> 
                  <MenuItem value = "firma" > Firma </MenuItem> 
                </Select> 
              </FormControl> 
            </FormGroup> 
            <Button onClick = {() => handleDeleteCondition(i) }
              style={{ marginTop: "20px", background: "red", color: "#fff" } } >
              Eliminar 
            </Button>

          </AccordionDetails> 
        </Accordion>
      ))
    } 
    <Button onClick = { handleAddCondition }
    variant = "outlined"
    style = {
      { marginTop: "20px", border: "1px solid #1c739c", color: "#1c739c" } } >
      Agregar Condicion 
    </Button> 
    {index.length > 1 ? ( 
      <Button onClick = {() => handleDuplicateCond(index) }
        variant = "outlined"
        style={
          { marginTop: "20px", backgroundColor: "#1c739c", marginLeft: "20px", color: "white" } } >
        Duplicar </Button>
      ) : ( <Button onClick = {
          () => handleDuplicate(index) }
        variant = "outlined"
        style = {
          { marginTop: "20px", backgroundColor: "#1c739c", marginLeft: "20px", color: "white" } } >
        Duplicar </Button>
      )
    }

    </div>
  )
}

export default Condicional


const ArrowButtons = styled.div`
  display:flex;
  margin-top:18px;
  justify-content:flex-end;
  background-color: #e3e3e3;
`