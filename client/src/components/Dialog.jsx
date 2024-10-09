import axios from "axios"
import { useEffect, useState } from "react"
export default function Dialog( props )
{
    const [ scale, setScale] = useState( false )
    const colors = ["red-400","yellow-300","purple-400","green-300"]
    const [ co, setCo] = useState()
    const incStatus = (evt) =>{
        axios.post(`http://localhost:3000/api/switch/${props.id}`,{status:props.color}).then((res)=>
            {
                props.onStatusChange(props.id, props.color);
            })
    }
    
    useEffect(()=>{
        setCo(`text-${colors[props.color]}`)
    })
    
    const toggleDescription = () => {
        setScale(!scale); 
      };
    return(
        <div className="bg-rose-100 hover:scale-105 font-semibold rounded-md gap-y-1 text-gray-900 flex flex-col p-3 cursor-pointer">
            <span className={`material-symbols-outlined  ${co}`} onClick={incStatus}>
                    adjust
                </span>
            {props.heading}
            {scale && <p className="text-sm">
                {props.body}
            </p>}
            <span className="material-symbols-outlined mx-56 right-0 bottom-0 text-sm" onClick={toggleDescription}>
                segment
            </span>
        </div>
    )
}