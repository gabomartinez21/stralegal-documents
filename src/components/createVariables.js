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
import { useSnackbar } from 'notistack';


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
        },
        button: {
            margin: theme.spacing(1),
    }
}))


function CreateVariables() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [inputFields, setInputFields] = useState([
        { variable: '', descripcion: '', tipo:''},
    ]);

    const [documents, setDocuments] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState(0);

    const getDocuments = async () =>{
        const docs = await axios.get('https://pandacode-ve.xyz/starlegal/admin/v1/documentos.php?documentos=0');
        setDocuments(docs.data.body);
    }
    useEffect(()=> {
        getDocuments();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            'idDoc':selectedDoc,
            'variables':JSON.stringify(inputFields),
            'type':'guardar'
        }
        const res = await axios.post('https://pandacode-ve.xyz/starlegal/admin/v1/variables.php', JSON.stringify(body))

        if(res.data.ok){
            enqueueSnackbar('Variables guardadas', { 
                variant: 'success',
            });
        }else{
            enqueueSnackbar('Ha ocurrido un error, intentalo de nuevo', { 
                variant: 'error',
            });
        }

    }

    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        if(event.target.name === 'tipo'){
            if(event.target.value === 'condicional'){
                if(values[index].opciones !== undefined)  delete values[index].opciones
                values[index].condicion= ''
            }else if(event.target.value === 'opcion'){
                if(values[index].condicion !== undefined)  delete values[index].condicion
                values[index].opciones= [{}]
            }else{
                if(values[index].condicion !== undefined)  delete values[index].condicion
                if(values[index].opciones !== undefined)  delete values[index].opciones
            }
        }
        setInputFields(values);
    }

    const handleAddFields = () => {
        setInputFields([...inputFields, { variable: '', descripcion: '', tipo:'texto' }])
    }
    
    const handleRemoveFields = (index) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    }

    return (
        <Container>
            <h1>Crear Variables</h1>
            <form className={classes.root} onSubmit={handleSubmit}>
                { inputFields.map((inputField, index) => (
                    <>
                    <div key={index}>
                        <TextField
                            name="variable"
                            label="Variable"
                            variant="filled"
                            value={inputField.variable}
                            onChange={event => handleChangeInput(index, event )}
                        />
                        <TextField
                            name="descripcion"
                            label="Descripcion"
                            variant="filled"
                            value={inputField.descripcion}
                            onChange={event => handleChangeInput(index, event )}
                        />
                        {inputField.condicion !== undefined && (
                            <TextField
                                name="condicion"
                                label="Condicion"
                                variant="filled"
                                value={inputField.condicion}
                                onChange={event => handleChangeInput(index, event )}
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
                                value={inputField.type}
                                onChange={e => handleChangeInput(index, e)}
                            >
                                <MenuItem value="texto">Texto</MenuItem>
                                <MenuItem value="opcion">Opciones</MenuItem>
                                <MenuItem value="condicional">Condición</MenuItem>
                                <MenuItem value="repetitivo">Repetitivo</MenuItem>
                            </Select>
                        </FormControl>
                        <IconButton
                            onClick={() => handleRemoveFields(index)}
                        >
                            <RemoveIcon />
                        </IconButton>
                        <IconButton 
                            onClick={() => handleAddFields()}
                        >
                            <AddIcon />
                        </IconButton>
                    </div>
                    {inputField.opciones && inputField.opciones.map((opcion, i) => (
                        <Opcion
                            setArray={setInputFields}
                            array={inputFields}
                            index={index}
                            pos={i}
                        />
                    ))}
                    
                    </>
                ))}

                <FormControl style={{display:"block", margin:"20px 0"}}>
                    <InputLabel id="select-document">Seleccionar documento</InputLabel>
                    <Select
                        labelId="select-document"
                        id="select-document"
                        value={selectedDoc}
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
                    >Enviar</Button>
            </form>
        </Container>
    )
}

export default CreateVariables
