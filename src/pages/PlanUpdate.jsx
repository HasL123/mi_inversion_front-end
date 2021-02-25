import React from "react";
import axios from "axios";

class PlanUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { values: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state);
  }
  async handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/plan/update", {
        id: this.props.match.params.id,
        nombre_del_plan: this.state.nombre_del_plan,
        inversion_minima: this.state.inversion_minima,
        inversion_maxima: this.state.inversion_maxima,
        tasa_mensual: this.state.tasa_mensual,
        duracion_del_plan: this.state.duracion_del_plan,
        token: localStorage.getItem("token"),
      });
      this.props.history.push("/plan");
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
    try {
      const response = await axios.post("http://localhost:3000/plan/byid", {
        token: localStorage.getItem("token"),
        id: this.props.match.params.id,
      });
      this.setState({ values: response.data.planes[0] });
    } catch (err) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div>
        <form className="p-5" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col mt-5">
              <input
                minLength="6"
                maxLength="25"
                className="form-control"
                placeholder="Nombre del Plan"
                name="nombre_del_plan"
                type="text"
                value={this.state.nombre_del_plan || ""}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="col mt-5">
              <label className="form-control">
                {this.state.values.nombre_del_plan}
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col mt-5">
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
            <div className="col mt-5">
              <label className="form-control">
                {this.state.values.inversion_minima}
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col mt-5">
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
            <div className="col mt-5">
              <label className="form-control">
                {this.state.values.inversion_maxima}
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col mt-5">
              <input
                min="1"
                className="form-control"
                placeholder="Tasa Mensual"
                name="tasa_mensual"
                type="number"
                value={this.state.tasa_mensual || ""}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="col mt-5">
              <label className="form-control">
                {this.state.values.tasa_mensual}
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col mt-5">
              <input
                className="form-control"
                placeholder="Duracion del Plan"
                name="duracion_del_plan"
                type="number"
                value={this.state.duracion_del_plan || ""}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="col mt-5">
              <label className="form-control">
                {this.state.values.duracion_del_plan}
              </label>
            </div>
          </div>
          <div className="col mt-5">
            <input
              type="submit"
              className="btn btn-primary"
              placeholder="Submit"
            />
          </div>
        </form>
      </div>
    );
  }
}
export default PlanUpdate;
