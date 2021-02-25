import React from "react";
import axios from "axios";
import Context from "../context/Context";
class LoginForm extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.state.message = "";
    try {
      const response = await axios.post("http://localhost:3000/login", {
        user: this.state.user,
        password: this.state.password,
      });

      if (!response.data.validado) {
        this.context.auth.auth = {
          id: response.data.auth.id,
          user: response.data.auth.user,
        };
        localStorage.setItem("token", response.data.token);
        this.props.history.push("/plan");
      }
      this.setState({ message: response.data.validado });
    } catch (err) {
      console.log(err);
      this.setState({ message: "Incorrect password or user" });
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
      this.props.history.push("/plan");
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <div id="login">
          <h3 className="text-center text-white pt-5">Login form</h3>
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div id="login-column" className="col-md-6">
                <div id="login-box" className="col-md-12">
                  <label>{this.state.message}</label>
                  <form className="form" onSubmit={this.handleSubmit}>
                    <h3 className="text-center text-info">Login</h3>
                    <div className="form-group">
                      <label htmlFor="username" className="text-info">
                        Username:
                      </label>
                      <input
                        minLength="4"
                        maxLength="25"
                        name="user"
                        type="text"
                        className="form-control"
                        value={this.state.user || ""}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="text-info">
                        Password:
                      </label>
                      <input
                        minLength="4"
                        maxLength="25"
                        name="password"
                        type="password"
                        className="form-control"
                        value={this.state.password || ""}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="submit"
                        name="submit"
                        className="btn btn-info btn-md"
                        value="submit"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
