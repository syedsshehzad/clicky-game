import React from "react";
import ReactDOM from "react-dom";


		let cards = [
			{
				key: 1,
				number: 0.234,
				image: "squirrel.jpg",
				clicked: false
			}, {
				key: 2,
				number: 0.546,
				image: "racoon.jpg",
				clicked: false
			}, {
				key: 3,
				number: 0.978,
				image: "skunk.jpg",
				clicked: false
			}, {
				key: 4,
				number: 0.788,
				image: "possum.jpg",
				clicked: false
			}, {
				key: 5,
				number: 0.045,
				image: "fox.jpg",
				clicked: false
			}, {
				key: 6,
				number: 0.472,
				image: "rabbit.jpg",
				clicked: false
			}
		];

		let data = {
			status: "WOOOO!",
			score: 23,
			topScore: 339
		};

class App extends React.Component {

	state = {
		status: "WOOOO!",
		score: 23,
		topScore: 339,
		order: [0, 1, 2, 3, 4, 5],
		clicked: [false, false, false, false, false, false]
	};

	shuffler = sequenceArray => {
		let arr = [];
		let newSequence = [];

		for (let i = 0; i < sequenceArray.length; i++) {
			arr[i] = {original: i, new: Math.random()};
		}

		arr.sort( (a, b) => a.new - b.new );
		
		for (let i = 0; i < arr.length; i++) {
			newSequence[i] = arr[i].original;
		}
		console.log(newSequence);

		return newSequence;
	}

	sorter = (objectArray, sequenceArray) => {
		let sendArray = [];

		for (let i = 0; i < sequenceArray.length; i++) {
			let index = sequenceArray[i];
			sendArray[i] = objectArray[index];
		}

		return sendArray;
	}
	
	handleOnClick = (a, b) => {
		let copiedState = this.state;

		if (b) {
			this.setState({
				status: "you lost",
				score: 0
			});
		} else {
			this.setState({score: this.state.score + 1});
		}
		

		// if (this.state.clicked[info - 1] == false) {
		// 	this.setState({clicked[1]: true});
		// 	this.setState({score: 6})
		// }
		console.log(a + " " + b);
		console.log(this.state);
		this.setState({order: this.shuffler(this.state.order)});
	}

	render() {
		console.log(this.props.data);
		
		let sendArray = this.sorter(this.props.cards, this.state.order);
		return (
			<div>
				<StatusBar 
				status={this.state.status} 
				score={this.state.score} 
				topScore={this.state.topScore} />
				<DisplayPanel
				cards={sendArray} 
				onClick={this.handleOnClick} />
			</div>
		);
	}
}

class DisplayPanel extends React.Component {
	handleOnClick = (a, b) => {
		this.props.onClick(a, b);
	};

	render() {
		return (
			<div>
				{this.props.cards.map( card => (<Card 
					key={card.key} 
					data={card} 
					onClick={this.handleOnClick} 
					/>) 
				)}
			</div>
		);
	}
}

class Card extends React.Component {
	state = {
		clicked: false
	};

	handleOnClick = () => {
		if (this.state.clicked == false) {
			this.props.onClick(this.props.data.key, false);
		} else if (this.state.clicked == true) {
			this.props.onClick(this.props.data.key, true);
		}
		this.setState({clicked: true});
	}

	render() {
		return (
			<div>
				<img key={this.props.data.key} 
				id={this.props.data.key} 
				src={this.props.data.image} 
				onClick={this.handleOnClick} 
				height="150" 
				width="150" 
				alt="" />
			</div>
		);
	}
}

class StatusBar extends React.Component {
	render() {
		return (
			<div>
				<p>Clicky Game</p>
				<p>{this.props.status}</p>
				<p>Score: {this.props.score}</p>
				<p>| Top Score: {this.props.topScore}</p>
			</div>
		);
	}
}

ReactDOM.render(
	<App cards={cards} data={data} />,
	document.getElementById('root')
);