import React from "react";
import ReactDOM from "react-dom";

const styles = {
	title: {
		fontSize: "25px"
	},
	text: {
		fontSize: "16px"
	},
	card: {
		display: "inline-block",
		img: {
			height: "150px"
		}
	}
};

		let cards = [
			{
				key: 1,
				image: "squirrel.jpg"
			}, {
				key: 2,
				image: "racoon.jpg"
			}, {
				key: 3,
				image: "skunk.jpg"
			}, {
				key: 4,
				image: "possum.jpg"
			}, {
				key: 5,
				image: "fox.jpg"
			}, {
				key: 6,
				image: "rabbit.jpg"
			}, {
				key: 7,
				image: "deer.jpg"
			}, {
				key: 8,
				image: "groundhog.jpg"
			}, {
				key: 9,
				image: "duck.jpg"
			}, {
				key: 10,
				image: "mouse.jpg"
			}
		];


class App extends React.Component {

	state = {
		status: "Welcome to my game. Click on every animal once to win.",
		score: 0,
		topScore: 0,
		order: this.props.cards.map(card => card.key),
		reset: false
	};

	shuffler = sequenceArray => {
		let arr = [];
		let newSequence = [];

		for (let i = 0; i < sequenceArray.length; i++) {
			arr[i] = {original: i + 1, new: Math.random()};
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
			sendArray[i] = objectArray[index - 1];
		}

		return sendArray;
	}
	
	handleOnClick = (a, b) => {
		let copiedState = this.state;

		if (b) {
			this.setState({
				status: "you lost",
				score: 0,
				reset: true
			});
		} else {
			this.setState({
				score: this.state.score + 1,
				status: "Keep clicking - there are animals remaining"
			});

		}

		console.log(a + " " + b);
		console.log(this.state);
		this.setState({order: this.shuffler(this.state.order)});
	}

	componentDidUpdate() {
		console.log(this.props.cards);
		if (this.state.score > this.state.topScore) {
			this.setState({topScore: this.state.score});
		}
		if (this.state.score == this.props.cards.length && this.state.status != "You won!") {
			this.setState({
				reset: true,
				score: 0,
				status: "You won!"
			});
		}
	}

	resetter = (boolean) => {
		if (boolean) {
			this.setState({
				reset: false
			});
		}
	}

	render() {
		let sendArray = this.sorter(this.props.cards, this.state.order);
		console.log(this.state.order)
		console.log(this.state.reset)
		return (
			<div>
				<StatusBar 
				status={this.state.status} 
				score={this.state.score} 
				topScore={this.state.topScore} />
				<DisplayPanel
				cards={sendArray} 
				onClick={this.handleOnClick}
				reset={this.state.reset} 
				resetter={this.resetter} />
			</div>
		);
	}
}

class DisplayPanel extends React.Component {
	handleOnClick = (a, b) => {
		this.props.onClick(a, b);
	};

	render() {
		console.log(this.props.cards)
		return (
			<div>
				{this.props.cards.map( card => (<Card 
					key={card.key} 
					data={card} 
					onClick={this.handleOnClick} 
					reset={this.props.reset} 
					resetter={this.props.resetter}
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
			this.setState({clicked: true});
		} else if (this.state.clicked == true) {
			this.props.onClick(this.props.data.key, true);
		}
	
	}


	componentDidUpdate() {
		if (this.props.reset == true && this.state.clicked == true) {
			this.setState({clicked: false});
		} else if (this.props.reset == true && this.state.clicked == false) {
			this.props.resetter(true);

		}
		console.log(this.props.reset)
	}

	render() {


		return (
			<div className="card" style={styles.card}>
				<img key={this.props.data.key} 
				id={this.props.data.key} 
				src={this.props.data.image} 
				onClick={this.handleOnClick}  
				style={styles.card.img} 
				alt="" />
			</div>
		);
	}
}

class StatusBar extends React.Component {
	render() {
		return (
			<div>
				<p style={styles.title}>Clicky Game</p>
				<p style={styles.text}>{this.props.status}</p>
				<p style={styles.text}>Score: {this.props.score}</p>
				<p style={styles.text}>Top Score: {this.props.topScore}</p>
			</div>
		);
	}
}

ReactDOM.render(
	<App cards={cards} />,
	document.getElementById('root')
);