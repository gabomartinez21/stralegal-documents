import React, {useState, useEffect, useContext} from 'react'
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
import DocumentContext from '../context/DocumentContext';
import {DOCUMENT_ACTIONS} from '../context/DocumentProvider';
import axios from 'axios';

import Texto from './conditionals/texto'
import Condicional from './conditionals/condicional'
import Titulo from './conditionals/titulo'
import { useSnackbar } from 'notistack';



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
    const [, dispatch] = useContext(DocumentContext)
    const { enqueueSnackbar } = useSnackbar();
    const [titulo, setTitulo] = useState('');
    const [textoDocumento, setTextoDocumento] = useState([]);
    const [moduleType, setModuleType] = useState(['']);
    
    useEffect(()=>{
        if(textoDocumento.length === 0){
            setTextoDocumento([...textoDocumento, {texto:''}])
        }
    },[])


    useEffect(()=>{
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
        // const res = await axios.post('http://192.168.1.10/gabo/starlegal/admin/v1/documentos.php', JSON.stringify(body))
        const res = await axios.post('https://pandacode-ve.xyz/starlegal/admin/v1/documentos.php', JSON.stringify(body))
        console.log(res);
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
                                    />
                            }
                            if(type === 'titulo'){
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
                            if(type === 'repetir'){
                                return <Texto
                                        setArreglo={setTextoDocumento} 
                                        arreglo={textoDocumento}
                                        index={[index]}
                                        modulo="repetir"
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
                            <MenuItem value="repetir">Modulo de repetición</MenuItem>
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

