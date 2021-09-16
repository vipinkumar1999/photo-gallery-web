import React from "react";
import AdminService from "../Services/AdminService";
import StorageService from "../Services/StorageService";
import { withRouter } from "react-router-dom";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChangeMail = (e) => {
    this.setState({ email: e.target.value });
  };

  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  submitForm = (e) => {
    e.preventDefault();
    let { email, name, password } = this.state;
    let type;

    if (this.props.location.search == "?t=a") {
      type = "admin";
    } else {
      type = "user";
    }

    if (email && name && password) {
      AdminService.registerUser(email, name, password, type).then(
        (response) => {
          if (response.success) {
            let user = StorageService.getUser();
            if (user.type === "admin") {
              this.props.history.push("/admin/uploadImage");
            }
          } else if (!response.success) {
            this.setState({ errorMsg: response.message });
          }
        }
      );
    }
  };

  render() {
    let { errorMsg } = this.state;
    return (
      <div
        style={{ height: "100vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <div
          style={{ border: "1px solid black", padding: 10 }}
          className="card form-body"
        >
          <form className="form-default" onSubmit={this.submitForm}>
            {errorMsg && (
              <div style={{ border: "1px solid red", padding: 10 }}>
                {errorMsg}
              </div>
            )}
            <h2>Register</h2>
            <div className="form-group mb-1">
              <label>Email address</label>
              <input
                type="email"
                onChange={this.onChangeMail}
                className="form-control"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mb-1">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                onChange={this.onChangeName}
                placeholder="Enter name"
              />
            </div>
            <div className="form-group mb-1">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                onChange={this.onChangePassword}
                placeholder="Enter password"
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-md btn-success">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
