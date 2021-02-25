import React from "react";
import axios from "axios";
import PlanTable from "../components/PlanTable";

class Plan extends React.Component {
  constructor(props) {
    super(props);
    this.state = { planes: [], values: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.delete = this.delete.bind(this);
    this.signOut = this.signOut.bind(this);
  }
  async delete(value) {
    try {
      const response = await axios.post("http://localhost:3000/plan/delete", {
        id: value,
        token: localStorage.getItem("token"),
      });
      await this.refrescar();
    } catch (err) {
      console.log("error del delete", err);
    }
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

    await this.refrescar();
  }
  async refrescar() {
    try {
      const response = await axios.post("http://localhost:3000/plan/show", {
        token: localStorage.getItem("token"),
      });
      this.setState({
        planes: response.data.planes,
      });
    } catch (err) {
      this.props.history.push("/");
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  async handleSubmit(event) {
    try {
      const response = await axios.post("http://localhost:3000/plan/add", {
        nombre_del_plan: this.state.nombre_del_plan,
        inversion_minima: this.state.inversion_minima,
        inversion_maxima: this.state.inversion_maxima,
        tasa_mensual: this.state.tasa_mensual,
        duracion_del_plan: this.state.duracion_del_plan,
        token: localStorage.getItem("token"),
      });
      this.setState({ message: response.data.validado });
      this.refrescar;
      console.log(response);
    } catch (err) {
      console.log("error del add", err);
    }
  }
  signOut() {
    localStorage.removeItem("token");
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <label>{this.state.message}</label>
        <form className="p-5" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col">
              <input
                minLength="6"
                maxLength="25"
                className="form-control"
                placeholder="Nombre del Plan"
                name="nombre_del_plan"
                type="text"
                pattern="([A-z0-9À-ž\s]){2,}"
                value={this.state.nombre_del_plan || ""}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="col">
              <input
                min="1"
                className="form-control"
                placeholder="Inversión Minima"
                name="inversion_minima"
                type="number"
                value={this.state.inversion_minima || ""}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="col">
              <input
                min="1"
                className="form-control"
                placeholder="Inversión Maxima"
                name="inversion_maxima"
                type="number"
                value={this.state.inversion_maxima || ""}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input
                min="1"
                max="100"
                className="form-control"
                placeholder="Tasa Mensual"
                name="tasa_mensual"
                type="number"
                value={this.state.tasa_mensual || ""}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="col">
              <input
                min="1"
                className="form-control"
                placeholder="Duracion del Plan"
                name="duracion_del_plan"
                type="number"
                value={this.state.duracion_del_plan || ""}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="col">
              <input
                type="submit"
                className="btn btn-primary"
                placeholder="Submit"
              />
            </div>
          </div>
        </form>
        <PlanTable
          planValues={this.state.planes}
          handleDelete={this.delete}
          handleUpdate={this.props.history}
        />
        <button onClick={this.signOut} className="btn btn-danger">
          Salir
        </button>
        <button
          onClick={() => this.props.history.push("/performance")}
          className="btn btn-primary"
        >
          TABLA
        </button>
      </div>
    );
  }
}

export default Plan;
