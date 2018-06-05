import React from "react";
import { Redirect } from "react-router-dom";

import Dialog from "material-ui/Dialog";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
const muiTheme = getMuiTheme();

const customContentStyle = {
  width: "50%"
};

export default class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      id: "",
      loggedin: false,
      loggedinfalse: true
    };
  }
  onEmailChange = event => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignin = () => {
    if (this.state.signInEmail === "" || this.state.signInPassword === "") {
      this.setState({ loggedinfalse: false });
    } else {
      fetch("http://localhost:3000/SignIn", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.state.signInEmail,
          password: this.state.signInPassword
        })
      })
        .then(response => response.json())
        .then(user => {
          if (user.user_id) {
            this.setState({ id: user.user_id });
            console.log(this.state.id);
            this.setState({ loggedin: true });
          } else {
            this.setState({ loggedinfalse: false });
          }
        });
    }
  };

  render() {
    return (
      <div>
        {this.state.loggedin === false ? (
          <div>
            <MuiThemeProvider muiTheme={muiTheme}>
              <Dialog
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.handleDialogClose}
                contentStyle={customContentStyle}
              >
                <article >
                  <main className="pa4 black-80">
                    <div className="measure">
                      <fieldset
                        id="sign_up"
                        className="ba b--transparent ph0 mh0"
                      >
                        <legend className="f3 fw6 ph0 mh0 top">Sign In</legend>
                        <div className="mt3 login">
                          <input
                            className={
                              this.state.loggedinfalse
                                ? "pa2 input-reset ba bg-transparent br2 w-100 login"
                                : "pa2 br2 input-reset ba bg-transparent w-100 login error"
                            }
                            type="email"
                            placeholder="Email"
                            name="email-address"
                            id="email-address"
                            onChange={this.onEmailChange}
                          />
                        </div>
                        <div className="mv3 login">
                          <input
                            className={
                              this.state.loggedinfalse
                                ? "pa2 input-reset ba bg-transparent br2 w-100 login"
                                : "pa2 br2 input-reset ba bg-transparent w-100 login error"
                            }
                            type="password"
                            placeholder="Password"
                            name="password"
                            id="password"
                            onChange={this.onPasswordChange}
                          />
                        </div>
                      </fieldset>
                      {this.state.loggedinfalse ? (
                        ""
                      ) : (
                        <h6 className="red">Invalid User or Password</h6>
                      )}
                      <button className=' tc btn grow white link ph3 mb2 dib bg-dark-green' onClick={this.onSubmitSignin}>Sign In</button>
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
