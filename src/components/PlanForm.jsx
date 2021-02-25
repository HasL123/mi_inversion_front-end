import React, { Component } from "react";

class PlanForm extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <label>
            nombre_del_plan:
            <input
              name="nombre_del_plan"
              type="text"
              value={this.props.nombre_del_plan || ""}
              onChange={this.props.handleChange}
            />
          </label>
          <label>
            inversion_minima:
            <input
              name="inversion_minima"
              type="text"
              value={this.props.inversion_minima || ""}
              onChange={this.props.handleChange}
            />
          </label>
          <label>
            inversion_maxima:
            <input
              name="inversion_maxima"
              type="text"
              value={this.props.inversion_maxima || ""}
              onChange={this.props.handleChange}
            />
          </label>
          <label>
            tasa_mensual:
            <input
              name="tasa_mensual"
              type="text"
              value={this.props.tasa_mensual || ""}
              onChange={this.props.handleChange}
            />
          </label>
          <label>
            duracion_del_plan:
            <input
              name="duracion_del_plan"
              type="text"
              value={this.props.duracion_del_plan || ""}
              onChange={this.props.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
export default PlanForm;
