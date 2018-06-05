import React from "react";
import "./RegisterForm.css";
import { Redirect } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import Dialog from "material-ui/Dialog";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
const muiTheme = getMuiTheme();

const customContentStyle = {
  width: '50%',
  // height: '100%'
};

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordmatchingerror: true,
      emailtypeerror: true,
      emailempty: true,
      firstnameempty: true,
      lastnameempty: true,
      passwordempty: true,
      passwordlength: true,

      password: "",
      firstname: "",
      lastname: "",
      email: "",
      company: "",
      id: "",
      loggedin: false,
      company_: "",

      options: ["DURO"],
      option_: false
    };
  }

  onEmailChange = event => {
    this.setState({ emailempty: true });
    this.setState({ emailtypeerror: false });
    this.setState({ email: event.target.value });
    if (event.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      this.setState({ emailtypeerror: true });
    }
  };

  onCompanyChange = event => {
    console.log(event[0]);
    this.setState({ company: event[0] });
  };

  onFirstNameChange = event => {
    this.setState({ firstname: event.target.value });
  };

  onLastNameChange = event => {
    this.setState({ lastname: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ passwordlength: false });
    this.setState({ password: event.target.value });
    if (event.target.value.length >= 6) {
      this.setState({ passwordlength: true });
    }
    // console.log(this.state.passwordconfirm);
  };

  onPasswordConfirmChange = event => {
    if (this.state.password === event.target.value) {
      this.setState({ passwordmatchingerror: true });
    } else {
      this.setState({ passwordmatchingerror: false });
    }
  };

  handleSelectName = (value, index) => {
    console.log(value, index);
  };

  onSubmitRegister = () => {
    this.setState({ lastnameempty: true });
    this.setState({ firstnameempty: true });
    this.setState({ passwordempty: true });
    this.setState({ emailempty: true });
    this.setState({ emailtypeerror: true });

    if (this.state.lastname === "") {
      console.log("lastname cannot be empty");
      this.setState({ lastnameempty: false });
    }
    if (this.state.firstname === "") {
      console.log("firstname cannot be empty");
      this.setState({ firstnameempty: false });
    }
    if (this.state.password === "") {
      console.log("password cannot be empty");
      this.setState({ passwordempty: false });
    }
    if (this.state.email === "") {
      console.log("email cannot be empty");
      this.setState({ emailempty: false });
    }

    if (
      this.state.lastnameempty &&
      this.state.firstnameempty &&
      this.state.passwordempty &&
      this.state.passwordmatchingerror &&
      this.state.emailtypeerror &&
      this.state.passwordempty
    ) {
      if (this.state.company === "") {
        fetch("http://localhost:3000/Register", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            company: this.state.company,
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            company_: false
          })
        })
          .then(response => response.json())
          .then(user => {
            if (user[0].user_id) {
              this.setState({ id: user[0].user_id });
              console.log(this.state.id);
              this.setState({ loggedin: true });
            }
          });
      } else {
        fetch("http://localhost:3000/Register", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            company: this.state.company,
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            company_: true
          })
        })
          .then(response => response.json())
          .then(user => {
            if (user[0].user_id) {
              this.setState({ id: user[0].user_id });
              this.setState({ loggedin: true });
            }
          });
      }
    }
  };

  render() {
    if (this.state.option_ === false) {
      fetch("http://localhost:3000/company")
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.setState({ options: data });
        });
      this.setState({ option_: true });
    }

    return (
      <div>
        {this.state.loggedin === false ? (
          <div>
            <MuiThemeProvider muiTheme={muiTheme}>
              <Dialog
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.handleDialogClose}
                contentStyle= {customContentStyle}
              >
                <article>
                  <main >
                    <div >
                      <fieldset
                        id="Register"
                        className="ba b--transparent ph0 mh0"
                      >
                        <legend className="f3 fw6 ph0 mh0 top form">Register</legend>
                        <div className="mt3 comp">
                          <Typeahead
                            className="token"
                            type="text"
                            placeholder="Company (optional)"
                            name="company"
                            id="company"
                            onChange={this.onCompanyChange}
                            options={this.state.options}
                          />
                        </div>
                        <div className="name">
                        <div className="mt3 form" style={{width: '48%'}}>
                          <input
                            className={
                              this.state.firstnameempty
                                ? "pa2 input-reset ba br2 bg-transparent w-100 form required"
                                : "pa2 input-reset ba br2 bg-transparent w-100 form error"
                            }
                            type="text"
                            placeholder="First Name"
                            name="name"
                            id="fname"
                            onChange={this.onFirstNameChange}
                          />
                          {this.state.firstnameempty ? (
                            ""
                          ) : (
                            <h6 className="red">firstname cannot be empty</h6>
                          )}
                        </div>
                        <div className="mt3 form" style={{width: '48%'}}>
                          <input
                            className={
                              this.state.lastnameempty
                                ? "pa2 input-reset ba bg-transparent br2 w-100 form required"
                                : "pa2 input-reset br2 ba bg-transparent w-100 form error"
                            }
                            type="text"
                            placeholder="Last Name"
                            name="name"
                            id="lname"
                            onChange={this.onLastNameChange}
                          />
                          {this.state.lastnameempty ? (
                            ""
                          ) : (
                            <h6 className="red">lastname cannot be empty</h6>
                          )}
                        </div>
                        </div>
                        <div className="mt3 form">
                          <input
                            className={
                              this.state.emailtypeerror && this.state.emailempty
                                ? "pa2 input-reset ba bg-transparent br2 w-100 form required"
                                : "pa2 br2 input-reset ba bg-transparent w-100 form error"
                            }
                            type="email"
                            placeholder="Email"
                            name="email-address"
                            id="email-address"
                            onChange={this.onEmailChange}
                          />
                          {this.state.emailempty ? (
                            ""
                          ) : (
                            <h6 className="red">email cannot be empty</h6>
                          )}

                          {this.state.emailtypeerror ? (
                            ""
                          ) : (
                            <h6 className="red">invalid email format</h6>
                          )}
                        </div>
                        <div className="mv3 form pass">
                          <input
                            className={
                              this.state.passwordempty
                                ? "pa2 input-reset br2 ba bg-transparent w-100 form required"
                                : "pa2 br2 input-reset ba bg-transparent w-100 form error"
                            }
                            type="password"
                            placeholder="Password"
                            name="password"
                            id="password"
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                          />
                          {this.state.passwordempty ? (
                            ""
                          ) : (
                            <h6 className="red">password cannot be empty</h6>
                          )}
                          {this.state.passwordlength ? (
                            ""
                          ) : (
                            <h6 className="red">
                              password must have at least 6 digits
                            </h6>
                          )}
                        </div>
                        <div className="mv3 form pass">
                          <input
                            className={
                              this.state.passwordmatchingerror
                                ? "pa2 br2 input-reset ba bg-transparent w-100 form required"
                                : "pa2 br2 input-reset ba bg-transparent w-100 form error"
                            }
                            type="password"
                            placeholder="Confirm Password"
                            name="password"
                            id="confirmpassword"
                            onChange={this.onPasswordConfirmChange}
                          />
                          {this.state.passwordmatchingerror ? (
                            ""
                          ) : (
                            <h6 className="red">password not match</h6>
                          )}
                        </div>
                      </fieldset>
                      <button className="tc btn grow white link ph3 mb2 dib bg-dark-green" onClick={this.onSubmitRegister}>Register</button>
                    </div>
                  </main>
                </article>
              </Dialog>
            </MuiThemeProvider>
          </div>
        ) : (
          <Redirect to={`/LoggedIn/${this.state.id}`} />
        )}
      </div>
    );
  }
}
