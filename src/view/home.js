import React, { Component } from 'react';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: null, };
    }

    componentDidMount() {
        const apiUrl = 'https://jsramverkproject.jsramverk.me/';
        fetch(apiUrl)
            .then((response) => response.json())
            .then(data => {
                this.setState({ data });
                console.log(this.state.data);
            });
    }


    render() {
        return <div className="infoDiv"
            dangerouslySetInnerHTML={{__html: this.state.data}} >
        </div>
    }

}

export default Home;
