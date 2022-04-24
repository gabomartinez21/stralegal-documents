/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
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

import Texto from './conditionals/texto'
import Condicional from './conditionals/condicional'
import Titulo from './conditionals/titulo'
import Firma from './conditionals/firma'
import Repetir from './conditionals/repetir';
import { useSnackbar } from 'notistack';

import {URLSERVER} from '../config';

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
    addCondition:{
        width: '50%',
        maxWidth: '400px'
    },
    btnSubmit:{
        background:'#1c739c',
        marginTop:'2rem'
    }
}));

// TODO mas firmas con el nomnbre de la persona para accionistas

function CreateDocument() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [titulo, setTitulo] = useState('');
    const [textoDocumento, setTextoDocumento] = useState([]);
    const [moduleType, setModuleType] = useState([]);
    const [deleteActive, setDeleteActive] = useState(false);


    useEffect(()=>{
        if(!deleteActive){

            if(moduleType[moduleType.length-1] === 'condicional'){
                setTextoDocumento([...textoDocumento, {
                    condicion:[ 
                        [{tituloCond:""}],
                        [{tituloCond:""}]
                    ]
                }])
    
            }
            if(moduleType[moduleType.length-1] === 'texto'){
                setTextoDocumento([...textoDocumento, {
                    texto:'', checked: false
                }])
            }
            if(moduleType[moduleType.length-1] === 'firma'){
                setTextoDocumento([...textoDocumento, {
                    firma:''
                }])
            }
            if(moduleType[moduleType.length-1] === 'repetir'){
                setTextoDocumento([...textoDocumento, {
                    repetir:[{
                        variable:''
                    }]
                }])
            }
            if(moduleType[moduleType.length-1] === 'titulo'){
                setTextoDocumento([...textoDocumento, {
                    titulo:''
                }])
            }
        }
        setDeleteActive(false)
    }, [moduleType])

    const handleDeleteModule = (indexMod) => {
        const moduleCopy = moduleType.filter((mod, i) => i !== indexMod[0]);
        const textoCopy = textoDocumento.filter((text, i) => i !== indexMod[0]);        
        setDeleteActive(true)
        setModuleType(moduleCopy);   
        setTextoDocumento(textoCopy)
    }

    const handleDuplicate = (index) => {
        const moduleCopy = [...moduleType];
        const textoDocumentoCopy = [...textoDocumento];
        const newModule = [];
        const newTextoDocumento = [];
        moduleCopy.forEach((mod, i) => {
            if(i === index[0]){
                newModule.push(mod)
                newModule.push(mod)
            }else{
                newModule.push(mod)
            }
        })
        textoDocumentoCopy.forEach((textoDoc, i) => {
            if(i === index[0]){
                newTextoDocumento.push(textoDoc)
                newTextoDocumento.push(textoDoc)
                
            }else{
                newTextoDocumento.push(textoDoc)
            }
        })
        
        setDeleteActive(true);
        setModuleType(newModule);
        setTextoDocumento(newTextoDocumento)
    }


    const enviarDatos = async (data) => {
        const body = {
            'titulo_doc':data.titulo,
            'texto_doc':JSON.stringify(data.textoDocumento),
            'type':'guardar'
        }
        const res = await axios.post(`${URLSERVER}/admin/v1/documentos.php`, JSON.stringify(body))

        if(res.data.ok){
            enqueueSnackbar('Tu documento se guardo satisfactoriamente', { 
                variant: 'success',
            });
        }else{
            enqueueSnackbar('Ha ocurrido un error, intentalo de nuevo', { 
                variant: 'error',
            });
        }
        
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        enviarDatos({
            titulo,
            textoDocumento
        })
        
    }
    
    return (
        <div>
            <h1>Crear documento</h1>

            <form id="listado-form" method="post" onSubmit={handleSubmit}>
                <div className="row">
                    <FormGroup className={classes.boxInput}>
                        <Typography variante="h3">Titulo del Documento</Typography>
                        <TextField 
                            type="text"
                            placeholder="Titulo"
                            variant="outlined"
                            value={titulo}
                            onChange={e => setTitulo(e.target.value)}
                            className={classes.textInput}
                        />
                    </FormGroup>

                </div>
                <div className="condicionales">
                    {React.Children.toArray(
                        moduleType.map((type, index) => {
                            if(type === 'condicional'){
                                return  <Condicional 
                                        setArreglo={setTextoDocumento} 
                                        arreglo={textoDocumento}
                                        index={[index]}
                                        handleDelete={handleDeleteModule}
                                        handleDuplicate={handleDuplicate}
                                    />
                            }
                            if(type === 'titulo'){
                                return <Titulo
                                        setArreglo={setTextoDocumento} 
                                        arreglo={textoDocumento}
                                        index={[index]}
                                        handleDelete={handleDeleteModule}
                                    />
                            }
                            if(type === 'texto'){
                                return <Texto
                                        setArreglo={setTextoDocumento} 
                                        arreglo={textoDocumento}
                                        index={[index]}
                                        handleDelete={handleDeleteModule}
                                    />
                            }
                            if(type === 'repetir'){
                                return <Repetir
                                        setArreglo={setTextoDocumento} 
                                        arreglo={textoDocumento}
                                        index={[index]}
                                        handleDelete={handleDeleteModule}
                                    />
                            }
                            if(type === 'firma'){
                                return <Firma
                                        setArreglo={setTextoDocumento} 
                                        arreglo={textoDocumento}
                                        index={[index]}
                                        handleDelete={handleDeleteModule}
                                    />
                            }
                            return null;
                        })
                    )}
                </div>
                <FormGroup className={classes.boxInput}>
                    <FormControl className={classes.addCondition}>
                        <p>Agregar los elementos necesarios para el documento</p>
                        <Select
                            id="simple-select"
                            value=""
                            variant="outlined"
                            onChange={e => setModuleType([...moduleType, e.target.value])}
                        >
                            <MenuItem value="" disabled>Agregar modulo</MenuItem>
                            <MenuItem value="condicional">Condicional</MenuItem>
                            <MenuItem value="texto">Texto</MenuItem>
                            <MenuItem value="titulo">Titulo Documento</MenuItem>
                            <MenuItem value="repetir">Modulo de repetición</MenuItem>
                            <MenuItem value="firma">Firma</MenuItem>
                        </Select>
                    </FormControl>
                </FormGroup>
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    className={classes.btnSubmit}
                >Guardar</Button>
            </form>
        </div>
    )
}

export default CreateDocument
