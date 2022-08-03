import React from 'react';
import ChartRow from './ChartRow';





function Chart (){

    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Descuento</th>
                                <th>Color</th>
                                <th>Imagen</th>
                                <th>Id de Categoria</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Descuento</th>
                                <th>Color</th>
                                <th>Imagen</th>
                                <th>Id de Categoria</th>
                            </tr>
                        </tfoot>
                            <ChartRow/>  
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Chart;