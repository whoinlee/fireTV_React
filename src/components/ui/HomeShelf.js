import React, { Component } from 'react'
import ShelfTile from './ShelfTile';
import PropTypes from 'prop-types';
import {TweenLite, Power2, Power3} from 'gsap';


const TL = TweenLite; // eslint-disable-line
const stdDuration = .5;

const shelfKindObj	= {
  BASE: 0,
  FOCUSED: 1,
  BLOOMED: 2
};

const initX         =	200;
const tileBaseWidth	= 	[320, 375, 782];                	//shelfTile: 320x180, 375x210, 782x440
// const tileBaseOffset= [0, 24, 58];                   	//offset between tiles adjacent
// const tileShiftX 	= [0, (375-320), (782-375)]			//as the selected tile (1st in the queue) blooms, the next tiles in the queue shift by tileShiftX
// const tileOffsetX   = tileBaseWidth[shelfKindObj.BASE] + tileBaseOffset[shelfKindObj.BASE];  //distance between the beginning of previous tile to the beginning of next tile
const maxTileIndex	= 	Math.floor(1920/320);				//stageWidth/tileBaseWidth
// const waitToDetailDuration  =10;



class HomeShelf extends Component {
	constructor(props) {
		super(props)
		this.state = {
			shelfKind: shelfKindObj.BASE,
			isSelected: false,
			topContainerTop: this.props.y
		}
		this.tiles = [];	//original tiles
		this.tileQueue = [];//based on current lcoation
		this.totalTiles = props.shows.length

		this.eachShelfTile = this.eachShelfTile.bind(this)
		this.select = this.select.bind(this)
		this.unselect = this.unselect.bind(this)
		this.opacityChange = this.opacityChange.bind(this)
	}

	componentWillMount() {
		this.topContainerStyle = {
			top: this.props.y + 'px',
			opacity: 1
		}
		//TODO: variable height

		//TODO: title style
		this.titleContainerStyle = {
			left: initX + 'px'
		}
	}

	select = () => {
		console.log("INFO HomeShelf :: select, shelf", this.props.index)
		this.opacityChange(1)
		//update title size and location
		//TL.to(this.titleNode, stdDuration, {})

		//-- show the titles of unselected tiles
		const totalTiles = this.totalTiles
	    for (var i = 1; i < totalTiles; i++) {
	      this.tiles[i].toExpanded()
	    }
	}

	unselect = () => {
		console.log("INFO HomeShelf :: unselect, shelf", this.props.index)
		this.opacityChange(.6)
		//update title size and location
		//update each tiles

		const totalTiles = this.totalTiles
		this.tiles[0].backToOrg()
	    for (var i = 1; i < totalTiles; i++) {
	      this.tiles[i].backToOrg()
	    }
	}

	opacityChange = (val) => {
		// console.log("INFO HomeShelf :: opacityChange, opacity is ", val)
		this.topContainerStyle = {
			top: this.state.topContainerTop + 'px',
			opacity: val
		}
		// console.log("INFO HomeShelf :: opacityChange, this.topContainerStyle.opacity is ", this.topContainerStyle.opacity)
	}

	eachShelfTile(tileObj, i) {
		//const totalTiles = this.props.shows.length
		const leftX = ( (i < maxTileIndex) || (i < (this.totalTiles - 1)) )? initX + tileBaseWidth[shelfKindObj.BASE]*i : initX - tileBaseWidth[shelfKindObj.BASE];
		return (
			<ShelfTile 	key={(i + 1).toString()}
				  		index={i}
				  		showTitle={tileObj.showTitle}
				  		episodeTitle={tileObj.episodeTitle}
				  		episodeID={tileObj.episode}
				  		imageURL={tileObj.imageURL}
				  		leftX={leftX} 
				  		ref={node => this.tiles.push(node)}>
		    </ShelfTile>
		)
	}

	render() {
		return (
			<div className="HomeShelf" 
				 id={"homeShelfContainer" + this.props.index} 
				 style={this.topContainerStyle}>
				<div className="homeShelfTitleContainer" 
					 style={this.titleContainerStyle}
					 ref={node => {this.titleNode = node}}>
					{this.props.title}
				</div>
				<div className="homeShelfTilesContainer" 
					 style={this.tileContainerStyle}>
					{this.props.shows.map(this.eachShelfTile)}
				</div>
			</div>
		)
	}
}

HomeShelf.propTypes = {
	title: PropTypes.string,
	index: PropTypes.number,
	id: PropTypes.string,
	shows: PropTypes.array,
	y: PropTypes.number
};

HomeShelf.defaultProps = {
  	title: "",
	index: 0,
	id: "HomeShelf0",
	shows: [],
	y: 62
};

export default HomeShelf