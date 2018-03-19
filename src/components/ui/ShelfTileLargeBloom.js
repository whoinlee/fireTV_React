import React, { Component } from 'react'
// import FaPencil from 'react-icons/lib/fa/pencil'
// import FaTrash from 'react-icons/lib/fa/trash'
// import FaFloppyO from 'react-icons/lib/fa/floppy-o'

// const tileKindObj = {
//   ORIGINAL: 0,
//   EXPANDED: 1,
//   FOCUSED: 2,
//   MED_BLOOMED: 3,
//   LG_BLOOMED: 4
// };

// const tileSizeArr = [
//   [320, 180],
//   [375, 210],
//   [590, 332],
//   [782, 440],
//   [1056, 594]
// ];

const leftX = 120;

class ShelfTileLargeBloom extends Component {
	constructor(props) {
		super(props)
		this.state = {
			
		}
	}

	// componentWillMount() {
	// 	this.style = {
	// 		left: leftX + this.props.index * 
	// 		top: '100px'
	// 	}
	// }

	/*
	<ShelfTile 	key={(i + 1).toString()}
				  		index={i}
				  		showTitle={tileObj.showTitle}
				  		episodeTitle={tileObj.episodeTitle}
				  		episodeID={tileObj.episode}
				  		imageURL={tileObj.imageURL}
				  		x={}>
	*/

	render() {
		return (
			<div className="shelfTile">
				<img src={this.props.imageURL}></img>
			</div>
		)
	}

}

export default ShelfTileLargeBloom
