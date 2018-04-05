import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HomeShelf from './ui/HomeShelf';
import '../styles/HomeShelvesPane.css';
import {TweenLite, Power3} from 'gsap';


const TL = TweenLite; // eslint-disable-line
const stdDuration = .5;
const initGlobalNavY    = 0;
const initHomeHeroY     = 165;
const initContainerY    = 836;   //(100(globalNav)+65(offset)+606(homeHero)+65) = 836                        
const initHomeShelvesY  = 836;   //(100(globalNav)+65(offset)+606(homeHero)+65) = 836                        
const shelvesDataArr = [
  {
    title:'up next',
    shows:[
        {showTitle: "Top Chef", episodeTitle: "Now That's a lot of Schnitzel", episode: 'S15 E6', 
        episodeDesc: "For the Quickfire, Padma and Richard Blais inspire the chefs using Tasty online videos and challenge them to transform the most laborious dishes from their own menus into accessible thirty minute dishes for home cooks. For the Quickfire, Padma and Richard Blais inspire the chefs using Tasty online videos and challenge them to transform the most laborious dishes from their own menus into accessible thirty minute dishes for home cooks.",
        imageURL: '../assets/images/shows/topChef-s15e06-1056x594.jpg'},
        {showTitle: "Top Chef", episodeTitle: "Something Old, Something New", episode: 'S14 E1', 
        episodeDesc: "Episode Description for S14 E1 goes here",
        imageURL: '../assets/images/shows/topChef-s14e01-1056x594.jpg'},
        {showTitle: "Below Deck", episodeTitle: "Only Doing It for the Money", episode: 'S5 E11', 
        episodeDesc: "Episode Description for S5 E11 goes here",
        imageURL: '../assets/images/shows/belowDeck-s05e11-1056x594.jpg'},
        {showTitle: "Real Housewives", episodeTitle: "When Chairs Fly", episode: 'S8 E9', 
        episodeDesc: "Episode Description for S8 E9 goes here",
        imageURL: '../assets/images/shows/rhofNJ-s08e09-1056x594.jpg'},
        {showTitle: "Imposters", episodeTitle: "Always Forward, Never Back", episode: 'S1 E10', 
        episodeDesc: "Episode Description for S1 E10 goes here",
        imageURL: '../assets/images/shows/imposters-s01e10-1056x594.jpg'},
        {showTitle: "Real Housewives", episodeTitle: "Another Spin Around the Block", episode: 'S9 E4', 
        episodeDesc: "Episode Description for S9 E4 goes here",
        imageURL: '../assets/images/shows/rhofAT-s09e04-1056x594.jpg'},
        {showTitle: "Top Chef", episodeTitle: "Shrimp Boats and Hat Ladies", episode: 'S14 E10', 
        episodeDesc: "Episode Description for S14 E10 goes here",
        imageURL: '../assets/images/shows/topChef-s14e10-1056x594.jpg'}
      ]
  },
  {
    title:'recently added (6)',
    shows:[
        {showTitle: "Top Chef", episodeTitle: "Now That's a lot of Schnitzel", episode: 'S15 E6', 
        episodeDesc: "For the Quickfire, Padma and Richard Blais inspire the chefs using Tasty online videos and challenge them to transform the most laborious dishes from their own menus into accessible thirty minute dishes for home cooks.",
        imageURL: '../assets/images/shows/topChef-s15e06-1056x594.jpg'},
        {showTitle: "Below Deck", episodeTitle: "Only Doing It for the Money", episode: 'S5 E11', 
        episodeDesc: "Episode Description for S15 E6 goes here",
        imageURL: '../assets/images/shows/belowDeck-s05e11-1056x594.jpg'},
        {showTitle: "Real Housewives", episodeTitle: "When Chairs Fly", episode: 'S8 E9', 
        episodeDesc: "Episode Description for S15 E6 goes here",
        imageURL: '../assets/images/shows/rhofNJ-s08e09-1056x594.jpg'},
        {showTitle: "Imposters", episodeTitle: "Always Forward, Never Back", episode: 'S1 E10', 
        episodeDesc: "Episode Description for S15 E6 goes here",
        imageURL: '../assets/images/shows/imposters-s01e10-1056x594.jpg'},
        {showTitle: "Real Housewives", episodeTitle: "Another Spin Around the Block", episode: 'S9 E4', 
        episodeDesc: "Episode Description for S9 E4 goes here",
        imageURL: '../assets/images/shows/rhofAT-s09e04-1056x594.jpg'},
        {showTitle: "Top Chef", episodeTitle: "Shrimp Boats and Hat Ladies", episode: 'S14 E10', 
        episodeDesc: "Episode Description for S14 E10 goes here",
        imageURL: '../assets/images/shows/topChef-s14e10-1056x594.jpg'}
      ]
  },
  {
    title:'category 3 (5)',
    shows:[
        {showTitle: "Top Chef", episodeTitle: "Episode Title", episode: 'S00 E0', 
        episodeDesc: "Episode Description for S00 E0 goes here",
        imageURL: '../assets/images/shows/topChef-general-1056x594.jpg'},
        {showTitle: "Top Chef", episodeTitle: "The Curse of the Bambino", episode: 'S12 E3', 
        episodeDesc: "Episode Description for S12 E3 goes here",
        imageURL: '../assets/images/shows/topChef-s12e03-1056x594.jpg'},
        {showTitle: "Real Housewives", episodeTitle: "House of Shade and Dust", episode: 'S9 E1', 
        episodeDesc: "Episode Description for S9 E1 goes here",
        imageURL: '../assets/images/shows/rhofAT-s09e01-1056x594.jpg'},
        {showTitle: "Real Housewives", episodeTitle: "Reunion, Part 3", episode: 'S9 E23', 
        episodeDesc: "Episode Description for S9 E23 goes here",
        imageURL: '../assets/images/shows/rhofAT-s09e23-1056x594.jpg'},
        {showTitle: "Top Chef", episodeTitle: "Shrimp Boats and Hat Ladies", episode: 'S14 E10', 
        episodeDesc: "Episode Description for S14 E10 goes here",
        imageURL: '../assets/images/shows/topChef-s14e10-1056x594.jpg'}
      ]
  },
  {
    title:'category 4 (4)',
    shows:[
        {showTitle: "Top Chef", episodeTitle: "The Curse of the Bambino", episode: 'S12 E3', 
        episodeDesc: "Episode Description goes here",
        imageURL: '../assets/images/shows/topChef-s12e03-1056x594.jpg'},
        {showTitle: "Imposters", episodeTitle: "Always Forward, Never Back", episode: 'S1 E10', 
        episodeDesc: "Episode Description goes here",
        imageURL: '../assets/images/shows/imposters-s01e10-1056x594.jpg'},
        {showTitle: "Real Housewives", episodeTitle: "When Chairs Fly", episode: 'S8 E9', 
        episodeDesc: "Episode Description goes here",
        imageURL: '../assets/images/shows/rhofNJ-s08e09-1056x594.jpg'},
        {showTitle: "Top Chef", episodeTitle: "Shrimp Boats and Hat Ladies", episode: 'S14 E10', 
        episodeDesc: "Episode Description goes here",
        imageURL: '../assets/images/shows/topChef-s14e10-1056x594.jpg'}
      ]
  },
  {
    title:'category 5 (3)',
    shows:[
        {showTitle: "Below Deck", episodeTitle: "Only Doing It for the Money", episode: 'S5 E11', 
        episodeDesc: "Episode Description goes here",
        imageURL: '../assets/images/shows/belowDeck-s05e11-1056x594.jpg'},
        {showTitle: "Real Housewives", episodeTitle: "When Chairs Fly", episode: 'S8 E9', 
        episodeDesc: "Episode Description goes here",
        imageURL: '../assets/images/shows/rhofNJ-s08e09-1056x594.jpg'},
        {showTitle: "Top Chef", episodeTitle: "Shrimp Boats and Hat Ladies", episode: 'S14 E10', 
        episodeDesc: "Episode Description goes here",
        imageURL: '../assets/images/shows/topChef-s14e10-1056x594.jpg'}
      ]
  },
    {
    title:'category 6 (2)',
    shows:[
        {showTitle: "Real Housewives", episodeTitle: "When Chairs Fly", episode: 'S8 E9', 
        episodeDesc: "Episode Description goes here",
        imageURL: '../assets/images/shows/rhofNJ-s08e09-1056x594.jpg'},
        {showTitle: "Top Chef", episodeTitle: "Shrimp Boats and Hat Ladies", episode: 'S14 E10', 
        episodeDesc: "Episode Description goes here",
        imageURL: '../assets/images/shows/topChef-s14e10-1056x594.jpg'}
      ]
  },
   {
    title:'category 7(1)',
    shows:[
       {showTitle: "Top Chef", episodeTitle: "Shrimp Boats and Hat Ladies", episode: 'S14 E10', 
       episodeDesc: "Episode Description goes here",
       imageURL: '../assets/images/shows/topChef-s14e10-1056x594.jpg'}
      ]
  }
];

//-- (initShelfY + shelfBaseTitleHeight + shelfTitleTileOffset = 100) == the height of 'globalNav'
const initShelfY            = 62;       //(== shelfBaseOffset) (from container top to the shelf title)
const shelfBaseTitleHeight  = 28;       //title height for Helvetica Light 28px
const shelfTitleTileOffset  = 10;       //offset between title & tiles
const shelfBaseTileHeight   = 180;      //baseShelfTile: 320x180
const shelfBaseOffset       = 106;      //offset between shelves: from the bottom of previous shelf image to the top of next shelf title

//-- distance between unselected shelves
const baseShelfOffsetY      = shelfBaseTitleHeight + shelfTitleTileOffset + shelfBaseTileHeight + shelfBaseOffset;
//-- distance between the focused(selected) shelf and the next unselected shelf
const focusedShelfShiftY    = 76;       //76 = (332-180)/2 (focusedH - baseH)
const focusedShelfOffsetY   = baseShelfOffsetY + focusedShelfShiftY;  
const bloomedShelfShiftY    = 131;

const totalShelves = shelvesDataArr.length;
const maxIndex = totalShelves - 1;

const focusLocation = ['globalNav', 'homeHero', 'homeShelves'];
const globalNav = 0;
const homeHero = 1;
const homeShelves = 2;



class HomeShelvesPane extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyPressed: "none",
      isGuideVisible: false,
      focusLocationIndex: 0,
      selectedShelfIndex: -1,
      shelvesTopY: initContainerY + 'px'
    }
    this.elts = []
    this.shelves = []
    this.containerShiftOffsetY = 0
    this.prevShelf = null
    this.currShelf = null
    this.nextShelf = null
    this.isPrevMoved = false
    this.isNextMoved = false

    this.initGlobalNavY = initGlobalNavY
    this.upGlobalNavY = this.initGlobalNavY     
    //
    this.initHomeHeroY = initHomeHeroY
    this.upHomeHeroY = this.initHomeHeroY   
    this.upMidHomeHeroY = this.initHomeHeroY      
    this.upOffHomeHeroY = this.initHomeHeroY
    //
    this.initHomeShelvesY = initHomeShelvesY
    this.upHomeShelvesY = this.initHomeShelvesY  
    this.upOffHomeShelvesY = this.initHomeShelvesY 
    this.currHomeShelvesY = this.initHomeShelvesY

    this.doLeft = this.doLeft.bind(this)
    this.doRight = this.doRight.bind(this)
    this.doDown = this.doDown.bind(this)
    this.doUp = this.doUp.bind(this)
    this.doSelect = this.doSelect.bind(this)
    this.doBack = this.doBack.bind(this)
    this.doPausePlay = this.doPausePlay.bind(this)
    this.goToPlayer = this.goToPlayer.bind(this)
    this.goToDetail = this.goToDetail.bind(this)
    
    this.onKeyPressed = this.onKeyPressed.bind(this)
    this.toggleGuides = this.toggleGuides.bind(this)
    this.eachHomeShelf = this.eachHomeShelf.bind(this)
    this.selectTheFirstShelf = this.selectTheFirstShelf.bind(this)
    this.firstShelfOpacityUpdate = this.firstShelfOpacityUpdate.bind(this)
    this.onLargeBloomStart = this.onLargeBloomStart.bind(this)
  }

  componentWillMount() {
      document.addEventListener("keydown", this.onKeyPressed)

      this.shelvesStyle = {
        top: initContainerY + 'px'
      }

      const rate = (Math.floor((window.innerWidth/this.props.width)*100))/100
      this.style = {
        zoom: rate
      }
  }//componentWillMount

  componentWillUnmount() {document.removeEventListener("keydown", this.onKeyPressed)}      

  onKeyPressed = (e) => {
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
    }//switch
  }//onKeyPressed

  toggleGuides = () => this.setState({isGuideVisible: !this.state.isGuideVisible})

  doDown = () => {
    // console.log("INFO HomeShelvesPane :: doDown")
    let focusLocationIndex = this.state.focusLocationIndex
    let selectedShelfIndex = this.state.selectedShelfIndex
    let prevShelfIndex
    let nextShelfIndex
    let topY = initContainerY
    switch (focusLocationIndex) {
      case globalNav:
        //-- from globalNav to homeHero
        focusLocationIndex = homeHero
        TL.to(this.elts[2], stdDuration, {top: topY+'px'})
        this.firstShelfOpacityUpdate(.6)
        break;
      case homeHero:
        //-- from homeHero to homeShelves
        focusLocationIndex = homeShelves
        //-- CHECK:: 10 extra (from title size change?)
        topY = (this.props.height/2) - (initShelfY + shelfBaseTitleHeight + shelfTitleTileOffset + shelfBaseTileHeight/2 + 10)
        if (this.upGlobalNavY === this.initGlobalNavY) {
          this.containerShiftOffsetY = initContainerY - topY + 61   //61 = (332-180)/2
          //console.log("INFO HomeShelvesPane :: doDown, this.containerShiftOffsetY::", this.containerShiftOffsetY)
          this.upGlobalNavY = this.initGlobalNavY - this.containerShiftOffsetY
          this.upHomeHeroY = this.initHomeHeroY - this.containerShiftOffsetY
          this.upHomeShelvesY = topY
        }
        selectedShelfIndex = 0  //the first shelf selected
        nextShelfIndex = 1
        this.prevShelf = null
        this.currShelf = this.shelves[0]
        this.nextShelf = (nextShelfIndex < totalShelves) ? this.shelves[nextShelfIndex] : null
        this.selectTheFirstShelf() 

        TL.to(this.elts[globalNav], stdDuration, {top: this.upGlobalNavY+'px', ease:Power3.easeOut})              
        TL.to(this.elts[homeHero], stdDuration, {top: this.upHomeHeroY+'px', opacity: .6, ease:Power3.easeOut}) 
        TL.to(this.elts[homeShelves], stdDuration, {top: this.upHomeShelvesY+'px', opacity: 1, ease:Power3.easeOut})
        this.currHomeShelvesY = this.upHomeShelvesY
        // console.log("INFO HomeShelvesPane :: doDown case 1")
        break;
      case homeShelves:
        //-- from homeShelves to homeShelves (selectedShelf changes)
        if (this.isPrevMoved) {
          //-- it's on bloomed state
          this.prevShelf.backTo()
          this.isPrevMoved = false
        }
        if (this.isNextMoved) {
          //-- it's on bloomed state
          this.nextShelf.backTo()
          this.isNextMoved = false
        }

        prevShelfIndex = selectedShelfIndex
        if (selectedShelfIndex !== maxIndex) selectedShelfIndex++
        if (prevShelfIndex < selectedShelfIndex) {
          if (prevShelfIndex === 0) {
            //-- the 1st shelf is currently selected
            if (this.upOffHomeHeroY === this.initHomeHeroY) {
              this.upOffHomeHeroY = this.upHomeHeroY - focusedShelfOffsetY
              this.upOffHomeShelvesY = this.upHomeShelvesY - focusedShelfOffsetY
            } 
            this.currHomeShelvesY = this.upOffHomeShelvesY
            TL.to(this.elts[homeHero], stdDuration, {top: this.upOffHomeHeroY+'px', ease:Power3.easeOut})                
            TL.to(this.elts[homeShelves], stdDuration, {top: this.currHomeShelvesY+'px', opacity: 1, ease:Power3.easeOut}) 
          } else {
            this.currHomeShelvesY -= focusedShelfOffsetY
            TL.to(this.elts[homeShelves], stdDuration, {top: this.currHomeShelvesY+'px', opacity: 1, ease:Power3.easeOut})
          }
          nextShelfIndex = selectedShelfIndex + 1

          this.prevShelf = this.shelves[prevShelfIndex]
          this.currShelf = this.shelves[selectedShelfIndex]
          this.nextShelf = (nextShelfIndex < totalShelves) ? this.shelves[nextShelfIndex] : null
          this.prevShelf.unselect()
          this.currShelf.select()
        }
        break;
      default:
        console.log("ERROR: errorIndex, " + focusLocationIndex)
    }//switch
    this.setState({ 
      keyPressed: 'padDown',
      focusLocationIndex: focusLocationIndex,
      selectedShelfIndex: selectedShelfIndex,
      shelvesTopY: topY + 'px'
    })
  }//doDown

  doUp = () => {
    let focusLocationIndex = this.state.focusLocationIndex
    let selectedShelfIndex = this.state.selectedShelfIndex
    let prevShelfIndex
    let nextShelfIndex
    let topY = initContainerY
    // let opacity = 1
    switch (focusLocationIndex) {
      case globalNav:
        //-- from globalNav, no change
        break;
      case homeHero:
        //-- from homeHero to globalNav
        focusLocationIndex--
        this.firstShelfOpacityUpdate(1)
        this.prevShelf = null
        break;
      case homeShelves:
        if (this.isPrevMoved) {
          //-- it's on bloomed state
          this.prevShelf.backTo()
          this.isPrevMoved = false
        }
        if (this.isNextMoved) {
          //-- it's on bloomed state
          this.nextShelf.backTo()
          this.isNextMoved = false
        }
        if (selectedShelfIndex === 0) {
          //-- from homeShelves to homeHero
          prevShelfIndex = 0
          selectedShelfIndex--
          focusLocationIndex--

          this.prevShelf = this.shelves[prevShelfIndex]
          this.currShelf = null
          this.nextShelf = null

          this.prevShelf.unselect()
          // this.shelves[0].unselect()
          this.firstShelfOpacityUpdate(.6)
          TL.to(this.elts[globalNav], stdDuration, {top: this.initGlobalNavY+'px', ease:Power3.easeOut})
          TL.to(this.elts[homeHero], stdDuration, {top: this.initHomeHeroY+'px', opacity: 1, ease:Power3.easeOut})
          TL.to(this.elts[homeShelves], stdDuration, {top: this.initHomeShelvesY+'px', ease:Power3.easeOut})
          this.currHomeShelvesY = this.initHomeShelvesY
        } else {
          //-- from homeShelves to homeShelves (selectedShelf changes)
          prevShelfIndex = selectedShelfIndex
          if (prevShelfIndex === 1) {
            //-- currently, the 2nd shelf is selected
            TL.to(this.elts[homeHero], stdDuration, {top: this.upHomeHeroY+'px', ease:Power3.easeOut})     
            TL.to(this.elts[homeShelves], stdDuration, {top: this.upHomeShelvesY+'px', ease:Power3.easeOut}) 
            this.currHomeShelvesY = this.upHomeShelvesY
          } else {
            this.currHomeShelvesY += focusedShelfOffsetY
            TL.to(this.elts[homeShelves], stdDuration, {top: this.currHomeShelvesY+'px', ease:Power3.easeOut})
          }
          selectedShelfIndex--
          nextShelfIndex = selectedShelfIndex + 1
          this.prevShelf = this.shelves[prevShelfIndex]
          this.currShelf = this.shelves[selectedShelfIndex]
          this.nextShelf = (nextShelfIndex < totalShelves) ? this.shelves[nextShelfIndex] : null
          this.prevShelf.unselect()
          this.currShelf.select()
        }
        break;
      default:
        console.log("ERROR: errorIndex, " + focusLocationIndex)
    }//switch
    this.setState({
      keyPressed: 'padUp',
      selectedShelfIndex: selectedShelfIndex,
      focusLocationIndex: focusLocationIndex,
      shelvesTopY: topY + 'px'})
  }//doUp

  doLeft = () => {
    this.setState({keyPressed: 'padLeft'})
    if (this.state.focusLocationIndex === homeShelves) {
      if (this.isPrevMoved) {
        //-- it's on a bloomed state
        this.prevShelf.backTo()
        this.isPrevMoved = false
      }
      if (this.isNextMoved) {
        //-- it's on a bloomed state
        this.nextShelf.backTo()
        this.isNextMoved = false
        if (this.state.selectedShelfIndex === 0) {
          //-- the 1st shelf is on a largeBloom state
          //-- bring down homeHero
          TL.to(this.elts[homeHero], stdDuration, {top: this.upHomeHeroY+'px', opacity: .6, ease:Power3.easeOut}) 
        }
      }
      this.shelves[this.state.selectedShelfIndex].doLeft()
    }
  }//doLeft

  doRight = () => {
    this.setState({keyPressed: 'padRight'})
    if (this.state.focusLocationIndex === homeShelves) {
      if (this.isPrevMoved) {
        //-- it's on a bloomed state
        this.prevShelf.backTo()
        this.isPrevMoved = false
      }
      if (this.isNextMoved) {
        //-- it's on a bloomed state
        this.nextShelf.backTo()
        this.isNextMoved = false
        if (this.state.selectedShelfIndex === 0) {
          //-- the 1st shelf is on a largeBloom state
          //-- bring down homeHero
          TL.to(this.elts[homeHero], stdDuration, {top: this.upHomeHeroY+'px', opacity: .6, ease:Power3.easeOut}) 
        }
      }
      this.shelves[this.state.selectedShelfIndex].doRight()
    }
  }//doRight

  doSelect = () => this.setState({keyPressed: 'selectAction'})
  doBack = () => this.setState({keyPressed: 'goBack'})
  doPausePlay = () => this.setState({keyPressed: 'pausePlay'})
  goToPlayer = () => console.log('goToPlayer')
  goToDetail = () => console.log('goToDetail')
  addToWatchlist = () => console.log('addToWatchlist')
  removeFromWatchlist = () => console.log('removeFromWatchlist')
  onFocusComplete = () => console.log('onFocusComplete')
  onBloomComplete = () => console.log('onBloomComplete')
  onLargeBloomStart = () => {
    //console.log("INFO HomeShelvesPane :: onLargeBloomStart")
    //console.log("INFO HomeShelvesPane :: onLargeBloomStart, this.state.selectedShelfIndex? " + this.state.selectedShelfIndex)
    let prevY
    let nextY
    if (this.state.selectedShelfIndex === 0) {
      //-- when the first shelf is selected, move up the homeHeroCarousel
      if (this.upMidHomeHeroY === this.initHomeHeroY) this.upMidHomeHeroY = this.upHomeHeroY - bloomedShelfShiftY
      TL.to(this.elts[homeHero], stdDuration, {top: this.upMidHomeHeroY+'px', ease:Power3.easeOut})
    } else {
      if (this.prevShelf !== null) {
        //console.log("INFO HomeShelvesPane :: onLargeBloomStart, this.prevShelf !== null")
        prevY = this.prevShelf.props.y - bloomedShelfShiftY
        this.prevShelf.moveTo(prevY, stdDuration)
        this.isPrevMoved = true
      }
    }
    if (this.nextShelf !== null) {
      //console.log("INFO HomeShelvesPane :: onLargeBloomStart, this.nextShelf !== null")
      nextY = this.nextShelf.props.y + bloomedShelfShiftY
      this.nextShelf.moveTo(nextY, stdDuration)
      this.isNextMoved = true
    }
  }//onLargeBloomStart

  //startDetailTimer = () => console.log('startDetailTimer')
  //clearDetailTimer = () => console.log('clearDetailTimer')

  selectTheFirstShelf = () => {
    this.shelves[0].select()
    //-- dimm out the rest
    for (var i = 1; i < totalShelves; i++) {
      let target = this.shelves[i]
      target.opacityChange(.6)
    }
  }//selectTheFirstShelf

  firstShelfOpacityUpdate = (val) => this.shelves[0].opacityChange(val)

  eachHomeShelf = (shelfObj, i) => {
    return (
      <HomeShelf  key={(i + 1).toString()}
                  index={i}
                  id={"HomeShelf" + i} 
                  title={shelfObj.title}
                  shows={shelfObj.shows}
                  y={initShelfY + i*focusedShelfOffsetY}
                  ref={node => this.shelves.push(node)}
                  callBackOnLargeBloomStart={this.onLargeBloomStart}>
      </HomeShelf>
    )
  }//eachHomeShelf

  render() {
    // console.log("INFO HomeShelvesPane :: render")
    return (
        <div id="HomeShelvesPane" style={this.style}>
          <div className={(this.state.focusLocationIndex === 0) ? "globalNavFocused" : "globalNav"} 
               ref={node => this.elts.push(node)}
               style={{top:initGlobalNavY + 'px'}}/>
          <div className={(this.state.focusLocationIndex === 1) ? "homeHeroFocused" : "homeHero"} 
               ref={node => this.elts.push(node)}
               style={{top:initHomeHeroY + 'px'}}/>
          <div className={(this.state.focusLocationIndex === 2) ? "homeShelvesFocused" : "homeShelves"} 
               ref={node => this.elts.push(node)}
               style={{top:initContainerY + 'px'}}>
              {shelvesDataArr.map(this.eachHomeShelf)}
          </div>
          <div id="keyPressed">
              keyPressed: <b>{this.state.keyPressed}</b>, focusOn: <b>{focusLocation[this.state.focusLocationIndex]}</b>
          </div>
          <div  className={this.state.isGuideVisible ? "hLineVisible" : "hLineHidden"} 
                style={{top:this.props.height/2 + 'px'}}/>
        </div>
    )
  }//render
}

HomeShelvesPane.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
}

HomeShelvesPane.defaultProps = {
  width: 1920,
  height: 1080
}

export default HomeShelvesPane;