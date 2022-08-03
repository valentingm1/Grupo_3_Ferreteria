import React from 'react';
import { useState, useEffect } from "react";

/* ¿fetch? para conseguir las categorias */
function LastMovieInDb() {

    const [productos, setproductos] = useState([]);

    useEffect(() => {
        // Este monta el componente y me trae la informacion devuelta
        const apiURL = `http://localhost:3030/api/products`

        fetch(apiURL)
            .then((response) => response.json())
            .then(({ products }) => {
                setproductos(products);
            })
            .catch((error) => console.log(error));

    }, []);


    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Último Productos en base de datos</h5>
                </div>
                {productos.map((producto, i) => {
                    if (productos.length == producto.id) {


                        return (
                            <div className="card-body">
                                <div className="text-center">
                                    <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 40 + 'rem' }} src={producto.image} alt={producto.image} />
                                </div>
                                <p>{producto.description}</p>
                                {/* <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View movie detail</a> */}
                            </div>
                        )
                    }
                    })
                }
            </div>
        </div>
    )
}

export default LastMovieInDb;
