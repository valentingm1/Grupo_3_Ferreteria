import react from "react";
import { useState, useEffect } from "react";


function Categories() { //hacer un .map que genere un bloque de html por cada categoria, ¿fetch? para conseguir las categorias
  

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Este monta el componente y me trae la informacion devuelta
  const apiURL = `http://localhost:3000/api/category`

  fetch(apiURL)
      .then((response) => response.json())
      .then(({data} ) => {
        setCategorias(data.categorias);})
      .catch((error) => console.log(error));

  }, []);

  return (
    <div className="row">
    {categorias.map((categoria, i) => {
      return (

        <div className="col-lg-6 mb-4" key={i}>
          <div className="card bg-dark text-white shadow">
            <div className="card-body">{categoria.name}</div>
          </div>
        </div>
      )}
    )}
    </div>
  )
}

export default Categories;