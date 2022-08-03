import React from 'react';
import SmallCard from './SmallCard';
import { useState, useEffect } from "react";

/*  Cada set de datos es un objeto literal */


/* <!-- Movies in DB --> */


function ContentRowMovies() {


    const [cantidadProductos, setcantidadProductos] = useState([]);

    useEffect(() => {
        // Este monta el componente y me trae la informacion devuelta
        const apiURL = `http://localhost:3000/api/products`

        fetch(apiURL)
            .then((response) => response.json())
            .then((data) => {
                setcantidadProductos(data.count);
            })
            .catch((error) => console.log(error));

    }, []);

    const [cantidadCategorias, setcantidadCategorias] = useState([]);

    useEffect(() => {
        // Este monta el componente y me trae la informacion devuelta
        const apiURL = `http://localhost:3000/api/category`

        fetch(apiURL)
            .then((response) => response.json())
            .then(({data}) => {
                setcantidadCategorias(data.total);
            })
            .catch((error) => console.log(error));

    }, []);

    const [cantidadUsuarios, setcantidadUsuarios] = useState([]);

    useEffect(() => {
        // Este monta el componente y me trae la informacion devuelta
        const apiURL = `http://localhost:3000/api/users`

        fetch(apiURL)
            .then((response) => response.json())
            .then((data) => {
                setcantidadUsuarios(data.total);
            })
            .catch((error) => console.log(error));

    }, []);

    const cantidadesTotales = [cantidadProductos, cantidadCategorias, cantidadUsuarios ];

    
    let moviesInDB = {
        title: 'Productos en base de datos',
        color: 'primary',
        cuantity: cantidadesTotales[0],
        icon: 'fa-clipboard-list'
    }
    
    /* <!-- Total awards --> */
    
    let totalAwards = {
        title: 'Categorias en base de datos',
        color: 'success',
        cuantity: cantidadesTotales[1],
        icon: 'fa-award'
    }
    
    /* <!-- Actors quantity --> */
    
    let actorsQuantity = {
        title: 'Usuarios registrados en base de datos',
        color: 'warning',
        cuantity:cantidadesTotales[2],
        icon: 'fa-user-check'
    }
    
    let cartProps = [moviesInDB, totalAwards, actorsQuantity];
    


    return (

        <div className="row">

            {cartProps.map((movie, i) => {

                return <SmallCard {...movie} key={i} />

            })}

        </div>
    )
}

export default ContentRowMovies;