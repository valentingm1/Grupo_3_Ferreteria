import React from 'react';
import { useState, useEffect } from "react";

function ChartUsersRow(){

    const [usuarios, setusuarios] = useState([]);

    useEffect(() => {
        // Este monta el componente y me trae la informacion devuelta
        const apiURL = `http://localhost:3030/api/users`

        fetch(apiURL)
            .then((response) => response.json())
            .then(({data}) => {
                setusuarios(data);
            })
            .catch((error) => console.log(error));

    }, []);

  
    return (

    <tbody>
        {usuarios.map ((usuarios, i) => {
            return (
                <tr>
                    <td>{usuarios.first_name}</td>
                    <td>{usuarios.last_name}</td>
                    <td>{usuarios.email}</td>
                </tr>
                )}
            )}
    </tbody>
    )
}
    
        
export default ChartUsersRow;