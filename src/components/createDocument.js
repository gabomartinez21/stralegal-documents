import React, {useState, useEffect, useContext, cloneElement} from 'react'
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
import qs from 'qs';

import Texto from './conditionals/texto'
import Condicional from './conditionals/condicional'
import Titulo from './conditionals/titulo'


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

function CreateDocument() {
    const classes = useStyles();
    const [document, dispatch] = useContext(DocumentContext)
    
    const [mostrarCondicion, setMostrarCondicion] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [textoAgregado, setTextoAgregado] = useState('');
    const [numCondiciones, setNumCondiciones] = useState(0);
    const [textoDocumento, setTextoDocumento] = useState([]);
    const [moduleType, setModuleType] = useState(['']);
    
    useEffect(()=>{
        setTextoDocumento([...textoDocumento, {texto:textoAgregado}])
    },[])

    // console.log(textoDocumento);

    useEffect(()=>{
        setMostrarCondicion(true);
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
                texto:''
            }])
        }
        if(moduleType[moduleType.length-1] === 'titulo'){
            setTextoDocumento([...textoDocumento, {
                titulo:''
            }])
        }
    }, [moduleType])

    const handleTexto = e=>{
        const valores = [...textoDocumento];
        valores[0][e.target.name] = e.target.value
        setTextoDocumento(valores)
    }

    const enviarDatos = async (data) => {
        const body = {
            'titulo_doc':data.titulo,
            'texto_doc':JSON.stringify(data.textoDocumento),
            'type':'guardar'
        }
        const res = await axios.post('http://192.168.142.1/gabo/starlegal/admin/v1/documentos.php', {
            data: JSON.stringify(body),
        })
        console.log(res)
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
            <h1>Crear documento</h1>

            <form id="listado-form" method="post" onSubmit={handleSubmit}>
                <div class="row">
                    <FormGroup className={classes.boxInput}>
                        <Typography variante="h3">Titulo del Documento</Typography>
                        <TextField 
                            type="text"
                            placeholder="Titulo"
                            variant="outlined"
                            onChange={e => setTitulo(e.target.value)}
                            className={classes.textInput}
                        />
                    </FormGroup>
                    <FormGroup className={classes.boxInput}>
                        <Typography variante="h3">Texto Principal</Typography>
                        <TextField 
                            variant="outlined"
                            rows={6}
                            multiline
                            name="texto"
                            onChange={handleTexto}
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
                                    />
                            }
                            if(type === 'title'){
                                return <Titulo
                                        setArreglo={setTextoDocumento} 
                                        arreglo={textoDocumento}
                                        index={[index]}
                                    />
                            }
                            if(type === 'texto'){
                                return <Texto
                                        setArreglo={setTextoDocumento} 
                                        arreglo={textoDocumento}
                                        index={[index]}
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
                            <MenuItem value="condicional">Condicional</MenuItem>
                            <MenuItem value="texto">Texto</MenuItem>
                            <MenuItem value="titulo">Titulo Documento</MenuItem>
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
