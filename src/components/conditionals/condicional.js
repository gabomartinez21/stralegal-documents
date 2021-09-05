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
function Condicional() {
    const classes = useStyles();
    const [moduleType, setModuleType] = useState('');
    const [expanded, setExpanded] = useState('panel1');
    const [mostrar, setMostrar] = useState(false);
    const [mostrar2, setMostrar2] = useState(false);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleAgregar = e => {
        setModuleType(e.target.value)
        setMostrar(true)
    }
    const handleAgregar2 = e => {
        setModuleType(e.target.value)
        setMostrar2(true)
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
                        {mostrar && 
                            <Condicional/>
                        }
                    </div>
                    <FormGroup className={classes.boxInput}>
                        <FormControl className={classes.addCondition}>
                            <p>Agregar los elementos necesarios para el documento</p>
                            <Select
                                label
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
                        {mostrar2 && 
                            <Condicional/>
                        }
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
