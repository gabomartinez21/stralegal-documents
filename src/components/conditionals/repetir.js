/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import {
    TextField,
    Typography,
    FormGroup,
    makeStyles,
    MenuItem,
    FormControl,
    Select ,
    Button,
} from '@material-ui/core';
import Texto from './texto';
import Titulo from './titulo';
import Condicional from './condicional';

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
      border: "1px solid #dfdfdf",
      borderRadius: 7,
      padding: "9px 5px",
      marginTop:theme.spacing(2),
      '& p':{
          margin:'10px 0',
      }
    },
}));
function Repetir({setArreglo, arreglo, index, handleDelete}) {

    const classes = useStyles();
    const [repeticion, setRepeticion] = useState([
        {
            variable:'',
        }
    ])
    const [moduleType, setModuleType] = useState([]);  
    const [firstTime, setFirstTime] = useState(true);

    const handleVariable = (e) => {
        const newRepeticion = [...repeticion];
        newRepeticion[0].variable = e.target.value
        setRepeticion(newRepeticion)
    }
    
    useEffect(()=>{
      if(firstTime){
        const modulesDB = [];
        if(arreglo[index[0]]){
          if(index.length > 1){
            if(arreglo[index[0]][index[1]+1]){
              setRepeticion(arreglo[index[0]][index[1]+1].repetir);
              
              arreglo[index[0]][index[1]+1].repetir.forEach(module => {
                  if(module.texto !== undefined) {
                      modulesDB.push('texto');
                  }else if(module.condicion !== undefined) {
                      modulesDB.push('condicion');
                  }else if(module.titulo !== undefined) {
                      modulesDB.push("titulo");
                  }else if(module.firma !== undefined) {
                      modulesDB.push('firma');
                  }
              })
              setModuleType(modulesDB);
            }else{
              setRepeticion(arreglo[index[0]][index[1]].repetir);
              arreglo[index[0][index[1]]].repetir.forEach(module => {
                  if(module.texto !== undefined) {
                      modulesDB.push('texto');
                  }else if(module.condicion !== undefined) {
                      modulesDB.push('condicion');
                  }else if(module.titulo !== undefined) {
                      modulesDB.push("titulo");
                  }else if(module.firma !== undefined) {
                      modulesDB.push('firma');
                  }
              })
              setModuleType(modulesDB);
  
            }
          }else{
            setRepeticion(arreglo[index[0]].repetir);
            // validar 
            
            if(arreglo[index[0]].repetir !== undefined){
              arreglo[index[0]].repetir.forEach(module => {
                if(module.texto !== undefined) {
                    modulesDB.push('texto');
                }else if(module.condicion !== undefined) {
                    modulesDB.push('condicion');
                }else if(module.titulo !== undefined) {
                    modulesDB.push("titulo");
                }else if(module.firma !== undefined) {
                    modulesDB.push('firma');
                }
              })

              setModuleType(modulesDB);
            }
          }
        }
        setFirstTime(false)
      }
    }, [moduleType])
    
    useEffect(() => {
        const newArreglo = [...arreglo];
        // console.log(arreglo);
        // console.log(index);
        if(index.length > 1){
          if(newArreglo[index[0]][index[1]+1] !== undefined){
            newArreglo[index[0]][index[1]+1].repetir = repeticion;
            setArreglo(newArreglo)
          }else{
            newArreglo[index[0]][index[1]].repetir = repeticion;
            setArreglo(newArreglo)
            
          }
          
        }else{
            if(newArreglo[index[0]] !== undefined){
                newArreglo[index[0]].repetir = repeticion;
                setArreglo(newArreglo)
            }

        }
    }, [repeticion])

    const handleAddModule = (e) => {

        setModuleType([...moduleType, e.target.value]);
        if(e.target.value === 'condicion'){
            setRepeticion([...repeticion, {
                condicion:[ 
                    [{tituloCond:""}],
                    [{tituloCond:""}]
                ]
            }])

        }
        if(e.target.value === 'texto'){
            setRepeticion([...repeticion, {
                texto:''
            }])
        }
        if(e.target.value === 'firma'){
            setRepeticion([...repeticion, {
                firma:''
            }])
        }
        if(e.target.value === 'titulo'){
            setRepeticion([...repeticion, {
                titulo:''
            }])
        }
    }
    
    const handleDeleteModule = (indexMod) => {
        const moduleCopy = moduleType.filter((mod, i) => i !== indexMod[0]-1);
        const repeticionCopy = repeticion.filter((mod, i) => i !== indexMod[0])
        setModuleType(moduleCopy)
        setRepeticion(repeticionCopy)
    }
    return (
        <div>
            <Button onClick={() => handleDelete(index)} variante="outlined" className="btnEliminar">X</Button>
            <div class="row">
                <FormGroup className={classes.boxInput}>
                    <Typography variante="h3">Variable de repetición</Typography>
                    <TextField 
                        id="name"
                        type="text"
                        placeholder="Valor de variable"
                        value={repeticion[0].variable}
                        onChange={(e) => handleVariable(e)}
                        variant="outlined"
                        className={classes.textInput}
                        helperText="Introduce el valor de la variable con la que se ejecutarán las repeticiones"
                    />
                </FormGroup>

            </div>
            <div className="condicionales">
                {React.Children.toArray(
                    moduleType.map((type, indexC) => {
                        if(type === 'condicion'){
                            return  <Condicional 
                                    setArreglo={setRepeticion} 
                                    arreglo={repeticion}
                                    index={[indexC+1]}
                                    handleDelete={handleDeleteModule}
                                    moduleParent={moduleType}
                                    setModuleParent={setModuleType}
                                />
                        }
                        if(type === 'titulo'){
                            return <Titulo
                                    setArreglo={setRepeticion} 
                                    arreglo={repeticion}
                                    index={[indexC+1]}
                                    handleDelete={handleDeleteModule}
                                />
                        }
                        if(type === 'texto'){
                            return <Texto
                                    setArreglo={setRepeticion} 
                                    arreglo={repeticion}
                                    index={[indexC+1]}
                                    handleDelete={handleDeleteModule}
                                />
                        }
                        if(type === 'socio'){
                            return <Texto
                                    setArreglo={setRepeticion} 
                                    arreglo={repeticion}
                                    index={[indexC+1]}
                                    modulo="socio"
                                    handleDelete={handleDeleteModule}
                                />
                        }
                        if(type === 'firma'){
                            return <Texto
                                    setArreglo={setRepeticion} 
                                    arreglo={repeticion}
                                    index={[indexC+1]}
                                    modulo="socio"
                                    handleDelete={handleDeleteModule}
                                />
                        }
                        return null;
                    })
                )}
            </div>
            <FormGroup className={classes.boxInput}>
                <FormControl className={classes.addCondition}>
                    <p>Agregar los elementos necesarios para la condición</p>
                    <Select
                        id="demo-simple-select"
                        value=""
                        onChange={e => handleAddModule(e)}
                    >
                        <MenuItem value="" disabled>Agregar modulo</MenuItem>
                        <MenuItem value="condicion">Condicional</MenuItem>
                        <MenuItem value="texto">Texto</MenuItem>
                        <MenuItem value="titulo">Titulo Documento</MenuItem>
                        <MenuItem value="socio">Socio</MenuItem>
                        <MenuItem value="firma">Firma</MenuItem>
                    </Select>
                </FormControl>
            </FormGroup>

        </div>
    );
}

export default Repetir;
