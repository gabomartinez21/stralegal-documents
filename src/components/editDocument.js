/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import {
  Select,
  FormControl,
  MenuItem,
  TextField,
  Typography,
  Button,
  FormGroup,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Texto from './conditionals/texto'
import Condicional from './conditionals/condicional'
import Titulo from './conditionals/titulo';
import Firma from './conditionals/firma';
import Repetir from './conditionals/repetir';

import { useSnackbar } from 'notistack';
import { URLSERVER } from '../config';
import ModuloExtra from './moduloExtra';

const useStyles = makeStyles((theme) => ({
  textInput: {
    '& input': {
      padding: '12px 15px!important',
    }
  },
  boxInput: {
    marginTop: theme.spacing(2),
    '& p': {
      margin: '10px 0',
    }
  },
  addCondition: {
    width: '50%',
    maxWidth: '400px'
  },
  btnSubmit: {
    background: '#1c739c',
    marginTop: '2rem'
  }
}));

function EditDocument() {
  const { id } = useParams();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [titulo, setTitulo] = useState('');
  const [textoDocumento, setTextoDocumento] = useState([]);
  const [moduleType, setModuleType] = useState(['']);
  const [deleteActive, setDeleteActive] = useState(false);

  const getDocument = async() => {

    const res = await axios.get(`${URLSERVER}/admin/v1/documentos.php?documentos=${id}`);
    const tituloBD = res.data.body[0].titulo_doc;
    setTitulo(tituloBD);
    const textoDB = JSON.parse(res.data.body[0].texto_doc);
    setTextoDocumento(textoDB);
    const modulesDB = [];
    textoDB.forEach(module => {
      if (module.texto !== undefined) {
        modulesDB.push('texto');
      } else if (module.condicion !== undefined) {
        modulesDB.push('condicional');
      } else if (module.titulo !== undefined) {
        modulesDB.push("titulo");
      } else if (module.repetir !== undefined) {
        modulesDB.push('repetir');
      } else if (module.firma !== undefined) {
        modulesDB.push('firma');
      }
    })
    setModuleType(modulesDB);
  }
  useEffect(() => {
    getDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(() => {
    setDeleteActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleType])

  const enviarDatos = async(data) => {
    const body = {
      'id': id,
      'titulo_doc': data.titulo,
      'texto_doc': JSON.stringify(data.textoDocumento),
      'type': 'actualizar'
    }
    console.log(body)
    const res = await axios.post(`${URLSERVER}/admin/v1/documentos.php`, JSON.stringify(body))
    console.log(res)  
    if (res.data.ok) {
      enqueueSnackbar('Tu documento se actualizo satisfactoriamente', {
        variant: 'success',
      });
    } else {
      enqueueSnackbar('Ha ocurrido un error, intentalo de nuevo', {
        variant: 'error',
      });
    }

  }

  const handleDeleteModule = (indexMod) => {
    const moduleCopy = moduleType.filter((mod, i) => i !== indexMod[0]);
    const textoCopy = textoDocumento.filter((text, i) => i !== indexMod[0]);

    setDeleteActive(true)
    setModuleType(moduleCopy);
    setTextoDocumento(textoCopy);
  }

  const handleDuplicate = (index) => {
    const moduleCopy = [...moduleType];
    const textoDocumentoCopy = [...textoDocumento];
    const newModule = [];
    const newTextoDocumento = [];
    moduleCopy.forEach((mod, i) => {
      if (i === index[0]) {
        newModule.push(mod)
        newModule.push(mod)
      } else {
        newModule.push(mod)
      }
    })
    textoDocumentoCopy.forEach((textoDoc, i) => {
      if (i === index[0]) {
        newTextoDocumento.push(textoDoc)
        newTextoDocumento.push(textoDoc)

      } else {
        newTextoDocumento.push(textoDoc)
      }
    })

    setDeleteActive(true);
    setModuleType(newModule);
    setTextoDocumento(newTextoDocumento)
  }
  const handleAddModule = (e) => {
    setModuleType([...moduleType, e.target.value]);
    if (e.target.value === 'condicional') {
      setTextoDocumento([...textoDocumento, {
        condicion: [
          [{ tituloCond: "" }],
          [{ tituloCond: "" }]
        ]
      }])

    }
    if (e.target.value === 'repetir') {
      setTextoDocumento([...textoDocumento, {
        repetir: [{
          variables: ''
        }],
      }])
    }
    if (e.target.value === 'texto') {
      setTextoDocumento([...textoDocumento, {
        texto: '',
        checked: false
      }])
    }
    if (e.target.value === 'firma') {
      setTextoDocumento([...textoDocumento, {
        firma: ''
      }])
    }
    if (e.target.value === 'titulo') {
      setTextoDocumento([...textoDocumento, {
        titulo: ''
      }])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    enviarDatos({
      titulo,
      textoDocumento
    })

  }

  const downPosition = (index) => {
    const moduleCopy = [...moduleType];
    const textCopy = [...textoDocumento];
    if(index[0]+1 <= moduleCopy.length && index[0]+1 <= textCopy.length){
      const auxMod = moduleCopy[index[0]+1];
      const auxText = textCopy[index[0]+1];
      //cambio en el modulo
      moduleCopy[index[0]+1] = moduleCopy[index[0]] 
      moduleCopy[index[0]] = auxMod;
      // cambio en el texto 
      textCopy[index[0]+1] = textCopy[index[0]] 
      textCopy[index[0]] = auxText; 

      setModuleType(moduleCopy)
      setTextoDocumento(textCopy)
    }
  }
  const upPosition = (index) => {
    const moduleCopy = [...moduleType];
    const textCopy = [...textoDocumento];
    console.log(textCopy);
    console.log(index);
    if(index[0]-1 >= 0){
      const auxMod = moduleCopy[index[0]-1];
      const auxText = textCopy[index[0]-1];
      console.log(auxMod)
      console.log(textCopy[index[0]] )
      //cambio en el modulo
      moduleCopy[index[0]-1] = moduleCopy[index[0]] 
      moduleCopy[index[0]] = auxMod;
      // cambio en el texto 
      textCopy[index[0]-1] = textCopy[index[0]] 
      textCopy[index[0]] = auxText; 

      setModuleType(moduleCopy)
      setTextoDocumento(textCopy)
    }

  }

  return ( 
    <div>
      <h1> Editar documento </h1>

      <form 
        id = "listado-form"
        method = "post"
        onSubmit = { handleSubmit } >
        <div className = "row" >
          <FormGroup className = { classes.boxInput } >
            <Typography variant="h5"> Titulo del Documento </Typography> 
            <TextField type = "text"
              placeholder = "Titulo"
              variant = "outlined"
              value = { titulo }
              onChange = { e => setTitulo(e.target.value) }
              className = { classes.textInput }/>
          </FormGroup>
        </div>
        <div className = "condicionales" > {
          React.Children.toArray(
            moduleType.map((type, index) => {
              if (type === 'condicional') {
                return (
                  <>
                    <Condicional
                      setArreglo = { setTextoDocumento }
                      arreglo = { textoDocumento }
                      index = {[index]}
                      handleDelete = { handleDeleteModule }
                      handleDuplicate = { handleDuplicate }
                      moveUp={upPosition}
                      moveDown={downPosition}
                    />
                    <ModuloExtra
                      pos={index} 
                      setArray={setTextoDocumento}
                      array={textoDocumento}
                      setModule={setModuleType}
                      module={moduleType}
                    />
                  </>
                )
              }
              if (type === 'titulo') {
                return (
                  <>
                    <Titulo
                      setArreglo = { setTextoDocumento }
                      arreglo = { textoDocumento }
                      index = {[index] }
                      handleDelete = { handleDeleteModule }
                      moveUp={upPosition}
                      moveDown={downPosition}
                    />
                    <ModuloExtra
                      pos={index} 
                          setArray={setTextoDocumento}
                          array={textoDocumento}
                          setModule={setModuleType}
                          module={moduleType}
                        />
                  
                  </>
                )
              }
              if (type === 'texto') {
                return (
                  <>
                    <Texto
                      setArreglo = { setTextoDocumento }
                      arreglo = { textoDocumento }
                      index = {[index] }
                      handleDelete = { handleDeleteModule }
                      moveUp={upPosition}
                      moveDown={downPosition}
                    />
                    <ModuloExtra
                      pos={index} 
                          setArray={setTextoDocumento}
                          array={textoDocumento}
                          setModule={setModuleType}
                          module={moduleType}
                        />
                  </>
                )
              }
              if (type === 'repetir') {
                return (
                  <>
                    <Repetir
                      setArreglo = { setTextoDocumento }
                      arreglo = { textoDocumento }
                      index = {[index] }
                      handleDelete = { handleDeleteModule }
                      moveUp={upPosition}
                      moveDown={downPosition}
                    />
                    <ModuloExtra
                      pos={index} 
                      setArray={setTextoDocumento}
                      array={textoDocumento}
                      setModule={setModuleType}
                      module={moduleType}
                    />
                  </>
                    )
              }
              if (type === 'firma') {
                return (
                  <>
                    <Firma
                      setArreglo = { setTextoDocumento }
                      arreglo = { textoDocumento }
                      index = {[index] }
                      handleDelete = { handleDeleteModule }
                      moveUp={upPosition}
                      moveDown={downPosition}
                    />
                    <ModuloExtra
                      pos={index} 
                      setArray={setTextoDocumento}
                      array={textoDocumento}
                      setModule={setModuleType}
                      module={moduleType}
                    />
                  </>
                )
              }
            })
          )
        } 
        </div> 
        <FormGroup className = { classes.boxInput } >
          <FormControl className = { classes.addCondition } >
          <p> Agregar los elementos necesarios para el documento </p>
          <Select 
          id = "simple-select"
          value = ""
          variant = "outlined"
          onChange = { e => handleAddModule(e) } >
            <MenuItem value = "" disabled>Agregar modulo</MenuItem>
            <MenuItem value = "condicional">Condicional</MenuItem> 
            <MenuItem value = "texto">Texto</MenuItem> 
            <MenuItem value = "titulo">Titulo Documento</MenuItem> 
            <MenuItem value = "repetir">Modulo de repetición</MenuItem> 
            <MenuItem value = "firma">Firma</MenuItem> 
          </Select>
          </FormControl>
        </FormGroup> 
        <Button 
          type = "submit"
          variant = "contained"
          color = "primary"
          className = { classes.btnSubmit } >
          Actualizar 
        </Button>
      </form> 
    </div>
  )
}

export default EditDocument