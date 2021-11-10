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
    
    console.log(array[index].bloque[bloque].opciones);
    useEffect(()=>{
        if(firstTime){
            setOpcion(array[index].bloque[bloque].opciones[pos]);
            setFirstTime(false);
        }

    }, []);
    useEffect(()=>{
        if(firstTime){
            setOpcion(array[index].bloque[bloque].opciones[pos]);
            setFirstTime(false);
        }else{
            const newArr = [...array];
            newArr[index].bloque[bloque].opciones[pos] = opcion;
            setArray(newArr);

        }

    }, [opcion])

    const handleChangeInputOption = (e) =>{
        const newOpcion = {...opcion}
        console.log('name ',e.target.name )
        console.log('value ',e.target.value )
        newOpcion[e.target.name] = e.target.value;
        if(e.target.value === 'condicion'){
            newOpcion.condicion = '';
        }
        setOpcion(newOpcion);
        
    }  
    const handleAddFieldsOpt = () => {   
        const newOpcion = [...array];
        newOpcion[index].bloque[bloque].opciones.push({ variable: '', descripcion: '', type:'variable'});
        setArray(newOpcion)
    }
    
    const handleRemoveFieldsOpt = (index) => {
        const newOpcion = [...array];
        newOpcion[index].opciones.splice(index,1);
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
        </div>
    )
}

export default Opcion
