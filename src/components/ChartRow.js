import React from 'react';
import { useState, useEffect } from "react";

function ChartRow(){

    const [productos, setproductos] = useState([]);

    useEffect(() => {
        // Este monta el componente y me trae la informacion devuelta
        const apiURL = `http://localhost:3000/api/products`

        fetch(apiURL)
            .then((response) => response.json())
            .then(({products}) => {
                console.log(products)
                setproductos(products);
            })
            .catch((error) => console.log(error));

    }, []);

       
    return (

    <tbody>
        {productos.map ((productos, i) => {
            return (
                <tr>
                    <td>{productos.name}</td>
                    <td>{productos.description}</td>
                    <td>{productos.price}</td>
                    <td>{productos.stock}</td>
                    <td>{productos.discount}</td>
                    <td>{productos.color}</td>
                    <td>{productos.image}</td>
                    <td>{productos.categoria_id}</td>
                </tr>
                )}
            )}
    </tbody>
    )
}
    
        

export default ChartRow;