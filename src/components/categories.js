import react from "react";
import { useState, useEffect } from "react";


function Categories() { //hacer un .map que genere un bloque de html por cada categoria, ¿fetch? para conseguir las categorias
  

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Este monta el componente y me trae la informacion devuelta
  const apiURL = `http://localhost:3000/api/products`

  fetch(apiURL)
      .then((response) => response.json())
      .then(({countByCategory} ) => {
        console.log(countByCategory)
        setCategorias(countByCategory);})
      .catch((error) => console.log(error));

  }, []);

  return (
    <div className="row">
        <div className="col-lg-6 mb-4" >
            <div className="card bg-dark text-white shadow">
              <div className="card-body">Construccion: {categorias.Construccion}</div>
            </div>
          </div>
          <div className="col-lg-6 mb-4" >
            <div className="card bg-dark text-white shadow">
              <div className="card-body">Hogar: {categorias.Hogar}</div>
            </div>
          </div>
          <div className="col-lg-6 mb-4" >
            <div className="card bg-dark text-white shadow">
              <div className="card-body">Electrica: {categorias.Electrica}</div>
            </div>
          </div>
          <div className="col-lg-6 mb-4" >
            <div className="card bg-dark text-white shadow">
             <div className="card-body">Herramientas: {categorias.Herramientas}</div>
            </div>
          </div>
          <div className="col-lg-6 mb-4" >
            <div className="card bg-dark text-white shadow">
              <div className="card-body">Repuestos: {categorias.Repuestos}</div>
            </div>
          </div>      
    </div>
  )
}

export default Categories;