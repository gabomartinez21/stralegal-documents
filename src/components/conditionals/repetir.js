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
import {ArrowDropUp, ArrowDropDown} from '@material-ui/icons';
import styled from 'styled-components'
import Texto from './texto';
import Titulo from './titulo';
import Condicional from './condicional';

const useStyles = makeStyles((theme) => ({
    accordion:{
        marginTop: "1.5rem",
        "& .MuiAccordionDetails-root":{
            display:'block'
        },
        "&.MuiAccordion-root.Mui-expanded":{
            marginTop: "0",

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
function Repetir({
  setArreglo,
  arreglo,
  index,
  handleDelete,
  moveUp,
  moveDown
}) {

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

    const downPosition = (indexCod) => {
      const moduleCopy = [...moduleType];
      const textCopy = [...repeticion];

      // if(indexCod.length > 1){
      //   const auxMod = moduleCopy[indexCod[0]][indexCod[1]+1];
      //   const auxText = textCopy[indexCod[0]][indexCod[1]+2];
        //cambio en el modulo
        // moduleCopy[indexCod[0]][indexCod[1]+1] = moduleCopy[indexCod[0]][indexCod[1]] 
        // moduleCopy[indexCod[0]][indexCod[1]] = auxMod;
        // // cambio en el texto 
        // textCopy[indexCod[0]][indexCod[1]+2] = textCopy[indexCod[0]][indexCod[1]+1] 
        // textCopy[indexCod[0]][indexCod[1]+1] = auxText; 
        // setModuleType(moduleCopy)
        // setRepeticion(textCopy)

      // }else{
        if(indexCod[0]+1 <= moduleCopy.length && indexCod[0]+1 <= textCopy.length){
          const auxMod = moduleCopy[indexCod[0]];
          const auxText = textCopy[indexCod[0]+1];
          //cambio en el modulo
          moduleCopy[indexCod[0]] = moduleCopy[indexCod[0]-1]
          moduleCopy[indexCod[0]-1] = auxMod;
          // cambio en el texto 
          textCopy[indexCod[0]+1] = textCopy[indexCod[0]]
          textCopy[indexCod[0]] = auxText; 

          setModuleType(moduleCopy)
          setRepeticion(textCopy)
        }

      // }
    }
    const upPosition = (indexCod) => {
      const moduleCopy = [...moduleType];
      const textCopy = [...repeticion];
      
      if(indexCod.length > 1){
        if(indexCod[0]-1 >= 0){
          // const auxMod = moduleCopy[indexCod[0]][indexCod[1]-1];
          // const auxText = textCopy[indexCod[0]][indexCod[1]+1];
          // cambio en el modulo
          // moduleCopy[indexCod[0]][indexCod[1]-1] = moduleCopy[indexCod[0]][indexCod[1]]; 
          // moduleCopy[indexCod[0]][indexCod[1]] = auxMod;
          // // cambio en el texto 
          // textCopy[indexCod[0]][indexCod[1]+1] = textCopy[indexCod[0]][indexCod[1]];
          // textCopy[indexCod[0]][indexCod[1]] = auxText; 
          
          // setModuleType(moduleCopy)
          // setRepeticion(textCopy)
        }
      }else{
        if(indexCod[0]-1 > 0){
          const auxMod = moduleCopy[indexCod[0]-2];
          const auxText = textCopy[indexCod[0]-1];
          console.log(auxMod)
          console.log(auxText)
          // cambio en el modulo
          moduleCopy[indexCod[0]-2] = moduleCopy[indexCod[0]-1]; 
          moduleCopy[indexCod[0]-1] = auxMod;
          // cambio en el texto 
          textCopy[indexCod[0]-1] = textCopy[indexCod[0]];
          textCopy[indexCod[0]] = auxText; 
          
          setModuleType(moduleCopy)
          setRepeticion(textCopy)
        }

      }
      
  
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
          <ArrowButtons>
            <Button 
              onClick = {() => moveDown(index)}
              variant="outlined"
              className="btn-arrow">
              <ArrowDropDown/>
            </Button> 
            <Button 
              onClick = {()=> moveUp(index)}
              variant="outlined"
              className="btn-arrow">
                <ArrowDropUp/>
            </Button> 
            <Button 
              onClick = {() => handleDelete(index) }
              variant="outlined"
              className="btnEliminar">
                X
            </Button> 

          </ArrowButtons>
            <div className="row">
                <FormGroup className={classes.boxInput}>
                    <Typography variant="h6">Variable de repetición</Typography>
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
                                    moveUp={upPosition}
                                    moveDown={downPosition}
                                />
                        }
                        if(type === 'titulo'){
                            return <Titulo
                                    setArreglo={setRepeticion} 
                                    arreglo={repeticion}
                                    index={[indexC+1]}
                                    handleDelete={handleDeleteModule}
                                    moveUp={upPosition}
                                    moveDown={downPosition}
                                />
                        }
                        if(type === 'texto'){
                            return <Texto
                                    setArreglo={setRepeticion} 
                                    arreglo={repeticion}
                                    index={[indexC+1]}
                                    handleDelete={handleDeleteModule}
                                    moveUp={upPosition}
                                    moveDown={downPosition}
                                />
                        }
                        if(type === 'socio'){
                            return <Texto
                                    setArreglo={setRepeticion} 
                                    arreglo={repeticion}
                                    index={[indexC+1]}
                                    modulo="socio"
                                    handleDelete={handleDeleteModule}
                                    moveUp={upPosition}
                                    moveDown={downPosition}
                                />
                        }
                        if(type === 'firma'){
                            return <Texto
                                    setArreglo={setRepeticion} 
                                    arreglo={repeticion}
                                    index={[indexC+1]}
                                    modulo="socio"
                                    handleDelete={handleDeleteModule}
                                    moveUp={upPosition}
                                    moveDown={downPosition}
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


const ArrowButtons = styled.div`
  display:flex;
  margin-top:18px;
  justify-content:flex-end;
  background-color: #e3e3e3;
`