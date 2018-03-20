import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import logo from '../styles/logo.svg';
import '../styles/HomeShelvesPane.css';
import HomeShelf from './ui/HomeShelf';
import animation from './animation';

const initContainerY  = 836;   //650                          
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
//
const initShelfY            = 62;        // (== shelfBaseOffset)
const shelfBaseTitleHeight  = 28;       //title height for Helvetica Light 28px
const shelfTitleTileOffset  = 10;       //offset between title & tiles
const shelfBaseTileHeight   = 180;      //baseShelfTile: 320x180
const shelfBaseOffset       = 106;      //offset between shelves: from the bottom of previous shelf image to the top of next shelf title
//
//-- distance between unselected shelves: 10(yOffset between shelfTitle & shelfTitles)
const baseShelfOffsetY      = shelfBaseTitleHeight + shelfTitleTileOffset + shelfBaseTileHeight + shelfBaseOffset;  
// const focusedShelfOffsetY   = baseShelfOffsetY + 75;              //distance between the selected shelf and the next unselected shelf
// const waitToDetailDuration  =10;
//
const focusLocation = ['globalNav', 'homeHero', 'homeShelves'];


class HomeShelvesPane extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyPressed: "none",
      isGuideVisible: false,
      selectedShelfIndex: -1,
      focusOnLocationIndex: 0,
      topY: initContainerY
    }

    this.toggleGuides = this.toggleGuides.bind(this)
    //
    this.doLeft = this.doLeft.bind(this)
    this.doRight = this.doRight.bind(this)
    this.doDown = this.doDown.bind(this)
    this.doUp = this.doUp.bind(this)
    this.doSelect = this.doSelect.bind(this)
    this.doBack = this.doBack.bind(this)
    this.doPausePlay = this.doPausePlay.bind(this)
    this.goToPlayer = this.goToPlayer.bind(this)
    this.goToDetail = this.goToDetail.bind(this)
    //
    this.eachHomeShelf = this.eachHomeShelf.bind(this)
    this.update = this.update.bind(this)
    this.updateSelectedShelf = this.updateSelectedShelf.bind(this)
  }

  componentWillMount() {
      document.addEventListener("keydown", this.onKeyPressed.bind(this));
      // console.log('shelvesDataArr.length:', shelvesDataArr.length)
      this.shelvesStyle = {
        top: initContainerY + 'px'
      }

      const rate = (Math.floor((window.innerWidth/this.props.width)*100))/100
      this.style = {
        zoom: rate
      }
      //const rateH = window.innderHeight/this.props.height
      //let rate = (rateW > rateH)

      // this.setState({
      //   width: window.innerWidth + 'px',
      //   height: window.innerHeight + 'px',
      //   rate: (window.innderWidth/1920)});
      console.log('window.innerWidth:', window.innerWidth);
      console.log('window.innerHeight:', window.innerHeight);
      console.log('rate:', rate);
  }

  componentWillUnmount() {
      document.removeEventListener("keydown", this.onKeyPressed.bind(this));
  }      

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
      case 66: 
        this.doBack()
        break
      case 80: 
        this.doPausePlay()
        break 
      case 71:
        this.toggleGuides()
        break
      default:
        this.setState({
          keyPressed: String.fromCharCode(e.keyCodep)
        })
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
    let focusOnIndex = this.state.focusOnLocationIndex
    let selectedIndex = this.state.selectedShelfIndex;
    let topY = initContainerY;
    let opacity = 1;
    switch (focusOnIndex) {
      case 2:
        //-- from homeShelves to homeShelves (selectedShelf changes)
        if (selectedIndex !== maxIndex) selectedIndex++
        //TODO: topY change
        break;
      case 1:
        //-- from homeHero to homeShelves
        focusOnIndex++
        //-- CHECK?? 120??
        topY = initContainerY - (initShelfY + shelfBaseTitleHeight + shelfTitleTileOffset + shelfBaseTileHeight/2 + 115)
        selectedIndex++
        this.shelvesStyle = {
          top: topY + 'px',
          opacity: opacity
        }
        break;
      case 0:
        //-- from globalNav to homeHero
        focusOnIndex++
        opacity = .6;
        this.shelvesStyle = {
          top: initContainerY + 'px',
          opacity: opacity
        }
        break;
      default:
        console.log("ERROR: errorIndex, " + focusOnIndex)
    }
    
    console.log("\npadDown, focusOnIndex:", focusOnIndex)
    console.log("padDown, selectedIndex:", selectedIndex)
    // console.log("padDown, maxIndex:", maxIndex)
    this.setState({
      keyPressed: 'padDown',
      selectedShelfIndex: selectedIndex,
      focusOnLocationIndex: focusOnIndex,
      topY: topY
    })

    // console.log('opacity:', opacity) 
  }

  doUp() {
    let focusOnIndex = this.state.focusOnLocationIndex
    let selectedIndex = this.state.selectedShelfIndex;
    let topY = initContainerY;
    let opacity = 1;
    switch (focusOnIndex) {
      case 2:
        if (selectedIndex === 0) {
          //-- from homeShelves to homeHero
          selectedIndex--
          focusOnIndex--
          opacity = .6
          this.shelvesStyle = {
            top: topY + 'px',
            opacity: opacity
          }
        } else {
          //-- from homeShelves to homeShelves (selectedShelf changes)
          selectedIndex--
        }
        
        //TODO: topY change
        break;
      case 1:
        //-- from homeHero to globalNav
        focusOnIndex--
        opacity = 1
        //-- CHECK?? 120??
        this.shelvesStyle = {
          top: topY + 'px',
          opacity: opacity
        }
        break;
      case 0:
        //-- from globalNav, no change
        break;
      default:
        console.log("ERROR: errorIndex, " + focusOnIndex)
    }
    
    console.log("\npadUp, focusOnIndex:", focusOnIndex)
    console.log("padUp, selectedIndex:", selectedIndex)

    this.setState({
      keyPressed: 'padUp',
      selectedShelfIndex: selectedIndex,
      focusOnLocationIndex: focusOnIndex,
      topY: topY
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
    let isVisible = (this.state.isGuideVisible)? false:true
    this.setState({
      isGuideVisible: isVisible
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

  updateSelectedShelf()
  {

  }

  eachHomeShelf(shelfObj, i) {
    // const baseShelfOffsetY = this.baseShelfOffsetY;
    // console.log('baseShelfOffsetY::', baseShelfOffsetY);
    return (
      <HomeShelf  key={(i + 1).toString()}
                  index={i}
                  id={"HomeShelf" + i} 
                  title={shelfObj.title}
                  shows={shelfObj.shows}
                  y={initShelfY + i*baseShelfOffsetY}>
      </HomeShelf>
    )
  }

  render() {
    return (
        <div className="HomeShelvesPane" style={this.style}>
          <div className={(this.state.focusOnLocationIndex === 0) ? "globalNavFocused" : "globalNav"} ref={focusLocation[0]}></div>
          <div className={(this.state.focusOnLocationIndex === 1) ? "homeHeroFocused" : "homeHero"} ref={focusLocation[1]}></div>
          <div className={(this.state.focusOnLocationIndex === 2) ? "homeShelvesFocused" : "homeShelves"} style={this.shelvesStyle} ref={focusLocation[2]}>
            {shelvesDataArr.map(this.eachHomeShelf)}
          </div>
          <div className="keyPressed">
              keyPressed: <b>{this.state.keyPressed}</b>, focusOn: <b>{focusLocation[this.state.focusOnLocationIndex]}</b>
          </div>
          <div className={this.state.isGuideVisible ? "hLineVisible" : "hLineHidden"} ></div>
        </div>
    );
  }
}

HomeShelvesPane.propTypes = {
 width:PropTypes.number,
 height:PropTypes.number
};

HomeShelvesPane.defaultProps = {
  width: 1920,
  height:1080
};

export default HomeShelvesPane;