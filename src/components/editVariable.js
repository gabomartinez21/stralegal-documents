import React, { useState, useEffect } from 'react'
import {
    Container,
    TextField,
    Button,
    IconButton,
    Icon,
    Select,
    FormControl,
    MenuItem,
    InputLabel,
} from '@material-ui/core';
import Opcion from './conditionals/opciones';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {URLSERVER} from '../App';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    button: {
        margin: theme.spacing(1),
    },
    titulo: {
        width:'100%',
        minWidth:'500px'
    },
    bloque:{
        border: "1px solid #d1d1d1",
        margin: "10px 0",
        borderRadius: "8px",
    }
}))


function EditVariables() {
    const {idVar, idDoc} = useParams();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [inputFields, setInputFields] = useState([
        {
            tituloBloque:'',
            bloque:[{ variable: '', descripcion: '', tipo:''}],
            condicion:'no'
        }
    ]);

    const [documents, setDocuments] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState(0);

    const getVariable = async () => {
        
        const res = await axios.get(`${URLSERVER}/admin/v1/variables.php?variables=${idVar}`);
        const variables = JSON.parse(res.data.body[0].variables);
        console.log('variables: ', variables);
        setInputFields(variables);
    }

    const getDocuments = async () =>{
        const docs = await axios.get(`${URLSERVER}/admin/v1/documentos.php?documentos=0`);
        
        setDocuments(docs.data.body);
    }
    useEffect(()=> {
        getDocuments();
        getVariable();
        setSelectedDoc(idDoc)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            'id':idVar,
            'variables':JSON.stringify(inputFields),
            'type':'actualizar'
        }

        const res = await axios.post(`${URLSERVER}/admin/v1/variables.php`, JSON.stringify(body))
        
        if(res.data.ok){
            enqueueSnackbar('Variables actualizadas', { 
                variant: 'success',
            });
        }else{
            enqueueSnackbar('Ha ocurrido un error, intentalo de nuevo', { 
                variant: 'error',
            });
        }

    }
    
    const handleChangeInput = (index, j,event) => {
        const values = [...inputFields];
        values[index].bloque[j][event.target.name] = event.target.value;
        if(event.target.name === 'tipo'){
            if(event.target.value === 'condicional'){
                if(values[index].bloque[j].opciones !== undefined)  delete values[index].bloque[j].opciones
                values[index].bloque[j].condicion= ''
            }else if(event.target.value === 'opcion' || event.target.value === 'multiple' || event.target.value === 'repetitivo'){
                if(values[index].bloque[j].condicion !== undefined)  delete values[index].bloque[j].condicion
                values[index].bloque[j].opciones= [{
                  variable:'',
                  descripcion: '',
                  tipo:'variable'
                }];
            }else{
                if(values[index].bloque[j].condicion !== undefined)  delete values[index].bloque[j].condicion
                if(values[index].bloque[j].opciones !== undefined)  delete values[index].bloque[j].opciones
            }
        }
        setInputFields(values);
    }

    const handleAddFields = (index, j) => {
      const newInputs = [...inputFields];
      newInputs[index].bloque.splice(j+1 ,0,{ variable: '', descripcion: '', tipo:'texto' });
      setInputFields(newInputs);
    }
    const handleAddBloque = () => {
        setInputFields([...inputFields, {
            tituloBloque:'',
            bloque:[{ variable: '', descripcion: '', tipo:'texto'}]
        }]);
    }
    
    const handleRemoveFields = (index,j) => {
        const values = [...inputFields];
        values[index].bloque.splice(j, 1);
        setInputFields(values);
    }
    const handleTitulo = (index, event) => {
        const newValues = [...inputFields];
        newValues[index].tituloBloque = event.target.value;
        setInputFields(newValues);
    }

    const handleCondicion = (index, e) => {
        const newCond = [...inputFields];
        newCond[index].condicion = e.target.value
        if(e.target.value === 'true'){
            newCond[index].condicionBloque = '';
        }else{
            delete newCond[index].condicionBloque;
        }
        setInputFields(newCond);
    }

    const actCondicion = (index, event) => {
        const newCond = [...inputFields];
        newCond[index].condicionBloque = event.target.value;
        setInputFields(newCond);
    }

    return (
        <Container>
            <h1>Crear Variables</h1>
            <form className={classes.root} onSubmit={handleSubmit}>
                { inputFields.map((inputField, index) => (
                    <>
                    <div key={index} className={classes.bloque}>
                        <TextField 
                            label="Titulo modulo"
                            variant="filled"
                            fullwidth
                            className={classes.titulo}
                            onChange={e => handleTitulo(index, e)}
                            value={inputField.tituloBloque}
                        />
                        {inputField.bloque.map((vars, j) => (
                            <div>
                                <TextField
                                    name="variable"
                                    label="Variable"
                                    variant="filled"
                                    value={vars.variable}
                                    onChange={event => handleChangeInput(index, j, event )}
                                />
                                <TextField
                                    name="descripcion"
                                    label="Descripcion"
                                    variant="filled"
                                    value={vars.descripcion}
                                    onChange={event => handleChangeInput(index, j, event )}
                                />
                                {vars.condicion !== undefined && (
                                    <TextField
                                        name="condicion"
                                        label="Condicion"
                                        variant="filled"
                                        value={vars.condicion}
                                        onChange={event => handleChangeInput(index, j, event )}
                                        helperText="Introduce la variable por la que se mostrará esta pregunta"
                                    />
                                )}
                                <FormControl>
                                    <InputLabel id="tipo">Tipo</InputLabel>
                                    <Select 
                                        labelId="tipo"
                                        id="tipo"
                                        name="tipo"
                                        defaultValue="texto"
                                        value={vars.tipo}
                                        onChange={e => handleChangeInput(index, j, e)}
                                    >
                                        <MenuItem value="texto">Texto</MenuItem>
                                        <MenuItem value="opcion">Opciones</MenuItem>
                                        <MenuItem value="multiple">Multiple</MenuItem>
                                        <MenuItem value="condicional">Condición</MenuItem>
                                        <MenuItem value="repetitivo">Repetitivo</MenuItem>
                                        <MenuItem value="firma">Firma</MenuItem>
                                        <MenuItem value="explicacion">Explicación</MenuItem>
                                    </Select>
                                </FormControl>
                                <IconButton
                                    onClick={() => handleRemoveFields(index, j)}
                                >
                                    <RemoveIcon />
                                </IconButton>
                                <IconButton 
                                    onClick={() => handleAddFields(index, j)}
                                >
                                    <AddIcon />
                                </IconButton>
                                {vars.opciones && vars.opciones.map((opcion, i) => (
                                    <Opcion
                                        setArray={setInputFields}
                                        array={inputFields}
                                        index={index}
                                        bloque={j}
                                        pos={i}
                                    />
                                ))}
                            </div>
                        ))}
                        <FormControl fullwidth size="medium">
                            <InputLabel id="tipo">Condicion</InputLabel>
                            <Select 
                                labelId="condicion"
                                id="tipo"
                                name="condicion"
                                defaultValue="no"
                                value={inputField.condicion}
                                onChange={e => handleCondicion(index, e)}
                            >
                                <MenuItem value="si">Si</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                            </Select>
                        </FormControl>
                        {inputField.condicion === 'si' && (
                            <TextField
                                name="variable"
                                label="Condicion de bloque"
                                variant="filled"
                                value={inputField.condicionBloque}
                                onChange={event => actCondicion(index, event)}
                            />
                        )}
                        
                    </div>                    
                    </>
                ))}

                <Button 
                    className={classes.button}
                    variant="contained" 
                    color="secondary" 
                    onClick={handleAddBloque}
                    endIcon={<Icon>plus</Icon>}
                >
                    Agregar bloque
                </Button>

                <FormControl style={{display:"block", margin:"20px 0"}}>
                    <InputLabel id="select-document">Seleccionar documento</InputLabel>
                    <Select
                        labelId="select-document"
                        id="select-document"
                        value={selectedDoc}
                        defaultValue={idDoc}
                        label="Seleccionar documento"
                        onChange={e => setSelectedDoc(e.target.value)}
                        style={{minWidth:'120px'}}
                    >
                        {React.Children.toArray(documents.map(doc => (
                            <MenuItem value={doc.id_doc}>{doc.titulo_doc}</MenuItem>
                        )))}
                    </Select>
                </FormControl>
                <Button 
                    className={classes.button}
                    variant="contained" 
                    color="primary" 
                    type="submit" 
                    endIcon={<Icon>send</Icon>}
                    >Actualizar</Button>
            </form>
        </Container>
    )
}

export default EditVariables


