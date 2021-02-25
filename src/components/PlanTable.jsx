import React from "react";

class PlanTable extends React.Component {
  render() {
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">nombre del plan</th>
              <th scope="col">inversion minima</th>
              <th scope="col">inversion maxima</th>
              <th scope="col">tasa mensual</th>
              <th scope="col">duracion de planes</th>
              <th scope="col">eliminar</th>
              <th scope="col">Modificar</th>
            </tr>
          </thead>
          <tbody>
            {this.props.planValues.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre_del_plan}</td>
                <td>{p.inversion_minima}</td>
                <td>{p.inversion_maxima}</td>
                <td>{p.tasa_mensual}</td>
                <td>{p.duracion_del_plan}</td>
                <td>
                  <input
                    type="button"
                    value="Eliminar"
                    className="btn btn-danger"
                    onClick={() => this.props.handleDelete(p.id)}
                  />
                </td>
                <td>
                  <input
                    type="button"
                    value="Modificar"
                    className="btn btn-primary"
                    onClick={() =>
                      this.props.handleUpdate.push("/plan/update/" + p.id, {
                        p: p,
                      })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default PlanTable;
