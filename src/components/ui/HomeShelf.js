import React, { Component } from 'react'
import ShelfTile from './ShelfTile';
import PropTypes from 'prop-types';
import {TweenLite} from 'gsap';	//, Power3


const TL = TweenLite; // eslint-disable-line
const stdDuration = .5;

const shelfKindObj = {
  BASE: 0,
  FOCUSED: 1,
  BLOOMED: 2
};

const initX				= 200;
const tileBaseWidth		= [320, 375, 782];                	//shelfTile: 320x180, 375x210, 782x440
const tileBaseOffset	= [0, 24, 58];                   	//offset between tiles adjacent
const focusedTileWidth	= 590;
// const focusedTileHeight	= 332;
// const bloomedTileWidth	= 1056;
// const bloomedTileHeight	= 594;
// const tileShiftX 	= [0, (375-320), (782-375)]			//as the selected tile (1st in the queue) blooms, the next tiles in the queue shift by tileShiftX
// const tileOffsetX   = tileBaseWidth[shelfKindObj.BASE] + tileBaseOffset[shelfKindObj.BASE];  //distance between the beginning of previous tile to the beginning of next tile
const maxTileIndex		= Math.floor(1920/320);				//stageWidth/tileBaseWidth, max number of tiles in a row
const titleSelectedY 	= -90;
const titleUnselectedY	= 0;



class HomeShelf extends Component {
	constructor(props) {
		super(props)
		this.state = {
			shelfKind: shelfKindObj.BASE,
			isSelected: false,
			topContainerTop: this.props.y       //-- CHECK: need???
		}

		this.tiles = []							//original tiles
		//-- prevTileIndex: tileIndexQueue[0], currentTileIndex: tileIndexQueue[1], nextTileIndex: tileIndexQueue[2], and so on
		this.tileIndexQueue = [-1]				//tile index array based on current location, from prev, current, to next etc (staring from entering no index for the prev tile)
		
		this.prevTile = null
		this.currTile = null
		this.nextTile = null
		this.totalTiles = props.shows.length	//-- CHECK???? totalTiles=0 case?????

		this.reset = this.reset.bind(this)
		this.select = this.select.bind(this)
		this.unselect = this.unselect.bind(this)
		this.doLeft = this.doLeft.bind(this)
		this.doRight = this.doRight.bind(this)

		this.buildTileIndexQueue = this.buildTileIndexQueue.bind(this)
		this.opacityChange = this.opacityChange.bind(this)
		this.eachShelfTile = this.eachShelfTile.bind(this)

		this.buildTileIndexQueue()
	}

	componentWillMount() {
		//-- CHECK: need???
		this.topContainerStyle = {
			top: this.props.y + 'px',
			opacity: 1
		}
	}//componentWillMount

	buildTileIndexQueue = () => {
		console.log("INFO HomeShelf :: buildTileIndexQueue, this.props.shows.length ? ", this.props.shows.length)
		for (var i=0; i<this.totalTiles; i++) {
			const leftX = ( (i < maxTileIndex) || (i < (this.totalTiles - 1)) )? initX + tileBaseWidth[shelfKindObj.BASE]*i : initX - tileBaseWidth[shelfKindObj.BASE];
			if (leftX < initX) {
				//-- if prev tile exists
				if (this.tileIndexQueue[0] === -1) {
					this.tileIndexQueue[0] = i	//-- replace '-1' with 'i'
				}
			} else {
				if (this.tileIndexQueue[i+1] === undefined) {
					this.tileIndexQueue[i+1] = i
				}
			}
		}
		console.log("INFO HomeShelf :: buildTileIndexQueue, this.tileIndexQueue ? ", this.tileIndexQueue)
	}

	reset = () => {
		console.log("INFO HomeShelf :: reset", this.props.index)
	}//reset

	select = () => {
		console.log("INFO HomeShelf :: select, shelf", this.props.index)
		this.setState({shelfKind: shelfKindObj.FOCUSED, isSelected:true})	//TO CHECK:: topContainerTop
		this.opacityChange(1)

		//-- shelf "title" animation: location & font size change
		TL.to(this.titleNode, stdDuration, {top: titleSelectedY + 'px', scale: 1.5})	//-90

		//const totalTiles = this.totalTiles
	    //-- prev tile
	    const prevTileIndex = this.tileIndexQueue[0]
	    //console.log("INFO HomeShelf :: select, prevTileIndex is ", prevTileIndex)

	    if (prevTileIndex !== -1) {
	    	this.prevTile = this.tiles[prevTileIndex]
	    	const prevX = initX - tileBaseWidth[shelfKindObj.FOCUSED] - tileBaseOffset[shelfKindObj.FOCUSED]
	    	this.prevTile.toExpanded(prevX)
	    }

	    //-- current tile
	    const currTileIndex = this.tileIndexQueue[1]
	    this.currTile = this.tiles[currTileIndex]
	    this.currTile.toFocused()
	    //console.log("INFO HomeShelf :: select, currTileIndex is ", currTileIndex)

	    //-- next tile and the rest of tiles
	    let nextTileIndex
	    let nextX 
	    //console.log("INFO HomeShelf :: select, this.tileIndexQueue.length is ", this.tileIndexQueue.length)
	    //console.log("INFO HomeShelf :: select, this.tileIndexQueue is ", this.tileIndexQueue)

	    if (this.tileIndexQueue.length > 2) {
		    nextTileIndex = this.tileIndexQueue[2]
		    //console.log("INFO HomeShelf :: select, nextTileIndex is ??? ", nextTileIndex)
		    this.nextTile  = this.tiles[nextTileIndex]
		    nextX = initX + focusedTileWidth + tileBaseOffset[shelfKindObj.FOCUSED]
		    this.nextTile.toExpanded(nextX)

		    const lastTileIndex = (prevTileIndex === -1)? this.totalTiles : this.totalTiles - 1
		    for (var j = 3; j <= lastTileIndex; j++) {
		    	nextTileIndex = this.tileIndexQueue[j]
		    	//console.log("INFO HomeShelf :: select, nextTileIndex is ??? ", nextTileIndex)
		    	let targetTile = this.tiles[nextTileIndex]
		    	nextX += tileBaseWidth[shelfKindObj.FOCUSED] + tileBaseOffset[shelfKindObj.FOCUSED]
		    	targetTile.toExpanded(nextX)
		    }
		}

		//console.log("INFO HomeShelf :: select, nextTileIndex is ", nextTileIndex)
	}//select

	unselect = () => {
		//console.log("INFO HomeShelf :: unselect, shelf", this.props.index)
		this.setState({shelfKind: shelfKindObj.BASE, isSelected:false})	//TO CHECK:: topContainerTop
		this.opacityChange(.6)

		//-- shelf title animation: location & font size change
		TL.to(this.titleNode, stdDuration, {top: titleUnselectedY + 'px', scale: 1})	//-90

		//-- prev tile
		const prevTileIndex = this.tileIndexQueue[0]
	    if (prevTileIndex !== -1) {
	    	this.prevTile = this.tiles[prevTileIndex]
	    	const prevX = initX - tileBaseWidth[shelfKindObj.BASE] - tileBaseOffset[shelfKindObj.BASE]
	    	this.prevTile.backToOrg(prevX)
	    }

		//-- current tile
	    const currTileIndex = this.tileIndexQueue[1]
	    this.currTile = this.tiles[currTileIndex]
	    this.currTile.backToOrg(initX)

	    //-- next tile and the rest of tiles
	    let nextTileIndex
	    let nextX 
	    if (this.tileIndexQueue.length > 2) {
		    nextTileIndex = this.tileIndexQueue[2]
		    this.nextTile  = this.tiles[nextTileIndex]
		    nextX = initX + tileBaseWidth[shelfKindObj.BASE] + tileBaseOffset[shelfKindObj.BASE]
		    this.nextTile.backToOrg(nextX)

		    //-- the rest (CHECK the last one, when inited)
		    const lastTileIndex = (prevTileIndex === -1)? this.totalTiles : this.totalTiles - 1
		    for (var j = 3; j <= lastTileIndex; j++) {
		    	nextTileIndex = this.tileIndexQueue[j]
		    	let targetTile = this.tiles[nextTileIndex]
		    	nextX += tileBaseWidth[shelfKindObj.BASE] + tileBaseOffset[shelfKindObj.BASE]
		    	targetTile.backToOrg(nextX)
		    }
		}
	}//unselect

	doLeft = () => {
		//console.log("INFO HomeShelf :: doLeft//moveToRight, shelf", this.props.index)
		if (this.totalTiles > 1) {
			console.log("\n")
			//console.log("INFO HomeShelf :: doLeft//moveToRight, this.totalTiles ?? ", this.totalTiles)
			console.log("INFO HomeShelf :: doLeft/moveToRight, this.tileIndexQueue  before ? ", this.tileIndexQueue)

			//-- move the rightMostTile to the leftEnd
			const rightMostTileIndex = this.tileIndexQueue[this.tileIndexQueue.length - 1]
			const rightMostTile = this.tiles[rightMostTileIndex]
			const leftOffset = tileBaseWidth[shelfKindObj.FOCUSED] + tileBaseOffset[shelfKindObj.FOCUSED]
			const prevX = initX - leftOffset
			const leftMostX = (this.prevTile === null)? prevX : prevX - leftOffset
			rightMostTile.changeXLocTo(leftMostX)

			// -- update prevTile, currTile, and nextTile
			this.nextTile = this.currTile

			if (this.prevTile) {
				this.currTile = this.prevTile
				this.prevTile = rightMostTile
				this.prevTile.toExpanded(prevX)
			} else {
				this.currTile = rightMostTile
				this.prevTile = null
			}
			this.currTile.toFocused(initX)

			let nextX = initX + focusedTileWidth + tileBaseOffset[shelfKindObj.FOCUSED]
			this.nextTile.toExpanded(nextX)

			//-- then start animating all tiles to the right
			let lastTileIndex = (this.prevTile === null)? this.totalTiles : this.totalTiles - 1
			if (lastTileIndex > maxTileIndex) lastTileIndex = maxTileIndex	//-- don't need to animate the tiles beyond stage width
			if (lastTileIndex) {
			    for (var j = 2; j < lastTileIndex; j++) {
			    	console.log("INFO HomeShelf :: doLeft/moveToRight, j ", j)
			    	let nextTileIndex = this.tileIndexQueue[j]
			    	//console.log("INFO HomeShelf :: select, nextTileIndex is ??? ", nextTileIndex)
			    	let targetTile = this.tiles[nextTileIndex]
			    	nextX += tileBaseWidth[shelfKindObj.FOCUSED] + tileBaseOffset[shelfKindObj.FOCUSED]
			    	targetTile.toExpanded(nextX)
			    }
		    }

		    //-- updateQueue
		    if (this.prevTile) {
		    	const prevIndex = this.tileIndexQueue.pop()
		    	this.tileIndexQueue.unshift(prevIndex)
		    } else {
		    	let leftQueue = [-1]	//for null prevTile index
		    	let rightQueue = this.tileIndexQueue.slice(1)
		    	const prevIndex = rightQueue.pop()
		    	rightQueue.unshift(prevIndex)
		    	this.tileIndexQueue = leftQueue.concat(rightQueue)
		    }
		    console.log("INFO HomeShelf :: doLeft/moveToRight, this.tileIndexQueue  after ? ", this.tileIndexQueue)
		}
	}//doLeft

	doRight = () => {
		//console.log("INFO HomeShelf :: doRight//moveToLeft, shelf", this.props.index)
		const noScale = true
		if (this.totalTiles > 1) {
			console.log("\n")
			console.log("INFO HomeShelf :: doRight/moveToLeft, this.tileIndexQueue  before ? ", this.tileIndexQueue)
			//-- move the rightMostTile to the leftEnd
			const leftOffset = tileBaseWidth[shelfKindObj.FOCUSED] + tileBaseOffset[shelfKindObj.FOCUSED]
			const prevX = initX - leftOffset

			// -- update prevTile, currTile, and nextTile
			//console.log("INFO HomeShelf :: doLeft//moveToRight, this.prevTile ?? ", this.prevTile)
			let prevPrevTile
			if (this.tileIndexQueue[0] !== -1) {
				// console.log("INFO HomeShelf :: doRight/moveToLeft, this.prevTile.props.index? ", this.prevTile.props.index)
				prevPrevTile = this.tiles[this.tileIndexQueue[0]]
				const prevPrevX = prevX - leftOffset
				prevPrevTile.toExpanded(prevPrevX, noScale)
				//TODO: on complete of the above, move the tile to the right most location
				//prevPrevTile.fadeInAt(nextX, stdDuration)
			}

			this.prevTile = this.tiles[this.tileIndexQueue[1]]
			this.prevTile.toExpanded(prevX)	//didn't work on 2nd try

			//this.currTile = this.nextTile
			if (this.tileIndexQueue[2]) {
				console.log("this.tileIndexQueue[2]???? " + this.tileIndexQueue[2])
				this.currTile = this.tiles[this.tileIndexQueue[2]]
				this.currTile.toFocused(initX)
			}

			let nextX = initX + focusedTileWidth + tileBaseOffset[shelfKindObj.FOCUSED]
			//-- then start animating all tiles to the right
			let lastTileIndex = (this.tileIndexQueue[0] === -1)? this.totalTiles : this.totalTiles - 1
			//if (lastTileIndex > maxTileIndex) lastTileIndex = maxTileIndex	//-- don't need to animate the tiles beyond stage width
			if (lastTileIndex) {
			    for (var j = 3; j <= lastTileIndex; j++) {
			    	//console.log("INFO HomeShelf :: doRight//moveToLeft, j ", j)
			    	let nextTileIndex = this.tileIndexQueue[j]
			    	//console.log("INFO HomeShelf :: select, nextTileIndex is ??? ", nextTileIndex)
			    	let targetTile = this.tiles[nextTileIndex]
			    	if (j === 3) this.nextTile = targetTile
			    	targetTile.toExpanded(nextX, noScale)
			    	nextX += tileBaseWidth[shelfKindObj.FOCUSED] + tileBaseOffset[shelfKindObj.FOCUSED]
			    }
		    }

		    // //TODO: 
		    if (prevPrevTile) {
		    	//-- give delay, then show as the last element
		    	prevPrevTile.fadeInAt(nextX, stdDuration)
		    }

		    //-- updateQueue
		    let prevTileIndex = this.tileIndexQueue.shift()
		    if (prevTileIndex !== -1) this.tileIndexQueue.push(prevTileIndex)
		    // if (this.prevTile) {
		    // 	const prevIndex = this.tileIndexQueue.pop()
		    // 	this.tileIndexQueue.unshift(prevIndex)
		    // } else {
		    // 	let leftQueue = [-1]	//for null prevTile index
		    // 	let rightQueue = this.tileIndexQueue.slice(1)
		    // 	const prevIndex = rightQueue.pop()
		    // 	rightQueue.unshift(prevIndex)
		    // 	this.tileIndexQueue = leftQueue.concat(rightQueue)
		    // }
		    console.log("INFO HomeShelf :: doRight/moveToLeft, this.tileIndexQueue  after ? ", this.tileIndexQueue)
		}
	}//doRight

	// moveTo = (targetY) => {}

	opacityChange = (val) => {
		this.topContainerStyle = {
			top: this.state.topContainerTop + 'px',
			opacity: val
		}
	}//opacityChange4

	eachShelfTile = (tileObj, i) => {
		if (i === 0) console.log("eachShelfTile!!!!", i)
		const leftX = ( (i < maxTileIndex) || (i < (this.totalTiles - 1)) )? initX + tileBaseWidth[shelfKindObj.BASE]*i : initX - tileBaseWidth[shelfKindObj.BASE];
		return (
			<ShelfTile 	key={(i + 1).toString()}
				  		index={i}
				  		showTitle={tileObj.showTitle}
				  		episodeTitle={tileObj.episodeTitle}
				  		episodeID={tileObj.episode}
				  		imageURL={tileObj.imageURL}
				  		leftX={leftX} 
				  		homeShelfIndex={this.props.index}
				  		ref={node => this.tiles.push(node)}>
		    </ShelfTile>
		)
	}//eachShelfTile

	render() {
		if (this.props.index === 0) {
			console.log("INFO HomeShelf :: render ", this.props.index)
			console.log("INFO HomeShelf :: render, tileIndexQueue : ", this.tileIndexQueue)
		}
		return (
			<div className="HomeShelf" 
				 id={"homeShelfContainer" + this.props.index} 
				 style={this.topContainerStyle}
				 ref={node => {this.homeShelfContainer = node}}>
				<div className="homeShelfTitleContainer" 
					 ref={node => {this.titleNode = node}}>
					{this.props.title}
				</div>
				<div className="homeShelfTilesContainer" 
					 style={this.tileContainerStyle}>
					{this.props.shows.map(this.eachShelfTile)}
				</div>
			</div>
		)
	}//render
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