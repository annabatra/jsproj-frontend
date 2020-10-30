import React from 'react';

class Cookies extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //måste först fånga upp alla kakor så man kan visa dom innan man väljer id
            cookies: [],
        };
    }

    componentDidMount() {
        //var id = this.props.match.params.id;
        var apiUrl = 'https://jsramverkproject-api.jsramverk.me/cookies/';

        fetch(apiUrl)
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    cookies: data,
                });
                console.log(this.state.cookies)
            });
    }

    render() {
        var id = this.props.match.params.id;
        return (
            <div>
            <h2>KAKOR</h2>
            <div className="bigCookieHolder">

                {this.state.cookies.map((cookies) => (
                    <div className="cookieHolder">
                    <h3>{cookies.title}</h3>
                    <img src={require(`./img/${cookies.image}`)} alt={"picture"} />
                    <p>{cookies.description}</p>
                    <p>{cookies.price} kr/st</p>
                    <a class="pricebutton" href={"/pricegraph/" + cookies.id}>Prisutveckling</a>
                    </div>
               ))}
            </div>
            </div>
        )
    }
}

export default Cookies;
