import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

ReactDOM.render(
	<App cards={cards} />,
	document.getElementById('root')
);

		let cards = [
			{
				id: 1,
				number: 0.234,
				image: "squirrel.jpg",
				clicked: false
			}, {
				id: 2,
				number: 0.546,
				image: "racoon.jpg",
				clicked: false
			}, {
				id: 3,
				number: 0.978,
				image: "skunk.jpg",
				clicked: false
			}, {
				id: 4,
				number: 0.788,
				image: "possum.jpg",
				clicked: false
			}, {
				id: 5,
				number: 0.045,
				image: "fox.jpg",
				clicked: false
			}, {
				id: 6,
				number: 0.472,
				image: "rabbit.jpg",
				clicked: false
			}
		];



class App extends React.Component {
	render() {
		return (
			<div>
				<StatusBar />
				<DisplayPanel cards={this.props.cards} />
			</div>
		);
	}
}

class DisplayPanel extends React.Component {
	render() {

		for (let i = 0; i < 9; i++) {
			array.push( Math.random() );
		}
		
		return (
			<div>
				{this.props.cards.map( card => <Card data={card} /> )}
			</div>
		);

	}
}

class Card extends React.Component {
	render() {

		let data = this.props.data;

		return (
			<div>
				<img src="{data.image}" height="150" width="150" />
			</div>
		);
	}
}