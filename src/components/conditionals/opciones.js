import React, {useState, useEffect} from 'react'
import {
    TextField,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

function Opcion({setArray, array, index, bloque, pos}) {

    const [opcion, setOpcion] = useState({
        variable:'',
        descripcion: '',
        type:'variable',
    })
    const [firstTime, setFirstTime] = useState(true);
    
    useEffect(()=>{
        if(firstTime){
            if(index !== undefined){
                setOpcion(array[index].bloque[bloque].opciones[pos]);
            }else{
                setOpcion(array.opciones[pos])
            }
            setFirstTime(false);
        }else{
            if(index !== undefined){
                const newArr = [...array];
                newArr[index].bloque[bloque].opciones[pos] = opcion;
                setArray(newArr);
            }else{
                const newArr = {...array};
                newArr.opciones[pos] = opcion;
                setArray(newArr);
                
            }
        }
    }, [opcion])

    const handleChangeInputOption = (e) =>{
        const newOpcion = {...opcion}
        newOpcion[e.target.name] = e.target.value;
        if(e.target.value === 'condicion'){
            newOpcion.condicion = '';
        }
        if(e.target.value === 'opciones'){
            newOpcion.opciones = [{}];
        }
        setOpcion(newOpcion);    
    }  

    const handleAddFieldsOpt = () => {   
        const newOpcion = [...array];
        newOpcion[index].bloque[bloque].opciones.push({ variable: '', descripcion: '', type:'variable'});
        setArray(newOpcion)
    }
    
    const handleRemoveFieldsOpt = () => {
        const newOpcion = [...array];
        newOpcion[index].bloque[bloque].opciones.splice(pos,1);
        setArray(newOpcion);
    }

    return (
        <div className="opcion">
            <TextField
                name="variable"
                label="Variable"
                variant="filled"
                value={opcion.variable}
                onChange={event => handleChangeInputOption(event)}
            />
            
            <TextField
                name="descripcion"
                label="Opción"
                variant="filled"
                value={opcion.descripcion}
                onChange={event => handleChangeInputOption(event)}
            />
            
            {opcion.type === 'condicion' && (
                <TextField
                    name="condicion"
                    label="Condicion"
                    variant="filled"
                    value={opcion.condicion}
                    onChange={event => handleChangeInputOption(event)}
                />

            )}
            <FormControl>
                <InputLabel id="tipo">Tipo</InputLabel>
                <Select 
                    labelId="tipo"
                    id="tipo"
                    name="type"
                    defaultValue="variable"
                    value={opcion.type}
                    onChange={e => handleChangeInputOption(e)}
                >
                    <MenuItem value="variable">Variable</MenuItem>
                    <MenuItem value="seleccion">Selección</MenuItem>
                    <MenuItem value="opcion">Opción única</MenuItem>
                    <MenuItem value="opciones">Opciones</MenuItem>
                    <MenuItem value="condicion">Condición</MenuItem>
                </Select>
            </FormControl>
            <IconButton
                onClick={() => handleRemoveFieldsOpt(index)}
            >
                <RemoveIcon />
            </IconButton>
            <IconButton 
                onClick={() => handleAddFieldsOpt()}
            >
                <AddIcon />
            </IconButton>
            {opcion.type === 'opciones' && opcion.opciones.map((op, i) => (
                <Opcion
                    setArray={setOpcion}
                    array={opcion}
                    pos={i}
                />
            ))}
        </div>
    )
}

export default Opcion
