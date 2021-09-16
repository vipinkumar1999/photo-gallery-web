import React from "react";
import AdminService from "../Services/AdminService";
import history from "../utils/History";
import StorageService from "./../Services/StorageService";
import { withRouter } from "react-router-dom";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChangeMail = (e) => {
    this.setState({ email: e.target.value });
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  toRegister = () => {
    this.props.history.push("/register");
  };

  submitForm = (e) => {
    e.preventDefault();
    let { email, password, ty } = this.state;

    if (email && password) {
      AdminService.signIn(email, password).then((response) => {
        if (response.success) {
          console.log("user created");
          let user = StorageService.getUser();
          let type = user.type;
          if (type === "admin") {
            this.props.history.push("./admin/uploadImage");
          } else if (type === "user") {
            this.props.history.push("./user/images");
          }
        } else {
          this.setState({ errorMsg: response.msg });
        }
      });
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
            <h2>Sign in</h2>
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
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={this.onChangePassword}
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-md btn-success">
                Sign in
              </button>
            </div>
            <div>
              <p>Dont have an account?</p>
              <span onClick={this.toRegister} className="btn btn-link">
                Register
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
