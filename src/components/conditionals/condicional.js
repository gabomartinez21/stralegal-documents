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
function Condicional({setTextoDocumento, textoDocumento, index}) {
    const classes = useStyles();
    const [moduleType, setModuleType] = useState([]);
    const [moduleType2, setModuleType2] = useState([]);
    const [expanded, setExpanded] = useState('panel1');

    useEffect(()=>{
        if(textoDocumento[index]){

            const condicionalA = textoDocumento[index].condicion[0];
    
            if(moduleType[moduleType.length-1] === 'condicional'){
                
                setTextoDocumento([
                    ...textoDocumento, 
                    {
                        ...condicionalA,
                        condicion:[ 
                            {
                                tituloCond:""
                            },
                            {
                                tituloCond:"",
                            }    
                        ]
                    }
                ])
    
            }
            if(moduleType[moduleType.length-1] === 'texto'){
                
                setTextoDocumento([
                    ...textoDocumento, 
                    {
                        ...condicionalA, 
                        texto:''
                    }
                ])
                console.log(textoDocumento[index].condicion[0])
            }
            if(moduleType[moduleType.length-1] === 'titulo'){
                setTextoDocumento([
                    ...textoDocumento, 
                    {
                        ...condicionalA,
                        titulo:''
                    }
                ])
            }
        }

    }, [moduleType])

    useEffect(()=>{
        console.log(textoDocumento[index])
        // const condicionalB = textoDocumento[index].condicion[1];

        // if(moduleType2[moduleType2.length-1] === 'condicional'){
        //     setTextoDocumento([
        //         ...textoDocumento, 
        //         {
        //             ...condicionalB,
        //             condicion:[ 
        //                 {
        //                     tituloCond:""
        //                 },
        //                 {
        //                     tituloCond:"",
        //                 }    
        //             ]
        //         }
        //     ])

        // }
        // if(moduleType2[moduleType2.length-1] === 'texto'){
        //     const condicionAct = textoDocumento[index].condicion;
        //     setTextoDocumento([
        //         ...textoDocumento, 
        //         {
        //             ...condicionalB,
        //             texto:''
        //         }
        //     ])
        // }
        // if(moduleType2[moduleType2.length-1] === 'titulo'){
        //     setTextoDocumento([
        //         ...textoDocumento, 
        //         {
        //             ...condicionalB,
        //             titulo:''
        //         }
        //     ])
        // }
    }, [moduleType2])

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleAgregar = e => {
        setModuleType([...moduleType,e.target.value])
    }
    const handleAgregar2 = e => {
        setModuleType2([...moduleType2, e.target.value])
    }

    return (
        <div>
            <Accordion className={classes.accordion} square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>Condicion A</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div class="row">
                        <FormGroup className={classes.boxInput}>
                            <Typography variante="h3">Titulo Condición</Typography>
                            <TextField 
                                id="name"
                                type="text"
                                placeholder="Titulo"
                                variant="outlined"
                                className={classes.textInput}
                            />
                        </FormGroup>

                    </div>
                    <div className="condicionales">
                        {React.Children.toArray(
                            moduleType.map((type, index) => {
                                if(type === 'condicional'){
                                    return  <Condicional 
                                            setTextoDocumento={setTextoDocumento} 
                                            textoDocumento={textoDocumento}
                                        />
                                }
                                if(type === 'title'){
                                    return <Titulo
                                            setTextoDocumento={setTextoDocumento} 
                                            textoDocumento={textoDocumento}
                                            index={index}
                                        />
                                }
                                if(type === 'texto'){
                                    return <Texto
                                            setTextoDocumento={setTextoDocumento} 
                                            textoDocumento={textoDocumento}
                                            index={index}
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
                                value={moduleType}
                                onChange={handleAgregar}
                            >
                                <MenuItem value="" disabled>Agregar modulo</MenuItem>
                                <MenuItem value="condicional">Condicional</MenuItem>
                                <MenuItem value="texto">Texto</MenuItem>
                                <MenuItem value="title">Titulo Documento</MenuItem>
                                <MenuItem value="close">Cierre Condicional</MenuItem>
                            </Select>
                        </FormControl>
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            <Accordion className={classes.accordion} square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography>Condicion B</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div class="row">
                        <FormGroup className={classes.boxInput}>
                            <Typography variante="h3">Titulo Condición</Typography>
                            <TextField 
                                id="name"
                                type="text"
                                placeholder="Titulo"
                                variant="outlined"
                                className={classes.textInput}
                            />
                        </FormGroup>

                    </div>
                    <div className="condicionales">
                        {React.Children.toArray(
                            moduleType2.map((type, index) => {
                                if(type === 'condicional'){
                                    return  <Condicional 
                                            setTextoDocumento={setTextoDocumento} 
                                            textoDocumento={textoDocumento}
                                        />
                                }
                                if(type === 'title'){
                                    return <Titulo
                                            setTextoDocumento={setTextoDocumento} 
                                            textoDocumento={textoDocumento}
                                            index={index}
                                        />
                                }
                                if(type === 'texto'){
                                    return <Texto
                                            setTextoDocumento={setTextoDocumento} 
                                            textoDocumento={textoDocumento}
                                            index={index}
                                        />
                                }
                            })
                        )}
                    </div>
                    <FormGroup className={classes.boxInput}>
                        <FormControl className={classes.addCondition}>
                            <p>Agregar los elementos necesarios para el documento</p>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={moduleType}
                            onChange={handleAgregar2}
                            >
                                <MenuItem value="" disabled>Agregar modulo</MenuItem>
                                <MenuItem value="condicional">Condicional</MenuItem>
                                <MenuItem value="texto">Texto</MenuItem>
                                <MenuItem value="title">Titulo Documento</MenuItem>
                                <MenuItem value="close">Cierre Condicional</MenuItem>
                            </Select>
                        </FormControl>
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            
        </div>
    )
}

export default Condicional
