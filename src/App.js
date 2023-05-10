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

import { FaBars, FaTimes, FaAngleDown, FaRegCircle, FaRegDotCircle, FaAngleRight, FaToggleOn } from 'react-icons/fa';

import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// Application autocomplete
import Autocomplete from "./components/Autocomplete/Autocomplete";

import * as Helpers from "./Helpers.js";
import * as Constants from "./Constants.js";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "fiber-seq viewer",
      assembly: Constants.appDefaultAssembly,
      mode: Constants.appDefaultMode,
      modeToggleEnabled: true,
      hgViewKey: 0,
      hgViewconf: Constants.cd3plusHiglassPileupViewconf, // Constants.testHiglassPileupViewconf,
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
      hgViewEditable: Constants.appDefaultHgViewEditable,
      hgViewEditableToggleEnabled: true,
      hgViewTileWidth: Constants.appDefaultTileWidth,
      hgViewCurrentPosition: null,
      chromInfo: null,
      coverEnabled: true,
      coverVisible: true,
      fetchingTilesetInfo: true,
      hamburgerClosedState: true,
    };
    this.hgViewRef = React.createRef();
    
    const csu = (this.state.mode === Constants.appModeLabels.test) ? Constants.testHiglassChromsizesURL : Constants.hg38ChromsizesURL;
    ChromosomeInfo(csu)
      .then((newChromInfo) => {
        this.state.chromInfo = newChromInfo;
      });

    this.state.hgViewconf.editable = this.state.hgViewEditable;
    this.state.hgViewconf.views[0].tracks.top.forEach((v, i) => {
      if (v.type === 'pileup') {
        v.data.options.maxTileWidth = this.state.hgViewTileWidth;
      }
    });

    this.pileupTrackStatusMonitor = new BroadcastChannel("pileup-track-status");
    this.pileupTrackStatusMonitor.onmessage = (event) => this.handlePileupTrackStatusChange(event.data);
  }

  componentDidMount() {
    // this.queryHiglassIoForDefaultViewconf();
    setTimeout(() => {
      this.hgViewRef.api.on("location", (event) => { 
        this.updateViewerLocation(event);
      });
      if (this.state.mode === Constants.appModeLabels.cd3plus) {
        setTimeout(() => {
          this.zoomToChr11HBG2();
        }, 100); 
      }
    }, 100);
  }

  componentWillUnmount() {
    this.pileupTrackStatusMonitor.close();
  }

  updateViewerLocation = (event) => {
    if (!this.state.chromInfo) return;
    const chrStartPos = this.state.chromInfo.absToChr(event.xDomain[0]);
    const chrStopPos = this.state.chromInfo.absToChr(event.xDomain[1]);
    const chrLeft = chrStartPos[0];
    const start = chrStartPos[1];
    const chrRight = chrStopPos[0];
    const stop = chrStopPos[1];
    // console.log(`updateViewerLocation: ${chrLeft}:${start}-${chrRight}:${stop}`);
    const newHgViewCurrentPosition = {
      left: {
        chrom: chrLeft,
        start: start,
      },
      right: {
        chrom: chrRight,
        stop: stop,
      },
    };
    this.setState({
      hgViewCurrentPosition: newHgViewCurrentPosition,
    })
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
    const newMode = (this.state.mode === Constants.appModeLabels.test) ? Constants.appModeLabels.cd3plus : Constants.appModeLabels.test;
    const newHgViewconf = (this.state.mode === Constants.appModeLabels.test) ? Constants.cd3plusHiglassPileupViewconf : Constants.testHiglassPileupViewconf;
    // console.log(`toggleMode | ${this.state.mode} -> ${newMode}`);
    this.setState({
      mode: newMode,
      hgViewconf: newHgViewconf,
    }, () => {
      this.hgViewRef.api.on("location", (event) => { 
        this.updateViewerLocation(event);
      });
      // this.updateChromosomeInfoObject((this.state.mode === Constants.appModeLabels.cd3plus) ? Constants.hg38ChromsizesURL : Constants.testHiglassChromsizesURL);
      switch (this.state.mode) {
        case Constants.appModeLabels.test:
        case Constants.appModeLabels.cd3plus:
        case Constants.appModeLabels.hudep:
          this.zoomToChr11HBG2();
          break;
        default:
          throw new Error("Unknown mode passed to switchToMode fn");
      }
    });
  }

  toggleHgViewEditable = (e) => {
    if (!this.state.hgViewEditableToggleEnabled) return;
    const newHgViewEditable = !this.state.hgViewEditable;
    const newHgViewconf = JSON.parse(JSON.stringify(this.state.hgViewconf));
    newHgViewconf.editable = newHgViewEditable;
    this.setState({
      hgViewEditable: newHgViewEditable,
      hgViewconf: newHgViewconf,
    }, () => {
      this.hgViewRef.api.on("location", (event) => { 
        this.updateViewerLocation(event);
      });
    });
  }

  switchToMode = (m) => {
    if (m === this.state.mode) return;
    // console.log(`switchToMode m ${JSON.stringify(m)}`);
    const newHgViewKey = this.state.hgViewKey + 1;
    const newMode = m;
    let newHgViewconf = {};
    switch (m) {
      case Constants.appModeLabels.test:
        newHgViewconf = Constants.testHiglassPileupViewconf;
        break;
      case Constants.appModeLabels.cd3plus:
        newHgViewconf = Constants.cd3plusHiglassPileupViewconf;
        newHgViewconf.views[0].tracks.top[2].data.options.maxTileWidth = this.state.hgViewTileWidth;
        break;
      case Constants.appModeLabels.hudep:
        newHgViewconf = Constants.hudepHiglassPileupViewconf;
        newHgViewconf.views[0].tracks.top[1].data.options.maxTileWidth = this.state.hgViewTileWidth;
        newHgViewconf.views[0].tracks.top[3].data.options.maxTileWidth = this.state.hgViewTileWidth;
        break;
      default:
        throw new Error("Unknown mode passed to switchToMode fn");
    }
    newHgViewconf.editable = this.state.hgViewEditable;

    this.setState({
      mode: newMode,
      hgViewKey: newHgViewKey,
      hgViewconf: newHgViewconf,
    }, () => {
      this.hgViewRef.api.on("location", (event) => { 
        this.updateViewerLocation(event);
      });
      switch (this.state.mode) {
        case Constants.appModeLabels.test:
          break;
        case Constants.appModeLabels.cd3plus:
        case Constants.appModeLabels.hudep:
          setTimeout(() => {
            this.zoomToChr11HBG2();
          }, 500);
          break;
        default:
          throw new Error("Unknown mode passed to switchToMode fn");
      }
    });
  }

  onChangeSearchInput = (value) => {
    // console.log("onChangeSearchInput", value);
    this.setState({
      searchInputValue: value
    });
  }
  
  onChangeSearchInputLocation = (location, applyPadding, userInput) => {
    // console.log("onChangeSearchInputLocation", location);
    let range = Helpers.getRangeFromString(location, applyPadding, false, this.state.assembly);
    // console.log("range", range);
    if (range) {
      this.setState({
        searchInputLocationBeingChanged: true
      }, () => {
        const applyPadding = true;
        this.openViewerAtChrRange(range, applyPadding);
        setTimeout(() => {
          this.setState({
            searchInputText: userInput,
            searchInputLocationBeingChanged: false
          }, () => {
            setTimeout(() => {
              this.setState({
                searchInputText: null,
              });
            }, 1000);
          });
        }, 1000);
      })
    }
  }

  openViewerAtChrRange = (range, applyPadding) => {
    let chrLeft = range[0];
    let chrRight = range[0];
    let start = parseInt(range[1]);
    let stop = parseInt(range[2]);
    if (applyPadding) {
      const padding = parseInt(Constants.appDefaultHgViewGenePaddingFraction * (stop - start));
      const ub = Constants.assemblyBounds[this.state.assembly][chrRight]['ub'];
      start = ((start - padding) > 0) ? (start - padding) : 0;
      stop = ((stop + padding) < ub) ? (stop + padding) : ub;
    }
    // this.hgViewUpdatePosition(this.state.hgViewParams.genome, chrLeft, start, stop, chrRight, start, stop, 0);
    this.hgViewUpdatePosition(this.state.assembly, chrLeft, start, stop, chrRight, start, stop);
  }

  hgViewUpdatePosition = (genome, chrLeft, startLeft, stopLeft, chrRight, startRight, stopRight) => {
    // console.log("[hgViewUpdatePosition]", genome, chrLeft, startLeft, stopLeft, chrRight, startRight, stopRight);
    if (!this.hgViewRef || !this.state.chromInfo) return;
    this.hgViewRef.zoomTo(
      this.state.hgViewconf.views[0].uid,
      this.state.chromInfo.chrToAbs([chrLeft, startLeft]),
      this.state.chromInfo.chrToAbs([chrLeft, stopLeft]),
      this.state.chromInfo.chrToAbs([chrRight, startRight]),
      this.state.chromInfo.chrToAbs([chrRight, stopRight]),
      10,
    );
  }

  zoomToChr11HBG2 = () => {
    this.hgViewUpdatePosition(
      this.state.assembly,
      'chr11',
      5250000,
      5260000,
      'chr11',
      5250000,
      5260000,
    );  
  }

  drawerContent = () => {
    const self = this;
    const drawerItemGroupStyle = {
      paddingBottom: "10px",
    };
    const drawerItemContentStyle = {
      width: 'calc(100% - 30px)',
      margin: 10,
      fontSize: "0.8rem",
      letterSpacing: "normal",
    };
    const drawerItemContentLabelStyle = {
      position: "relative",
      top: "1px",
    };
    const drawerItemContentSelectedStyle = {
      fontWeight: "700",
      cursor: "default",
    };
    const drawerItemContentNotSelectedStyle = {
      fontWeight: "300",
      cursor: "pointer",
    };
    const drawerSliderContentStyle = {
      marginBottom: '10px',
    };
    const items = [];

    //
    // • mode
    //
    let modes = [];
    Object.keys(Constants.appModes).forEach((m) => {
      if (m === self.state.mode) {
        modes.push(
          <div style={drawerItemContentSelectedStyle} onClick={(e) => self.switchToMode(m)}>
            <FaRegDotCircle /> <span style={drawerItemContentLabelStyle}>{Constants.appModes[m]}</span>
          </div>
        );
      }
      else {
        modes.push(
          <div style={drawerItemContentNotSelectedStyle} onClick={(e) => self.switchToMode(m)}>
            <FaRegCircle /> <span style={drawerItemContentLabelStyle}>{Constants.appModes[m]}</span>
          </div>
        );
      }
    });
    // console.log(`${JSON.stringify(modes)}`);
    items.push(<div style={drawerItemGroupStyle}>
      <div>
        <FaAngleDown /> mode
      </div>
      <div style={drawerItemContentStyle}>
        {modes}
      </div>
    </div>);

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

    function handleTileWidthSliderChange(value) {
      const newHgViewKey = self.state.hgViewKey + 1;
      const newTileWidth = tileWidthLabelsToWidths[value];
      const newHgViewconf = JSON.parse(JSON.stringify(self.state.hgViewconf));
      switch (self.state.mode) {
        case Constants.appModeLabels.test:
          break;
        case Constants.appModeLabels.cd3plus:
          newHgViewconf.views[0].tracks.top[2].data.options.maxTileWidth = newTileWidth;
          break;
        case Constants.appModeLabels.hudep:
          newHgViewconf.views[0].tracks.top[1].data.options.maxTileWidth = newTileWidth;
          newHgViewconf.views[0].tracks.top[3].data.options.maxTileWidth = newTileWidth;
          break;
        default:
          throw new Error("Unknown mode specified for tile width slider change");
      }
      self.setState({
        hgViewKey: newHgViewKey,
        hgViewconf: newHgViewconf,
        hgViewTileWidth: newTileWidth,
      }, () => {
        self.hgViewRef.api.on("location", (event) => { 
          self.updateViewerLocation(event);
        });
      });
      // console.log(`${newTileWidth}`);
      // console.log(`${JSON.stringify(newHgViewconf)}`);
    }
    const minimumTileWidth = parseInt(tileWidthsToKeys[Constants.appMinimumTileWidth]);
    const defaultTileWidth = parseInt(tileWidthsToKeys[Constants.appDefaultTileWidth]);
    // console.log(`${minimumTileWidth} | ${defaultTileWidth}`);
    items.push(<div style={Object.assign({}, drawerItemGroupStyle, drawerSliderContentStyle)}>
      <div>
        <FaAngleDown /> tile width
      </div>
      <div style={drawerItemContentStyle}>
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
          dotStyle={{ borderColor: 'rgb(220,220,220)' }}
          activeDotStyle={{ borderColor: 'darkgrey' }} />
      </div>
    </div>);

    //
    // • editable
    //
    items.push(<div style={drawerItemGroupStyle}>
      <div>
        <FaAngleDown /> options
      </div>
      <div style={Object.assign({}, drawerItemContentStyle, { display: "flex" })}>
        <div className={(this.state.hgViewEditable) ? "flag-enabled" : "flag-disabled"}>
          editable
        </div>
        &nbsp;&nbsp;
        <FaToggleOn
          onClick={(e) => this.toggleHgViewEditable(e)}
          className={(this.state.hgViewEditable) ? "fa-toggle fa-toggle-on" : "fa-toggle fa-toggle-off"} />
        &nbsp;&nbsp;
        <div className={(!this.state.hgViewEditable) ? "flag-enabled" : "flag-disabled"}>
          fixed
        </div>
      </div>
    </div>);

    return items;
  };

  currentPosition = () => {
    if (!this.state.hgViewCurrentPosition) return "";
    const p = this.state.hgViewCurrentPosition;
    return (p.left.chrom === p.right.chrom) ? `${p.left.chrom}:${p.left.start}-${p.right.stop} | ${this.state.assembly}` : `${p.left.chrom}:${p.left.start} - ${p.right.chrom}:${p.right.stop} | ${this.state.assembly}`;
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
            <div className="header-autocomplete">
              <Autocomplete
                ref={(ref) => { this.autocompleteInputRef = ref; }}
                className={"autocomplete-input"}
                placeholder={Constants.appDefaultAutocompleteInputPlaceholder}
                annotationScheme={Constants.annotationScheme}
                annotationHost={Constants.annotationHost}
                annotationPort={Constants.annotationPort}
                annotationAssemblyRaw={this.state.assembly}
                annotationAssembly={`${this.state.assembly}_GENCODE_v38`}
                mapIndexDHSScheme={Constants.mapIndexDHSScheme}
                mapIndexDHSHost={Constants.mapIndexDHSHost}
                mapIndexDHSPort={Constants.mapIndexDHSPort}
                mapIndexDHSSetName={Constants.mapIndexDHSSetName}
                onChangeLocation={this.onChangeSearchInputLocation}
                onChangeInput={this.onChangeSearchInput}
                onFocus={this.onFocusSearchInput}
                onPostFocus={this.closeDrawer}
                title={"Search for a gene of interest or jump to a genomic interval"}
                suggestionsClassName={"suggestions"}
                isMobile={false}
              />
            </div>
            <div className="header-location">
              {this.currentPosition()}
            </div>
          </div>
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
