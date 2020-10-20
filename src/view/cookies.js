import React from 'react';

class Cookies extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: null,
            image: null,
            description: null,
        };
    }

    componentDidMount() {
        var id = this.props.match.params.id;
        var apiUrl = 'https://jsramverkproject.jsramverk.me/cookies/' + id;

        fetch(apiUrl)
            .then((response) => response.json())
            .then(data => {
                this.setState({
                    title: data.data.title,
                    image: data.data.image,
                    description: data.data.description
                });
            });
    }

    render() {
        var url = window.location.href.slice(0, -1);
        var id = this.props.match.params.id;
        return (
            <div className="App">

            <nav className="reports">
                <a href={`${url}1`}>Cookie1</a>
                <a href={`${url}2`}>Cookie2</a>
                <a href={`${url}3`}>Cookie3</a>
            </nav><br/>
            <a href={"/buy/" + id} className="button">Investera</a>
            <br/><br/>
            <h2>{this.state.title}</h2>
            <article className="article-standard"
                dangerouslySetInnerHTML={{__html: this.state.description}} >
            </article>
            </div>
        )
    }
}

export default Cookies;
