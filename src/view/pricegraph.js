import React, { Component } from 'react';
import Chart from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';
import io from 'socket.io-client';

var usePrice = null;
var cookieVar = null;
var cookieType = null;


class Pricegraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            title: null,
            description: null,
            price: null,
            image: null,
            changingPrice: null,
            email: null,
            depot: null,
            cookie1: null,
            cookie2: null,
            cookie3: null
        }
        this.socket = io('https://socket-server.jsramverkproject.me.jsramverk.me');
    }


    componentDidMount() {
        if (localStorage.getItem('token')) {
            var id = this.props.match.params.id;
            var apiUrl = 'https://jsramverkproject-api.jsramverk.me/cookies/' + id;
            var email = localStorage.getItem('email');
            var emailUrl = 'https://jsramverkproject-api.jsramverk.me/userpage/' + email;

            this.socket.on('stocks', (cookies) => {
                var cookieID = id-1
                usePrice = cookies[cookieID].startingPoint;
                console.log(usePrice);
            });

            fetch(apiUrl)
                .then((response) => response.json())
                .then(data => {
                    this.setState({
                        id: data.data.id,
                        title: data.data.title,
                        description: data.data.description,
                        price: data.data.price,
                        image: data.data.image
                    });
                    this.chartCreation()
                });
            fetch(emailUrl)
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
    };

    chartCreation() {
        var chartColors = {
        	red: 'rgb(255, 99, 132)',
        	orange: 'rgb(255, 159, 64)',
        	yellow: 'rgb(255, 205, 86)',
        	green: 'rgb(75, 192, 192)',
        	blue: 'rgb(54, 162, 235)',
        	purple: 'rgb(153, 102, 255)',
        	grey: 'rgb(201, 203, 207)'
        };

        function onRefresh(chart) {
        	chart.config.data.datasets.forEach(function(dataset) {
        		dataset.data.push({
        			x: Date.now(),
        			y: usePrice
        		});
        	});
        }

        var color = Chart.helpers.color;
        var ctx = document.getElementById('myChart').getContext('2d');
        var newChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Prisutveckling',
                    backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
                    borderColor: chartColors.red,
                    fill: true,
                    lineTension: 0,
                    borderDash: [8, 4],
                }]
             },
            options: {
                title: {
        			display: false,
        			text: 'Line chart (hotizontal scroll) sample'
        		},
        		scales: {
        			xAxes: [{
        				type: 'realtime',
        				realtime: {
        					duration: 20000,
        					refresh: 1000,
        					delay: 2000,
        					onRefresh: onRefresh
        				}
        			}],
        			yAxes: [{
        				scaleLabel: {
        					display: true,
        					labelString: 'Pris per styck'
        				}
        			}]
        		},
        		tooltips: {
        			mode: 'nearest',
        			intersect: false
        		},
        		hover: {
        			mode: 'nearest',
        			intersect: false
        		}
            }
        });
    }

    handleTransaction = (e) => {
        e.preventDefault();
        console.log("Buying");

        if (this.state.depot < usePrice) {
            alert("Du har inte råd, fixa mer pengar!")
            window.location.href = "/userpage";
        } else {
            const buyUrl = 'https://jsramverkproject-api.jsramverk.me/buy/';

            const user = {
                "email": this.state.email,
                "id": this.state.id,
                "currentPrice": usePrice
            }

            fetch(buyUrl, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then((response) => response.json())
            .then(data => {
                alert("Kaka köpt, något mer?");
                this.props.history.push("/cookies");
            });
        }
    };

    handleTransactionSell = (e) => {
        e.preventDefault();
        console.log("Selling");

        if (this.state.id == 1) {
            cookieType = this.state.cookie1
        } else if (this.state.id == 2) {
            cookieType = this.state.cookie2
        } else if (this.state.id == 3) {
            cookieType = this.state.cookie3
        }

        // console.log(cookieType);
        // console.log("ovanför");

        if (cookieType <= 0) {
            alert("Du har inte fler kakor av denna typ!")
            window.location.href = "/cookies";
        } else {
            const sellUrl = 'https://jsramverkproject-api.jsramverk.me/sell/';

            const user = {
                "email": this.state.email,
                "id": this.state.id,
                "currentPrice": usePrice,
            }

            fetch(sellUrl, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then((response) => response.json())
            .then(data => {
                alert("Kaka såld, något mer?");
                this.props.history.push("/cookies");
            });
        }
    };

    render() {
        return (
            <div class="mypagemain">
                <h2>{this.state.title}</h2>
                <div className="mypageholder">
                    <div className="graphDiv">
                        <canvas id="myChart"></canvas>
                    </div>
                    <div className="buyHolder">
                        <p>Utgångspris: {this.state.price} kr/st</p>
                        <p><input className='button' type='button' value='Köp Kaka' onClick={this.handleTransaction}/></p>
                        <p><input className='button' type='button' value='Sälj Kaka' onClick={this.handleTransactionSell}/></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Pricegraph;
