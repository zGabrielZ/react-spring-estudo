import React from 'react'

function SelectMenuEnum(props){
    
    const options =  props.lista.map((o,index)=>{
        return(
            <option key={index} value={o.value}>{o.label}</option>
        )
    })
    
    return(
        <select {...props}>
            {options}
        </select>
    )
}

export default SelectMenuEnum