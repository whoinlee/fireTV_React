import React, { Component } from 'react';
import logo from '../styles/logo.svg';
import '../styles/HomeShelvesPane.css';
import HomeShelf from './ui/HomeShelf';

const initContainerY  = 650;
                                 
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
  }
];

/*
const shelvesDataArr  = [
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
      ]
  }
];*/

const totalShelves = shelvesDataArr.length;
const maxIndex = totalShelves - 1;

const initShelfY            = 106;      // (== shelfBaseOffset)
const shelfBaseTitleHeight  = 28;       //title height for Helvetica Light 28px
const shelfTitleTileOffset  = 10;       //offset between title & tiles
const shelfBaseTileHeight   = 180;      //baseShelfTile: 320x180
const shelfBaseOffset       = 106;      //offset between shelves: from the bottom of previous shelf image to the top of next shelf title
    
//-- distance between unselected shelves: 10(yOffset between shelfTitle & shelfTitles)
const baseShelfOffsetY      = shelfBaseTitleHeight + shelfTitleTileOffset + shelfBaseTileHeight + shelfBaseOffset;  
const focusedShelfOffsetY   = baseShelfOffsetY + 75;              //distance between the selected shelf and the next unselected shelf
const waitToDetailDuration  =10;
// const initY = 455;

class HomeShelvesPane extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyPressed: '',
      isFocused: false,
      selectedIndex: -1,
      selectedShelfY: null,
      guideVisibility: false
    }

    this.doLeft = this.doLeft.bind(this)
    this.doRight = this.doRight.bind(this)
    this.doDown = this.doDown.bind(this)
    this.doUp = this.doUp.bind(this)
    this.doSelect = this.doSelect.bind(this)
    this.doBack = this.doBack.bind(this)
    this.doPausePlay = this.doPausePlay.bind(this)
    this.goToPlayer = this.goToPlayer.bind(this)
    this.goToDetail = this.goToDetail.bind(this)
    this.eachHomeShelf = this.eachHomeShelf.bind(this)
    this.update = this.update.bind(this)
    this.toggleGuides = this.toggleGuides.bind(this)
  }

  componentWillMount() {
      document.addEventListener("keydown", this.onKeyPressed.bind(this));
      // console.log('shelvesDataArr.length:', shelvesDataArr.length)
      this.style = {
        top: initContainerY + 'px'
      }
  }

  componentWillUnmount() {
      document.removeEventListener("keydown", this.onKeyPressed.bind(this));
  }      

  onKeyPressed(e) {
    console.log("e.keyCode == e.which:", e.keyCode);
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
      case 66: 
        this.doBack()
        break
      case 80: 
        this.doPausePlay()
        break 
      case 71:
        this.toggleGuides()
      default:
        this.setState({
          keyPressed: String.fromCharCode(e.keyCodep)
        })
        break;
    }
  }

  doLeft() {
    //console.log('doLeft')
    //console.log('----------')
    this.setState({
      keyPressed: 'padLeft'
    })
  }

  doRight() {
    //console.log('doRight')
    //console.log('----------')
    this.setState({
      keyPressed: 'padRight'
    })
  }

  doDown() {
    //console.log('doDown')
    //coletnsole.log('----------')
    let selectedIndex = this.state.selectedIndex;
    if (selectedIndex != maxIndex) selectedIndex++
    this.setState({
      keyPressed: 'padDown',
      selectedIndex: selectedIndex
    })
  }

  doUp() {
    //console.log('doUp')
    //console.log('----------')
    this.setState({
      keyPressed: 'padUp'
    })
  }

  doSelect() {
    //console.log('doSelect')
    //console.log('----------')
    this.setState({
      keyPressed: 'selectAction'
    })
  }

  doBack() {
    this.setState({
      keyPressed: 'goBack'
    })
  }

  doPausePlay() {
    this.setState({
      keyPressed: 'pausePlay'
    })
  }

  toggleGuides() {
    let visibility = (this.state.guideVisibility)? false:true
    this.setState({
      guideVisibility: visibility
    })
  }

  goToPlayer() {
    console.log('goToPlayer')
  }

  goToDetail() {
    console.log('goToDetail')
  }

  addToWatchlist() {
    console.log('addToWatchlist')
  }

  removeFromWatchlist() {
    console.log('removeFromWatchlist')
  }

  addToWatchlist() {
    console.log('addToWatchlist')
  }

  removeFromWatchlist() {
    console.log('removeFromWatchlist')
  }

  onFocusComplete() {
    console.log('onFocusComplete')
  }

  onBloomComplete() {
    console.log('onBloomComplete')
  }

  startBloomTimer() {
    console.log('startBloomTimer')
  }

  clearBloomTimer() {
    console.log('clearBloomTimer')
  }

  startDetailTimer() {
    console.log('startDetailTimer')
  }

  clearDetailTimer() {
    console.log('clearDetailTimer')
  }

  update() {

  }

  eachHomeShelf(shelfObj, i) {
    // const baseShelfOffsetY = this.baseShelfOffsetY;
    // console.log('baseShelfOffsetY::', baseShelfOffsetY);
    return (
      <HomeShelf  key={(i + 1).toString()}
                  index={i}
                  title={shelfObj.title}
                  shows={shelfObj.shows}
                  y={initShelfY + i*baseShelfOffsetY}>
      </HomeShelf>
    )
  }

  render() {
    return (
        <div className="HomeShelvesPane">
          <div className="homeShelvesContainer" style={this.style}>
            {shelvesDataArr.map(this.eachHomeShelf)}
          </div>
          <div className="keyPressed">
              keyPressed: <b>{this.state.keyPressed}</b>
          </div>
          <div className={this.state.guideVisibility ? "hLineVisible" : "hLineHidden"} ></div>
        </div>
    );
  }
}

export default HomeShelvesPane;