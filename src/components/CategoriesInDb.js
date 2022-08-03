import React from "react";
import Categories from "./categories.js"

function CategoriesInDb() {
  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Categorias en Base de datos
          </h5>
        </div>
        <div className="card-body">
              <Categories />
        </div>
      </div>
    </div>
  );
}

export default CategoriesInDb;
