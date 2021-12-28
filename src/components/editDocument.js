import React, {useState, useEffect, useContext} from 'react'
import {
    Select,
    FormControl,
    MenuItem,
    InputLabel,
    TextField,
    Typography,
    Button,
    FormGroup,
    makeStyles 
} from '@material-ui/core';
import DocumentContext from '../context/DocumentContext';
import {DOCUMENT_ACTIONS} from '../context/DocumentProvider';
import axios from 'axios';
import {useParams} from 'react-router-dom';

import Texto from './conditionals/texto'
import Condicional from './conditionals/condicional'
import Titulo from './conditionals/titulo';
import Firma from './conditionals/firma';

import { useSnackbar } from 'notistack';
import {URLSERVER,URLFRONT} from '../App';

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

function EditDocument() {
    const {id} = useParams();
    const classes = useStyles();
    const [document, dispatch] = useContext(DocumentContext)
    const { enqueueSnackbar } = useSnackbar();
    const [titulo, setTitulo] = useState('');
    const [textoDocumento, setTextoDocumento] = useState([]);
    const [moduleType, setModuleType] = useState(['']);  

    const getDocument = async () => {
        
        const res = await axios.get(`${URLSERVER}/admin/v1/documentos.php?documentos=${id}`);
        console.log(res.data.body[0]);
        const tituloBD = res.data.body[0].titulo_doc;
        setTitulo(tituloBD);
        const textoDB = JSON.parse(res.data.body[0].texto_doc);

        setTextoDocumento(textoDB);
        const modulesDB = [];
        textoDB.forEach(module => {
            if(module.texto !== undefined) {
                modulesDB.push('texto');
            }else if(module.condicion !== undefined) {
                modulesDB.push('condicion');
            }else if(module.titulo !== undefined) {
                modulesDB.push("titulo");
            }else if(module.repetir !== undefined) {
                modulesDB.push('repetir');
            }else if(module.firma !== undefined) {
                modulesDB.push('firma');
            }
        })
        setModuleType(modulesDB);
    }
    useEffect(()=>{
        getDocument();
    },[])


    useEffect(()=>{
        if(moduleType[moduleType.length-1] === 'condicion'){
            setTextoDocumento([...textoDocumento, {
                condicion:[ 
                    [{tituloCond:""}],
                    [{tituloCond:""}]
                ]
            }])

        }
        if(moduleType[moduleType.length-1] === 'texto'){
            setTextoDocumento([...textoDocumento, {
                texto:''
            }])
        }
        if(moduleType[moduleType.length-1] === 'firma'){
            setTextoDocumento([...textoDocumento, {
                firma:''
            }])
        }
        if(moduleType[moduleType.length-1] === 'repetir'){
            setTextoDocumento([...textoDocumento, {
                repetir:''
            }])
        }
        if(moduleType[moduleType.length-1] === 'titulo'){
            setTextoDocumento([...textoDocumento, {
                titulo:''
            }])
        }
    }, [moduleType])

    const enviarDatos = async (data) => {
        const body = {
            'id':id,
            'titulo_doc':data.titulo,
            'texto_doc':JSON.stringify(data.textoDocumento),
            'type':'actualizar'
        }
        const res = await axios.post(`${URLSERVER}/admin/v1/documentos.php`, JSON.stringify(body))
        if(res.data.ok){
            enqueueSnackbar('Tu documento se actualizo satisfactoriamente', { 
                variant: 'success',
            });
        }else{
            enqueueSnackbar('Ha ocurrido un error, intentalo de nuevo', { 
                variant: 'error',
            });
        }
        
    }

    const handleDeleteModule = (indexMod) => {
        const moduleCopy = moduleType.filter((mod, i) => i !== indexMod);
        setModuleType(moduleCopy);   
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type:DOCUMENT_ACTIONS.AGREGAR_TODO,
            payload:{
                titulo,
                textoDocumento
            }
        })

        enviarDatos({
            titulo,
            textoDocumento
        })
        
    }
    
    return (
        <div>
            <h1>Editar documento</h1>

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
                            if(type === 'condicion'){
                                
                                return  <Condicional 
                                            setArreglo={setTextoDocumento} 
                                            arreglo={textoDocumento}
                                            index={[index]}
                                            handleDelete={handleDeleteModule}
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
                                return <Texto
                                            setArreglo={setTextoDocumento} 
                                            arreglo={textoDocumento}
                                            index={[index]}
                                            modulo="repetir"
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
                        })
                    )}
                </div>
                <FormGroup className={classes.boxInput}>
                    <FormControl className={classes.addCondition}>
                        <p>Agregar los elementos necesarios para el documento</p>
                        <Select
                            id="simple-select"
                            value={moduleType[moduleType.length-1]}
                            variant="outlined"
                            onChange={e => setModuleType([...moduleType, e.target.value])}
                        >
                            <MenuItem value="" disabled>Agregar modulo</MenuItem>
                            <MenuItem value="condicion">Condicional</MenuItem>
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
                >Actualizar</Button>
            </form>
        </div>
    )
}

export default EditDocument
