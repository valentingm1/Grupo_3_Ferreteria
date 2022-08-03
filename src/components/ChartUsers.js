import React from 'react';
import ChartUsersRow from './ChartUserRow';





function ChartUsers (){

    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div><h3>Usuarios de la Base de Datos:</h3></div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>imagen</th>
                                <th>Rol</th>    
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>imagen</th>
                                <th>Rol</th>
                            </tr>
                        </tfoot>
                            <ChartUsersRow/>  
                    </table>
                </div>
            </div>
        </div>

    )
}

export default ChartUsers;