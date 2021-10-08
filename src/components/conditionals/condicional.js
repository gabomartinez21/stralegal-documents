import React, {useState, useEffect, useContext} from 'react'
import {
    TextField,
    Typography,
    FormGroup,
    makeStyles,
    MenuItem,
    FormControl,
    Select ,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@material-ui/core';
import Texto from './texto'
import Titulo from './titulo'

const useStyles = makeStyles((theme) => ({
    accordion:{
        marginTop: "1.5rem",
        "& .MuiAccordionDetails-root":{
            display:'block'
        },
        "&.MuiAccordion-root.Mui-expanded:first-child":{
            marginTop: "1.5rem",

        }
    },
    textInput: {
        '& input':{
            padding:'12px 15px!important',
        }
    },
    addCondition:{
        width: '50%',
        maxWidth: '400px'
    },
    boxInput:{
        marginTop:theme.spacing(2),
        '& p':{
            margin:'10px 0',
        }
    },
}));
function Condicional({setArreglo, arreglo, index}) {
    const classes = useStyles();
    const [moduleType, setModuleType] = useState([[],[]]);
    const [expanded, setExpanded] = useState('panel0');
    const [condicional, setCondicional] = useState([ 
        {tituloCond:""},
        {tituloCond:""}
    ])

    useEffect(() => {
        const copyTextoDocumento = [...arreglo];
        if(index.length > 1){
            if(copyTextoDocumento[index[0]]){
                copyTextoDocumento[index[0]][index[1]].condicion = condicional
            }
        }else{
            if(copyTextoDocumento[index[0]]){
                copyTextoDocumento[index[0]].condicion = condicional
            }
        }
        setArreglo(copyTextoDocumento)
    }, [condicional]);

    const getModules = () => {
        
        const modulesDB = [];
        arreglo[index].condicion.forEach((module) => {
            if(module.texto !== undefined) {
                modulesDB.push('texto');
            }else if(module.condicion !== undefined) {
                modulesDB.push('condicion');
            }else if(module.titulo !== undefined) {
                modulesDB.push("titulo");
            }else if(module.repetir !== undefined) {
                modulesDB.push('repetir');
            }
        })
        setModuleType(modulesDB);
    }

    useEffect(() => {
        // getModules();
    },[])


    const handleAddModule = (pos, type) => {
        let modulo;
        switch(type){
            case 'texto':
                modulo = [...condicional[pos]]
                modulo.push({texto:''});
                const condicionTexto = [...condicional]
                condicionTexto[pos]=modulo;
                setCondicional(condicionTexto)
                break;
            case 'repetir':
                modulo = [...condicional[pos]]
                modulo.push({repetir:''});
                const condicionRepetir = [...condicional]
                condicionRepetir[pos]=modulo;
                setCondicional(condicionRepetir)
                break;
            case 'titulo':
                modulo = [...condicional[pos]]
                modulo.push({titulo:''});
                const condicionTitulo = [...condicional]
                condicionTitulo[pos]=modulo;
                setCondicional(condicionTitulo)
                break;
            case 'condicional':
                modulo = [...condicional[pos]]
                modulo.push({condicion:[ 
                    [{tituloCond:""}],
                    [{tituloCond:""}]    
                ]});
                const condicionCondicion = [...condicional]
                condicionCondicion[pos]=modulo;
                setCondicional(condicionCondicion)
                break;
        }
    }

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleTitle = (e, modulo, ind) => {
        modulo[0].tituloCond = e.target.value;
        const condicionNueva = [...condicional]
        condicionNueva[ind]=modulo;
        setCondicional(condicionNueva)
    }

    const handleAgregar = (e, ind) => {
        const moduleCopy = [...moduleType];
        handleAddModule(ind, e.target.value);
        moduleCopy[ind].push(e.target.value);
        setModuleType(moduleCopy)
    }

    return (
        <div>
            {condicional.map((moduleCond, i) => (
                <Accordion className={classes.accordion} square expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
                    <AccordionSummary aria-controls={`panel${i}d-content`} id={`panel${i}d-header`}>
                        <Typography>Condicion {i+1}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div class="row">
                            <FormGroup className={classes.boxInput}>
                                <Typography variante="h3">Titulo Condición</Typography>
                                <TextField 
                                    id="name"
                                    type="text"
                                    placeholder="Titulo"
                                    // value={moduleCond[i].tituloCond}
                                    onChange={(e) => handleTitle(e, moduleCond, i)}
                                    variant="outlined"
                                    className={classes.textInput}
                                    helperText="Introduce el valor de la respuesta a la condición de las variables"
                                />
                            </FormGroup>

                        </div>
                        <div className="condicionales">
                            {React.Children.toArray(
                                moduleType[i].map((type, indexC) => {
                                    if(type === 'condicional'){
                                        return  <Condicional 
                                                setArreglo={setCondicional} 
                                                arreglo={condicional}
                                                index={[i,indexC+1]}
                                            />
                                    }
                                    if(type === 'titulo'){
                                        return <Titulo
                                                setArreglo={setCondicional} 
                                                arreglo={condicional}
                                                index={[i,indexC+1]}
                                            />
                                    }
                                    if(type === 'texto'){
                                        return <Texto
                                                setArreglo={setCondicional} 
                                                arreglo={condicional}
                                                index={[i,indexC+1]}
                                            />
                                    }
                                    if(type === 'repetir'){
                                        return <Texto
                                                setArreglo={setCondicional} 
                                                arreglo={condicional}
                                                index={[i,indexC+1]}
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
                                    id="demo-simple-select"
                                    onChange={(e) => handleAgregar(e, i)}
                                >
                                    <MenuItem value="" disabled>Agregar modulo</MenuItem>
                                    <MenuItem value="condicion">Condicional</MenuItem>
                                    <MenuItem value="texto">Texto</MenuItem>
                                    <MenuItem value="titulo">Titulo Documento</MenuItem>
                                    <MenuItem value="repetir">Modulo repetitivo</MenuItem>
                                </Select>
                            </FormControl>
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>
            ))}
        
            
        </div>
    )
}

export default Condicional
