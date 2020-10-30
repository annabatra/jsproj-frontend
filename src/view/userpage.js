import React from 'react';

class Userpage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            depot: null,
            changedepo: null,
            cookie1: null,
            cookie2: null,
            cookie3: null
        };
    }

    componentDidMount() {
    var seeIfLoggedIn = localStorage.getItem('token');
    if (seeIfLoggedIn) {
        console.log("INLOGGAD");
        var email = localStorage.getItem('email');
        var apiUrl = 'https://jsramverkproject-api.jsramverk.me/userpage/' + email;

        fetch(apiUrl)
            .then((response) => response.json())
            .then(data => {
                this.setState({
                    email: data.email,
                    depot: data.depot,
                    cookie1: data.cookie1,
                    cookie2: data.cookie2,
                    cookie3: data.cookie3
                });
            });
        } else {
            alert("Du måste vara inloggad!")
            this.props.history.push("/logon");
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const apiUrl = 'https://jsramverkproject-api.jsramverk.me/userpage/';

        const user = {
            "email": this.state.email,
            "changedepo": this.state.changedepo
        }

        fetch(apiUrl, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify(user)
        })
        .then((response) => response.json())
        .then(data => {
            alert("Insättning gjord!")
            document.getElementsByName('changedepo')[0].value = '';
            var updateDepo = parseInt(this.state.depot) + parseInt(this.state.changedepo);
            this.setState({
                depot: updateDepo
            });
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
            <div class="mypagemain">
                <h2>Personlig sida för: {this.state.email}</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="mypageholder">
                        <p>Nuvarande saldo: {this.state.depot} kr</p>
                        <label>
                            <p>Fyll på saldo: <input type="number" name="changedepo" onChange={this.handleChange} required /></p>
                            <p><input type="submit" value="Fyll på" /></p>
                        </label>
                        <p>Ditt nuvarande saldo för kakorna:</p>
                        <p>Chocolate Chip: {this.state.cookie1}</p>
                        <p>Red Velvet: {this.state.cookie2}</p>
                        <p>Grinch Cookies: {this.state.cookie3}</p>
                    </div>
                </form>
            </div>
        )
    }
}

export default Userpage;
