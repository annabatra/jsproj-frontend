import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        email: "",
        password: ""
    };
  }

  handleSubmit = (e) => {
      e.preventDefault();
      const apiUrl = 'https://jsramverkproject.jsramverk.me/login/';

      const user = {
          "email": this.state.email,
          "password": this.state.password
      }

      fetch(apiUrl, {
          method: "POST",
          headers: {
              'Content-type': 'application/json'
          },
          body: JSON.stringify(user)
      })
      .then((response) => response.json())
      .then(data => {
          if (data.data) {
              localStorage.setItem('token', data.data.token);
              alert("Inloggad!");
              this.props.history.push("/");

          } else {
              alert("Fel användare eller lösenord, försök igen.");
          }
      });
  };


  handleChange = e => {
      let name = e.target.name;
      let value = e.target.value;
      this.setState({
      [name]: value
    })
  }



  render() {
    return (
        <div class="registerDiv">
            <h1>Logga in</h1>
            <form onSubmit={this.handleSubmit}>
            <label>
                <p>E-post:</p>
                <input type="text" name="email" onChange={this.handleChange} required />
            </label>
            <label>
                <p>Lösenord:</p>
                <input type="password" name="password" onChange={this.handleChange} required />
            </label><p>
            <input type="submit" value="Login" /></p>
          </form>
      </div>
    );
  }
}
export default Login;
