import React from "react";
import axios from "axios";

class Performance extends React.Component {
  constructor(props) {
    super(props);
    this.state = { total: "", planes: [], values: "", tabla: [""] };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  async componentDidMount() {
    try {
      const response = await axios.post(
        "http://localhost:3000/plan/api/verify",
        {
          token: localStorage.getItem("token"),
        }
      );
    } catch (err) {
      this.props.history.push("/");
    }
    await this.show();
    console.log("el multi", this.state.planes[this.state.select]);
  }

  onSubmit(event) {
    this.state.tabla = [""];
    this.state.maxTotal = "";
    event.preventDefault();
    const { monto, fecha, select } = this.state;
    const {
      duracion_del_plan,
      nombre_del_plan,
      tasa_mensual,
    } = this.state.planes[select];

    let fechaFragments = fecha.split("-");
    let anio = Number(fechaFragments[0]);
    let mes = Number(fechaFragments[1]);
    let dia = Number(fechaFragments[2]);
    let total = 0;
    let rendimiento = 0;
    let nombre;
    for (var i = 0; i < duracion_del_plan; i++) {
      rendimiento = (monto * tasa_mensual) / 100;
      nombre = "";
      if (mes === 12) {
        mes = 1;
        anio++;
      } else {
        mes++;
      }
      var FecModify = `${dia}/${mes}/${anio}`;
      if (i < 1) {
        rendimiento = 0;
        nombre = nombre_del_plan;
      }
      total = total + rendimiento;
      this.state.tabla[i] = {
        nombre: nombre,
        fecha: FecModify,
        tasa: tasa_mensual,
        monto: monto,
        rendimiento: rendimiento,
        plazo: i + 1,
      };
    }
    let maxTotal = Number(monto) + Number(total);
    this.setState({
      nombre: nombre_del_plan,
      maxTotal: maxTotal,
      total: total,
    });
  }
  async show(event) {
    try {
      const response = await axios.post("http://localhost:3000/plan/show", {
        token: localStorage.getItem("token"),
      });
      this.setState({
        planes: response.data.planes,
      });
      console.log(this.state);
    } catch (err) {
      console.log(err);
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col">
              <select
                className="form-control"
                onChange={this.handleChange}
                name="select"
                required
              >
                <option value="default">Seleccione un plan</option>
                {this.state.planes.map((p, index) => (
                  <option key={p.id} value={index}>
                    {p.nombre_del_plan}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <input
                className="form-control"
                placeholder="Fecha"
                name="fecha"
                type="date"
                value={this.state.fecha || ""}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                placeholder="Monto"
                name="monto"
                type="number"
                value={this.state.monto || ""}
                onChange={this.handleChange}
                required
              />
            </div>
            <input type="submit" value="Submit" />
          </div>
        </form>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Plan</th>
              <th scope="col">Fecha</th>
              <th scope="col">Tasa</th>
              <th scope="col">Monto inicial</th>
              <th scope="col">Rendimiento Ganado</th>
              <th scope="col">Plazo</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tabla.map((p, i) => (
              <tr key={i}>
                <td>{p.nombre}</td>
                <td>{p.fecha}</td>
                <td>{p.tasa}</td>
                <td>{p.monto}</td>
                <td>{p.rendimiento}</td>
                <td>{p.plazo}</td>
              </tr>
            ))}
            <tr>
              <th scope="col">TOTAL</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col">{this.state.monto}</th>
              <th scope="col">{this.state.total}</th>
              <th scope="col">{this.state.maxTotal}</th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default Performance;
