import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);

    this.state = {
        email: "",
        password: ""
    };
  }

  handleSubmit = (e) => {
      e.preventDefault();
      const apiUrl = 'https://jsramverkproject-api.jsramverk.me/register/';

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
          console.log("user: ", user);
          console.log(data);
      });
      this.routeChange();
  };


  handleChange = e => {
      let name = e.target.name;
      let value = e.target.value;
      this.setState({
      [name]: value
    })
  }

  routeChange() {
      alert("Skapad, du kan nu logga in");
      let path = "/logon";
      this.props.history.push(path);
  }

  render() {
    return (
        <div class="registerDiv">
            <h1>Registrera användare</h1>
            <form onSubmit={this.handleSubmit}>
            <label>
                <p>E-post:</p>
                <input type="text" name="email" onChange={this.handleChange} required />
            </label>
            <label>
                <p>Lösenord:</p>
                <input type="text" name="password" onChange={this.handleChange} required />
            </label><p>
            <input type="submit" value="Registrera" /></p>
          </form>
      </div>
    );
  }
}
export default Register;
