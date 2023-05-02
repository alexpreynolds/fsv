import React, { Component } from "react";

import axios from "axios";

import { 
  HiGlassComponent, 
  ChromosomeInfo,
  // version as HiGlassVersion,
} from "higlass";
import "higlass/dist/hglib.css";
import "bootstrap/dist/css/bootstrap.min.css";

// higlass-pileup
// ref. https://github.com/higlass/higlass-pileup
import "higlass-pileup/dist/higlass-pileup.js";

import { FaBars, FaTimes, FaToggleOn } from 'react-icons/fa';

import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import * as Constants from "./Constants.js";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "fiber-seq viewer",
      mode: "data",
      modeToggleEnabled: true,
      hgViewKey: 0,
      hgViewconf: Constants.gimelbrantHiglassPileupViewconf, // Constants.testHiglassPileupViewconf,
      hgOptions: { // http://docs.higlass.io/javascript_api.html#overview
        bounded: true,
        sizeMode: "bounded",
        // viewMarginTop: 0,
        // viewMarginBottom: 0,
        viewMarginLeft: 0,
        viewMarginRight: 0,
        // viewPaddingTop: 0,
        // viewPaddingBottom: 0,
        viewPaddingLeft: 0,
        viewPaddingRight: 0,
      },
      chromInfo: null,
      coverEnabled: true,
      coverVisible: true,
      fetchingTilesetInfo: true,
      hamburgerClosedState: true,
    };
    this.hgViewRef = React.createRef();
    
    const csu = (this.state.mode === "data") ? Constants.hg38ChromsizesURL : Constants.testHiglassChromsizesURL;
    ChromosomeInfo(csu)
      .then((newChromInfo) => {
        this.state.chromInfo = newChromInfo;
      });

    this.pileupTrackStatusMonitor = new BroadcastChannel("pileup-track-status");
    this.pileupTrackStatusMonitor.onmessage = (event) => this.handlePileupTrackStatusChange(event.data);
  }

  componentDidMount() {
    // this.queryHiglassIoForDefaultViewconf();
    setTimeout(() => {
      if (this.state.mode === "data") {
        setTimeout(() => {
          this.zoomGimelbrantTestBAMToChr11HBG2();
        }, 0); 
      }
    }, 100);
  }

  componentWillUnmount() {
    this.pileupTrackStatusMonitor.close();
  }

  handlePileupTrackStatusChange = (data) => {
    // console.log(`handlePileupTrackStatusChange | ${JSON.stringify(data)}`);
    let newCoverVisible = true;
    let newFetchingTilesetInfo = this.state.fetchingTilesetInfo;
    switch (data.state) {
      case "loading":
        newCoverVisible = true;
        newFetchingTilesetInfo = true;
        break;
      case "update_start":
        newCoverVisible = true;
        newCoverVisible = (this.state.fetchingTilesetInfo);
        break;
      case "update_end":
        newCoverVisible = (this.state.fetchingTilesetInfo);
        newFetchingTilesetInfo = false;
        break;
      case "fetching_tileset_info":
        newCoverVisible = true;
        newFetchingTilesetInfo = true;
        break;
      case "fetching":
        newCoverVisible = true;
        newFetchingTilesetInfo = false;
        break;
      case "rendering":
        newCoverVisible = (this.state.fetchingTilesetInfo);
        newFetchingTilesetInfo = false;
        break;
      default:
        break;
    }
    this.setState({
      coverVisible: newCoverVisible,
      fetchingTilesetInfo: newFetchingTilesetInfo,
    }, () => {
      // console.log(`coverVisible ${this.state.coverVisible} | fetchingTilesetInfo ${this.state.fetchingTilesetInfo}`);
    });
  }

  queryHiglassIoForDefaultViewconf = () => {
    const self = this;
    async function query() {
      const higlassURLs = ['http://higlass.io/api/v1/viewconfs/?d=default'];
      try {
        const promiseResponses = await Promise.allSettled(higlassURLs.map(higlassURL => {
          return axios.get(higlassURL)
            .then((res) => {
              if (res.data) {
                return res.data;
              }
            });
        }));
        const fulfilledPromises = promiseResponses.filter(r => r.status === 'fulfilled');
        const viewconfs = fulfilledPromises.map(v => {
          v.value.editable = false;
          return v.value;
        });
        if (viewconfs.length === 0) throw Error("Zero-length fulfilled viewconf promise result");
        const newHgViewconf = viewconfs[0];
        const newState = {
          hgViewconf: newHgViewconf,
        };
        self.setState(newState);
      }
      catch (err) {
        console.log(`err ${JSON.stringify(err)}`);
      }
    }
    query();
  }

  toggleHamburger = (e) => {
    const newHamburgerClosedState = !this.state.hamburgerClosedState;
    this.setState({
      hamburgerClosedState: newHamburgerClosedState,
    });
  }

  toggleMode = (e) => {
    if (!this.state.modeToggleEnabled) return;
    const newMode = (this.state.mode === "test") ? "data" : "test";
    const newHgViewconf = (this.state.mode === "test") ? Constants.gimelbrantHiglassPileupViewconf : Constants.testHiglassPileupViewconf;
    // console.log(`toggleMode | ${this.state.mode} -> ${newMode}`);
    this.setState({
      mode: newMode,
      hgViewconf: newHgViewconf,
    }, () => {
      // this.updateChromosomeInfoObject((this.state.mode === "data") ? Constants.hg38ChromsizesURL : Constants.testHiglassChromsizesURL);
      if (this.state.mode === "data") {
        this.zoomGimelbrantTestBAMToChr11HBG2();
      }
    });
  }

  zoomGimelbrantTestBAMToChr11HBG2 = () => {
    if (!this.hgViewRef || !this.state.chromInfo) return;
    this.hgViewRef.zoomTo(
      this.state.hgViewconf.views[0].uid,
      this.state.chromInfo.chrToAbs(['chr11', 5250000]),
      this.state.chromInfo.chrToAbs(['chr11', 5260000]),
      this.state.chromInfo.chrToAbs(['chr11', 5250000]),
      this.state.chromInfo.chrToAbs(['chr11', 5260000]),
      0,
    );    
  }

  drawerContent = () => {
    const items = [];

    //
    // • tile width
    //
    const tileWidths = {
      '15': '15k',
      '30': '30k',
      '50': '50k',
      '100': '100k',
    };
    const tileWidthLabelsToWidths = {
      '15': 15000,
      '30': 30000,
      '50': 50000,
      '100': 100000,
    };
    const tileWidthsToKeys = {
      15000: '15',
      30000: '30',
      50000: '50',
      100000: '100',
    };
    const tileWidthSliderStyle = { width: 'calc(100% - 30px)', margin: 10 };
    const self = this;
    function handleTileWidthSliderChange(value) {
      const newTileWidth = tileWidthLabelsToWidths[value];
      const newHgViewconf = self.state.hgViewconf;
      newHgViewconf.views[0].tracks.top[2].data.options.maxTileWidth = newTileWidth;
      self.setState({
        hgViewconf: newHgViewconf,
      });
      // console.log(`${newTileWidth}`);
      // console.log(`${JSON.stringify(newHgViewconf)}`);
    }
    const minimumTileWidth = parseInt(tileWidthsToKeys[Constants.appMinimumTileWidth]);
    const defaultTileWidth = parseInt(tileWidthsToKeys[Constants.appDefaultTileWidth]);
    // console.log(`${minimumTileWidth} | ${defaultTileWidth}`);
    items.push(<div>
      <div>
        • tile width
      </div>
      <div style={tileWidthSliderStyle}>
        <Slider 
          min={minimumTileWidth}
          marks={tileWidths} 
          step={null} 
          onChange={handleTileWidthSliderChange} 
          defaultValue={defaultTileWidth}
          trackStyle={{ backgroundColor: 'darkgrey' }}
          railStyle={{ backgroundColor: 'rgb(220,220,220)' }}
          handleStyle={{
            borderColor: 'darkgrey',
            backgroundColor: 'rgb(60,60,60)',
          }}
          dotStyle={{borderColor: 'rgb(220,220,220)'}}
          activeDotStyle={{ borderColor: 'darkgrey' }}
          />
      </div>
    </div>);

    return items;
  }

  render() {
    return (
      <div className="box">
        <div className="row header">
          <div className="header-content">
            <div className="header-hamburger">
              { (this.state.hamburgerClosedState) 
              ?
                <FaBars 
                  onClick={(e) => this.toggleHamburger(e)}
                />
              :
                <FaTimes 
                  onClick={(e) => this.toggleHamburger(e)}
                />
              }
              <Drawer
                open={!this.state.hamburgerClosedState}
                onClose={this.toggleHamburger}
                direction='left'
                className='drawer'
                duration={150}
                lockBackgroundScroll={true}
              >
                  <FaTimes 
                    className="drawer-hamburger"
                    onClick={(e) => this.toggleHamburger(e)}
                  />
                  <div className="drawer-title">
                    {this.state.title}
                  </div>
                  <div className="drawer-subtitle">
                    settings
                  </div>
                  <div className="drawer-content">
                    {this.drawerContent()}
                  </div>
              </Drawer>
            </div>
            <div className="header-title">
              {this.state.title}
            </div>
          </div>
          {/* <Navbar fixed="top" dark full>
            <Nav>
              <div>
                <FaBars />
              </div>
            </Nav>
            <NavbarBrand href='/'>{this.state.title}</NavbarBrand>
            <Nav>
              <div className={(this.state.mode === "data") ? "mode-enabled" : "mode-disabled"}>
                chr11 (Gimelbrant)
              </div>
              &nbsp;&nbsp;
              <FaToggleOn 
                onClick={(e) => this.toggleMode(e)} 
                className={(this.state.mode === "data") ? "fa-toggle fa-toggle-data" : "fa-toggle fa-toggle-test"} />
              &nbsp;&nbsp;
              <div className={(this.state.mode === "test") ? "mode-enabled" : "mode-disabled"}>
                test (higlass-pileup)
              </div>
            </Nav>
          </Navbar> */}
        </div>
        <div className="row content">
          { (this.state.hgViewconf) 
            ?
            <div className="content-parent"> 
              { 
                (!this.state.coverEnabled) 
                  ? <div /> 
                  : (this.state.coverVisible) 
                    ? <div className="cover cover-visible">
                        <div class="loading" />
                      </div> 
                    : <div className="cover cover-not-visible" />
              }
              <HiGlassComponent 
                key={this.state.hgViewKey}
                ref={(component) => this.hgViewRef = component}
                options={this.state.hgOptions}
                viewConfig={this.state.hgViewconf}
              /> 
            </div>
            : 
            <div /> }
        </div>
        <div className="row footer" />
      </div>
    );
  }
}

export default App;
