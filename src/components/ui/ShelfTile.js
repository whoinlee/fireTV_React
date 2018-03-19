import React, { Component } from 'react'
// import FaPencil from 'react-icons/lib/fa/pencil'
// import FaTrash from 'react-icons/lib/fa/trash'
// import FaFloppyO from 'react-icons/lib/fa/floppy-o'

const tileKindObj = {
  ORIGINAL: 0,
  EXPANDED: 1,
  FOCUSED: 2,
  MED_BLOOMED: 3,
  LG_BLOOMED: 4
};

const tileSizeArr = [
  [320, 180],
  [375, 210],
  [590, 332],
  [782, 440],
  [1056, 594]
];

// const initX       = 200;
// const maxTileIndex= 6;

class ShelfTile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tileKind: tileKindObj.ORIGINAL,
			tileWidth: tileSizeArr[tileKindObj.ORIGINAL][0],
			tileHeight: tileSizeArr[tileKindObj.ORIGINAL][1]
		}
		//console.log("leftX:", props.leftX)
	}

	componentWillMount() {
		//const startX = (props.index < 6)? initX : (initX - )
		this.style = {
			left: this.props.leftX + 'px'
		}

		// this.className = (this.props.isPrevTile)? "shelfTilePrev" : "shelfTile";
		// console.log(this.props.index, this.className)
	}

	render() {
		return (
			<div className="ShelfTile" style={this.style}>
				<div className="baseShowImageContainer">
					<img src={this.props.imageURL} width={this.state.tileWidth} height={this.state.tileHeight} alt='tileImage'></img>
				</div>
				<div className="baseShowTitleContainer">
					{this.props.showTitle} 
					<span className="baseEpisodeID">{this.props.episodeID}</span>
				</div>
			</div>
		)
	}

}

export default ShelfTile
