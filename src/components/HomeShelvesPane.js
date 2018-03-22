import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HomeShelf from './ui/HomeShelf';
import '../styles/HomeShelvesPane.css';
// import {TweenLite} from '../tween/TweenLite';
// import {Power2} from '../tween/easing/EasePack';
// import animation from './animation';


const TL = TweenLite; // eslint-disable-line
const initGlobalNavY  = 0;
const initHomeHeroY   = 165;
const initContainerY  = 836;   //(100(globalNav)+65(offset)+606(homeHero)+65) = 836                        
const shelvesDataArr  = [
  {
    title:'up next (7) ',
    shows:[
        {showTitle: "Top Chef", episodeTitle: "Now That's a lot of Schnitzel", episode: 'S15 E6', imageURL: '../assets/images/shows/topChef-s15e06-1056x594.jpg'},
        {showTitle: "Top Chef", episodeTitle: "Something Old, Something New", episode: 'S14 E1', imageURL: '../assets/images/shows/topChef-s14e01-1056x594.jpg'},
        {showTitle: "Below Deck", episodeTitle: "Only Doing It for the Money", episode: 'S5 E11', imageURL: '../assets/images/shows/belowDeck-s05e11-1056x594.jpg'},
        {showTitle: "Real Housewives", episodeTitle: "When Chairs Fly", episode: 'S8 E9', imageURL: '../assets/images/shows/rhofNJ-s08e09-1056x594.jpg'},
        {showTitle: "Imposters", episodeTitle: "Always Forward, Never Back", episode: 'S1 E10', imageURL: '../assets/images/shows/imposters-s01e10-1056x594.jpg'},
        {showTitle: "Real Housewives", episodeTitle: "Another Spin Around the Block", episode: 'S9 E4', imageURL: '../assets/images/shows/rhofAT-s09e04-1056x594.jpg'},
        {showTitle: "Top Chef", episodeTitle: "Shrimp Boats and Hat Ladies", episode: 'S14 E10', imageURL: '../assets/images/shows/topChef-s14e10-1056x594.jpg'}
      ]
  },
  {
    title:'recently added (5)',
    shows:[
        {showTitle: "Top Chef", episodeTitle: "Episode Title", episode: 'S00 E0', imageURL: '../assets/images/shows/topChef-general-1056x594.jpg'},
        {showTitle: "Top Chef", episodeTitle: "The Curse of the Bambino", episode: 'S12 E3', imageURL: '../assets/images/shows/topChef-s12e03-1056x594.jpg'},
        {showTitle: "Real Housewives", episodeTitle: "House of Shade and Dust", episode: 'S9 E1', imageURL: '../assets/images/shows/rhofAT-s09e01-1056x594.jpg'},
        {showTitle: "Real Housewives", episodeTitle: "Reunion, Part 3", episode: 'S9 E23', imageURL: '../assets/images/shows/rhofAT-s09e23-1056x594.jpg'},
        {showTitle: "Top Chef", episodeTitle: "Shrimp Boats and Hat Ladies", episode: 'S14 E10', imageURL: '../assets/images/shows/topChef-s14e10-1056x594.jpg'}
      ]
  },
  {
    title:'category 3 (1)',
    shows:[
       {showTitle: "Top Chef", episodeTitle: "Shrimp Boats and Hat Ladies", episode: 'S14 E10', imageURL: '../assets/images/shows/topChef-s14e10-1056x594.jpg'}
      ]
  },
  {
    title:'category 4 (2)',
    shows:[
        {showTitle: "Real Housewives", episodeTitle: "When Chairs Fly", episode: 'S8 E9', imageURL: '../assets/images/shows/rhofNJ-s08e09-1056x594.jpg'},
        {showTitle: "Top Chef", episodeTitle: "Shrimp Boats and Hat Ladies", episode: 'S14 E10', imageURL: '../assets/images/shows/topChef-s14e10-1056x594.jpg'}
      ]
  },
  {
    title:'category 5 (3)',
    shows:[
        {showTitle: "Below Deck", episodeTitle: "Only Doing It for the Money", episode: 'S5 E11', imageURL: '../assets/images/shows/belowDeck-s05e11-1056x594.jpg'},
        {showTitle: "Real Housewives", episodeTitle: "When Chairs Fly", episode: 'S8 E9', imageURL: '../assets/images/shows/rhofNJ-s08e09-1056x594.jpg'},
        {showTitle: "Top Chef", episodeTitle: "Shrimp Boats and Hat Ladies", episode: 'S14 E10', imageURL: '../assets/images/shows/topChef-s14e10-1056x594.jpg'}
      ]
  },
  {
    title:'category 6 (4)',
    shows:[
        {showTitle: "Top Chef", episodeTitle: "The Curse of the Bambino", episode: 'S12 E3', imageURL: '../assets/images/shows/topChef-s12e03-1056x594.jpg'},
        {showTitle: "Imposters", episodeTitle: "Always Forward, Never Back", episode: 'S1 E10', imageURL: '../assets/images/shows/imposters-s01e10-1056x594.jpg'},
        {showTitle: "Real Housewives", episodeTitle: "When Chairs Fly", episode: 'S8 E9', imageURL: '../assets/images/shows/rhofNJ-s08e09-1056x594.jpg'},
        {showTitle: "Top Chef", episodeTitle: "Shrimp Boats and Hat Ladies", episode: 'S14 E10', imageURL: '../assets/images/shows/topChef-s14e10-1056x594.jpg'}
      ]
  }];
/*const shelvesDataArr  = [
  {
    title:'up next (7)',
    shows:[
        {showTitle: "Top Chef", episodeTitle: "Now That's a lot of Schnitzel", episode: 'S15 E6', imageURL: './assets/images/shows/topChef-s15e06-1056x594.jpg'},
        {showTitle: "Top Chef", episodeTitle: "Something Old, Something New", episode: 'S14 E1', imageURL: './assets/images/shows/topChef-s14e01-1056x594.jpg'},
        {showTitle: "Below Deck", episodeTitle: "Only Doing It for the Money", episode: 'S5 E11', imageURL: './assets/images/shows/belowDeck-s05e11-1056x594.jpg'},
        {showTitle: "Real Housewives", episodeTitle: "When Chairs Fly", episode: 'S8 E9', imageURL: './assets/images/shows/rhofNJ-s08e09-1056x594.jpg'},
        {showTitle: "Imposters", episodeTitle: "Always Forward, Never Back", episode: 'S1 E10', imageURL: './assets/images/shows/imposters-s01e10-1056x594.jpg'},
        {showTitle: "Real Housewives", episodeTitle: "Another Spin Around the Block", episode: 'S9 E4', imageURL: './assets/images/shows/rhofAT-s09e04-1056x594.jpg'},
        {showTitle: "Top Chef", episodeTitle: "Shrimp Boats and Hat Ladies", episode: 'S14 E10', imageURL: './assets/images/shows/topChef-s14e10-1056x594.jpg'}
      ]}
];*/

//-- (initShelfY + shelfBaseTitleHeight + shelfTitleTileOffset = 100) == the height of 'globalNav'
const initShelfY            = 62;       //(== shelfBaseOffset) (from container top to the shelf title)
const shelfBaseTitleHeight  = 28;       //title height for Helvetica Light 28px
const shelfTitleTileOffset  = 10;       //offset between title & tiles
const shelfBaseTileHeight   = 180;      //baseShelfTile: 320x180
const shelfBaseOffset       = 106;      //offset between shelves: from the bottom of previous shelf image to the top of next shelf title
//-- distance between unselected shelves: 10(yOffset between shelfTitle & shelfTitles)
const baseShelfOffsetY      = shelfBaseTitleHeight + shelfTitleTileOffset + shelfBaseTileHeight + shelfBaseOffset;
//-- distance between the selected shelf and the next unselected shelf
// const focusedShelfOffsetY   = baseShelfOffsetY + 75;              
// const waitToDetailDuration  =10;

const totalShelves = shelvesDataArr.length;
const maxIndex = totalShelves - 1;
const focusLocation = ['globalNav', 'homeHero', 'homeShelves'];



class HomeShelvesPane extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyPressed: "none",
      isGuideVisible: false,
      selectedShelfIndex: -1,
      focusLocationIndex: 0,
      shelvesTopY: initContainerY + 'px'
    }
    this.elts = [];
    this.shelves = [];
    this.containerShiftOffsetY = 0;

    this.doLeft = this.doLeft.bind(this)
    this.doRight = this.doRight.bind(this)
    this.doDown = this.doDown.bind(this)
    this.doUp = this.doUp.bind(this)
    this.doSelect = this.doSelect.bind(this)
    this.doBack = this.doBack.bind(this)
    this.doPausePlay = this.doPausePlay.bind(this)
    this.goToPlayer = this.goToPlayer.bind(this)
    this.goToDetail = this.goToDetail.bind(this)
    
    this.toggleGuides = this.toggleGuides.bind(this)
    this.eachHomeShelf = this.eachHomeShelf.bind(this)
    this.update = this.update.bind(this)
    this.updateSelectedShelf = this.updateSelectedShelf.bind(this)
  }

  componentWillMount() {
      document.addEventListener("keydown", this.onKeyPressed.bind(this));

      this.shelvesStyle = {
        top: initContainerY + 'px'
      }

      const rate = (Math.floor((window.innerWidth/this.props.width)*100))/100
      this.style = {
        zoom: rate
      }}

  componentWillUnmount() {document.removeEventListener("keydown", this.onKeyPressed.bind(this))}      

  onKeyPressed(e) {
    // console.log("e.keyCode == e.which:", e.keyCode);
    switch (e.keyCode) {
      case 37: 
        this.doLeft()
        break
      case 38: 
        this.doUp()
        break
      case 39: 
        this.doRight()
        break
      case 40: 
        this.doDown()
        break 
      case 13: 
        this.doSelect()
        break 
      case 66: //B
        this.doBack()
        break
      case 80: //P
        this.doPausePlay()
        break 
      case 71: //G
        this.toggleGuides()
        break
      default:
        this.setState({keyPressed: String.fromCharCode(e.keyCodep)})
    }
  }

  toggleGuides = () => this.setState({isGuideVisible: !this.state.isGuideVisible})

  doDown = () => {
    let focusLocationIndex = this.state.focusLocationIndex
    let selectedShelfIndex = this.state.selectedShelfIndex
    let topY = initContainerY
    //let opacity = 1
    switch (focusLocationIndex) {
      case 0:
        //-- from globalNav to homeHero
        focusLocationIndex = 1
        TL.to(this.elts[2], .5, {top: topY+'px', opacity: .6})
        break;
      case 1:
        //-- from homeHero to homeShelves
        focusLocationIndex = 2
        //-- CHECK, 12(?)
        topY = (this.props.height/2) - (initShelfY + shelfBaseTitleHeight + shelfTitleTileOffset + shelfBaseTileHeight/2 + 12)
        this.containerShiftOffsetY = initContainerY - topY
        //console.log("this.containerShiftOffsetY::", this.containerShiftOffsetY)
        selectedShelfIndex = 0  //the first shelf selected
        this.shelves[selectedShelfIndex].select()
        TL.to(this.elts[0], .5, {top: (initGlobalNavY-this.containerShiftOffsetY)+'px'})
        TL.to(this.elts[1], .5, {top: (initHomeHeroY-this.containerShiftOffsetY)+'px', opacity: .6})
        TL.to(this.elts[2], .5, {top: topY+'px', opacity: 1})
        break;
      case 2:
        //-- from homeShelves to homeShelves (selectedShelf changes)
        let prevShelfIndex = selectedShelfIndex
        if (selectedShelfIndex !== maxIndex) selectedShelfIndex++
        if (prevShelfIndex < selectedShelfIndex) {
          this.shelves[prevShelfIndex].unselect()
          this.shelves[selectedShelfIndex].select()
        }
        break;
      default:
        console.log("ERROR: errorIndex, " + focusLocationIndex)
    }//switch
    this.setState({ keyPressed: 'padDown',
                    selectedShelfIndex: selectedShelfIndex,
                    focusLocationIndex: focusLocationIndex,
                    shelvesTopY: topY + 'px'})
  }

  doUp = () => {
    let focusLocationIndex = this.state.focusLocationIndex
    let selectedShelfIndex = this.state.selectedShelfIndex
    let topY = initContainerY
    // let opacity = 1
    switch (focusLocationIndex) {
      case 2:
        if (selectedShelfIndex === 0) {
          //-- from homeShelves to homeHero
          selectedShelfIndex--
          focusLocationIndex--
          TL.to(this.elts[0], .5, {top: (initGlobalNavY)+'px'})
          TL.to(this.elts[1], .5, {top: (initHomeHeroY)+'px', opacity: 1})
          TL.to(this.elts[2], .5, {top: (initContainerY)+'px', opacity: .6})
        } else {
          //-- from homeShelves to homeShelves (selectedShelf changes)
          selectedShelfIndex--
        }
        
        //TODO: topY change
        break;
      case 1:
        //-- from homeHero to globalNav
        focusLocationIndex--
        TL.to(this.elts[2], .5, {opacity: 1})
        break;
      case 0:
        //-- from globalNav, no change
        break;
      default:
        console.log("ERROR: errorIndex, " + focusLocationIndex)
    }
    
    // console.log("\npadUp, focusLocationIndex:", focusLocationIndex)
    // console.log("padUp, selectedShelfIndex:", selectedShelfIndex)

    this.setState({
      keyPressed: 'padUp',
      selectedShelfIndex: selectedShelfIndex,
      focusLocationIndex: focusLocationIndex,
      shelvesTopY: topY + 'px'
    })}

  doLeft = () => this.setState({keyPressed: 'padLeft'})
  doRight = () => this.setState({keyPressed: 'padRight'})
  doSelect = () => this.setState({keyPressed: 'selectAction'})
  doBack = () => this.setState({keyPressed: 'goBack'})
  doPausePlay = () => this.setState({keyPressed: 'pausePlay'})

  goToPlayer = () => console.log('goToPlayer')
  goToDetail = () => console.log('goToDetail')
  addToWatchlist = () => console.log('addToWatchlist')
  removeFromWatchlist = () => console.log('removeFromWatchlist')
  onFocusComplete = () => console.log('onFocusComplete')
  onBloomComplete = () => console.log('onBloomComplete')
  // startBloomTimer = () => {
  //   this.startBloomTimerID = setInterval(
  //     () => this.bloomToLarge(),
  //     3000
  //   );
  // }
  // clearBloomTimer = () => {
  //   console.log('clearBloomTimer')
  //   clearInterval(this.startBloomTimerID)
  // }
  startDetailTimer = () => console.log('startDetailTimer')
  clearDetailTimer = () => console.log('clearDetailTimer')

  update = () => console.log('update')
  updateSelectedShelf = () => {}

  eachHomeShelf = (shelfObj, i) => {
    return (
      <HomeShelf  key={(i + 1).toString()}
                  index={i}
                  id={"HomeShelf" + i} 
                  title={shelfObj.title}
                  shows={shelfObj.shows}
                  y={initShelfY + i*baseShelfOffsetY}
                  ref={node => this.shelves.push(node)}>
      </HomeShelf>
    )}

  render() {
    return (
        <div id="HomeShelvesPane" style={this.style}>
          <div className={(this.state.focusLocationIndex === 0) ? "globalNavFocused" : "globalNav"} 
               ref={node => this.elts.push(node)}
               style={{top:initGlobalNavY + 'px'}}></div>
          <div className={(this.state.focusLocationIndex === 1) ? "homeHeroFocused" : "homeHero"} 
               ref={node => this.elts.push(node)}
               style={{top:initHomeHeroY + 'px'}}></div>
          <div className={(this.state.focusLocationIndex === 2) ? "homeShelvesFocused" : "homeShelves"} 
               ref={node => this.elts.push(node)}
               style={{top:initContainerY + 'px'}}>
            {shelvesDataArr.map(this.eachHomeShelf)}
          </div>
          <div id="keyPressed">
            keyPressed: <b>{this.state.keyPressed}</b>, focusOn: <b>{focusLocation[this.state.focusLocationIndex]}</b>
          </div>
          <div className={this.state.isGuideVisible ? "hLineVisible" : "hLineHidden"} style={{top:this.props.height/2 + 'px'}}></div>
        </div>
    )}
}

HomeShelvesPane.propTypes = {
 width:PropTypes.number,
 height:PropTypes.number}

HomeShelvesPane.defaultProps = {
  width: 1920,
  height:1080}

export default HomeShelvesPane;