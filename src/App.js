import React, { Component } from "react";

import {
  Badge,
} from "reactstrap";

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

// higlass-transcripts
// ref. https://github.com/higlass/higlass-transcripts
import "higlass-transcripts/dist/higlass-transcripts.js";

// higlass-sequence
// ref. https://github.com/higlass/higlass-sequence
import "higlass-sequence/dist/higlass-sequence.js";

import { FaBars, FaTimes, FaAngleDown, FaRegCircle, FaRegDotCircle, FaAngleRight, FaToggleOn, FaClipboard, FaIcicles, FaTree } from 'react-icons/fa';

import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// Application autocomplete
import Autocomplete from "./components/Autocomplete/Autocomplete";

import * as Helpers from "./Helpers.js";
import * as Constants from "./Constants.js";

import "./App.css";

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowHeight: undefined,
      windowWidth: undefined,
      title: "fiber-seq viewer",
      assembly: Constants.appDefaultAssembly,
      currentChrom: 'chr11',
      mode: Constants.appDefaultMode,
      modeToggleEnabled: true,
      hgViewKey: 0,
      hgViewconf: {},
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
      hgViewTranscriptsDirectional: Constants.appDefaultHgViewTranscriptsDirectional,
      hgViewTranscriptsDirectionalEnabled: true,
      hgViewTileWidth: Constants.appDefaultTileWidth,
      hgViewProbabilityThresholdRange: Constants.appDefaultProbabilityThresholdRange,
      hgViewM6AEventViewable: Constants.appDefaultHgViewM6AEventViewable,
      hgView5mCEventViewable: Constants.appDefaultHgView5mCEventViewable,
      hgView5mCEventViewableToggleEnabled: true,
      hgViewCurrentPosition: null,
      chromInfo: null,
      coverEnabled: true,
      coverVisible: {},
      fetchingTilesetInfo: {},
      hamburgerClosedState: true,
      clusterCoverEnabled: false,
      clusterCoverDimensions: {w: 0, h: 0},
      mousePosition: {x: -1000, y: -1000},
    };

    this.hgViewRef = React.createRef();
    
    const csu = (this.state.mode === Constants.appModeLabels.test) ? Constants.testHiglassChromsizesURL : Constants.hg38ChromsizesURL;
    ChromosomeInfo(csu)
      .then((newChromInfo) => {
        this.state.chromInfo = newChromInfo;
      });

    switch (this.state.mode) {
      case "test":
        this.state.hgViewconf = Constants.testHiglassPileupViewconf;
        break;
      case "cd3pos":
        this.state.hgViewconf = Constants.cd3posHiglassPileupViewconf;
        break;
      case "hudep":
        this.state.hgViewconf = Constants.hudepHiglassPileupViewconf;
        break;
      case "hudepTest":
        this.state.hgViewconf = Constants.hudepTestHiglassPileupViewconf;
        break;
      default:
        throw Error("Unknown application mode; could not set up viewconf in constructor");
    }

    this.viewerBc = new BroadcastChannel(`pileup-track-viewer`);
    this.viewerBc.postMessage({state: 'loading', msg: 'warming up...'});

    this.pileupTrackStatusMonitors = {};

    this.state.hgViewconf.editable = this.state.hgViewEditable;
    this.state.hgViewconf.views[0].tracks.top.forEach((track, i) => {
      switch (track.type) {
        case "horizontal-transcripts":
          track.options.blockStyle = (this.state.hgViewTranscriptsDirectional) ? "directional" : "UCSC-like";
          break;
        case "pileup":
          track.data.options.maxTileWidth = this.state.hgViewTileWidth;
          const monitor = new BroadcastChannel(`pileup-track-${track.uid}`);
          monitor.onmessage = (event) => this.handlePileupTrackStatusChange(event.data, track.uid);
          this.pileupTrackStatusMonitors[track.uid] = monitor;
          this.state.coverVisible[track.uid] = true;
          this.state.fetchingTilesetInfo[track.uid] = true;
          if (track.options.methylation) {
            track.options.methylation.probabilityThresholdRange = this.state.hgViewProbabilityThresholdRange;
            let newMethylationEventCategories = [];
            let newMethylationEventColors = [];
            let newMethylationEventCategoryAbbreviations = [];
            if (this.state.hgViewM6AEventViewable) {
              newMethylationEventCategories = [...newMethylationEventCategories, ...Constants.appDefaultM6AEventCategories];
              newMethylationEventCategoryAbbreviations = [...newMethylationEventCategoryAbbreviations, ...Constants.appDefaultM6AEventCategoryAbbreviations];
              switch (track.options.methylation.set) {
                case "control":
                  newMethylationEventColors = [...newMethylationEventColors, ...Constants.appDefaultM6AControlEventColors];
                  break;
                case "treatment":
                  newMethylationEventColors = [...newMethylationEventColors, ...Constants.appDefaultM6ATreatmentEventColors];
                  break;
                default:
                  newMethylationEventColors = [...newMethylationEventColors, ...Constants.appDefaultM6AEventColors];
                  break;
              }
            }
            if (this.state.hgView5mCEventViewable) {
              newMethylationEventCategories = [...newMethylationEventCategories, ...Constants.appDefault5mCEventCategories];
              newMethylationEventCategoryAbbreviations = [...newMethylationEventCategoryAbbreviations, ...Constants.appDefault5mCEventCategoryAbbreviations];
              newMethylationEventColors = [...newMethylationEventColors, ...Constants.appDefault5mCEventColors];
            }
            track.options.methylation.categories = newMethylationEventCategories;
            track.options.methylation.colors = newMethylationEventColors;
            track.options.methylation.categoryAbbreviations = newMethylationEventCategoryAbbreviations;
            // console.log(`track.options.methylation ${JSON.stringify(track.options.methylation)}`);
            switch (track.options.methylation.group) {
              case "HUDEP":
                switch (track.options.methylation.set) {
                  case "control":
                    track.data.bamUrl = `https://areynolds-us-west-2.s3.us-west-2.amazonaws.com/HUDEP.control.DS182418.${this.state.currentChrom}.bam`;
                    track.data.baiUrl = `https://areynolds-us-west-2.s3.us-west-2.amazonaws.com/HUDEP.control.DS182418.${this.state.currentChrom}.bam.bai`;
                    break;
                  case "treatment":
                    track.data.bamUrl = `https://areynolds-us-west-2.s3.us-west-2.amazonaws.com/HUDEP.treatment.DS182417.${this.state.currentChrom}.bam`;
                    track.data.baiUrl = `https://areynolds-us-west-2.s3.us-west-2.amazonaws.com/HUDEP.treatment.DS182417.${this.state.currentChrom}.bam.bai`;
                    break;
                  default:
                    break;
                }
                break;
              default:
                break;
            }
          }
          break;
        case "bar": 
          switch (track.group) {
            case "HUDEP":
              switch (track.set) {
                case "control":
                  track.name = `${track.group}.${track.set}.${this.state.currentChrom}`;
                  track.tilesetUid = Constants.bigWigUids['HUDEP']['control']['m6aEventsPerBaseMeanWithClipped'][this.state.currentChrom];
                  track.options.name = `${track.group}.${track.set}.${this.state.currentChrom}`;
                  break;
                case "treatment":
                  track.name = `${track.group}.${track.set}.${this.state.currentChrom}`;
                  track.tilesetUid = Constants.bigWigUids['HUDEP']['treatment']['m6aEventsPerBaseMeanWithClipped'][this.state.currentChrom];
                  track.options.name = `${track.group}.${track.set}.${this.state.currentChrom}`;
                  break;
                default:
                  break;
              }
              break;
            default:
              break;
          }
          break;
        case "1d-heatmap":
          switch (track.group) {
            case "HUDEP":
              switch (track.set) {
                case "log2FC":
                  track.name = `${track.group}.${track.set}.${this.state.currentChrom}`;
                  track.tilesetUid = Constants.bigWigUids['HUDEP']['log2FC']['m6aEventsPerBaseMeanWithClipped'][this.state.currentChrom];
                  track.options.name = `${track.group}.${track.set}.${this.state.currentChrom}`;
                  break;
                default:
                  break;
              }
              break;
            default:
              break;
          }
          break;
        default:
          break;  
      }
    });
  }

  componentDidMount() {
    // this.queryHiglassIoForDefaultViewconf();
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    document.addEventListener("keydown", this.handleKeyDown);
    setTimeout(() => {
      this.hgViewRef.api.on("location", (event) => { 
        this.updateViewerLocation(event);
      });
      if ((this.state.mode === Constants.appModeLabels.cd3pos) || (this.state.mode === Constants.appModeLabels.hudep) || (this.state.mode === Constants.appModeLabels.hudepTest)) {
        setTimeout(() => {
          this.zoomToChr11HBG2();
          // this.zoomToChr11TestRegion();
        }, 250); 
      }
    }, 100);
  }

  componentWillUnmount() {
    // this.pileupTrackStatusMonitor.close();
    Object.keys(this.pileupTrackStatusMonitors).forEach(k => this.pileupTrackStatusMonitors[k].close());
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleResize = debounce(() => {
    const newHgViewconf = JSON.parse(JSON.stringify(this.state.hgViewconf));
    let newPileupHeight = 0;
    switch (this.state.mode) {
      case Constants.appModeLabels.test:
        newPileupHeight = parseInt(window.innerHeight)
          - Constants.appHeaderHeight;
        break;
      case Constants.appModeLabels.cd3pos:
        newPileupHeight = parseInt(window.innerHeight)
          - Constants.appHeaderHeight
          - Constants.appChromosomeTrackHeight
          - Constants.appSequenceTrackHeight
          - Constants.appCoverageTrackHeight
          - 2 * Constants.appGapTrackHeight
          - Constants.appGeneAnnotationTrackHeight;
        break;
      case Constants.appModeLabels.hudep:
        const totalAvailableHudepPileupHeight = parseInt(window.innerHeight)
          - Constants.appHeaderHeight
          - Constants.appChromosomeTrackHeight
          - Constants.appSequenceTrackHeight
          - Constants.appGeneAnnotationTrackHeight
          - 3 * Constants.appCoverageTrackHeight
          - 4 * Constants.appGapTrackHeight;
        const perPileupHeight = parseInt(totalAvailableHudepPileupHeight / 2);
        newPileupHeight = perPileupHeight;
        break;
      case Constants.appModeLabels.hudepTest:
        const totalAvailableHudepTestPileupHeight = parseInt(window.innerHeight)
          - Constants.appHeaderHeight
          - Constants.appChromosomeTrackHeight
          - Constants.appSequenceTrackHeight
          - Constants.appGeneAnnotationTrackHeight
          - Constants.appCoverageTrackHeight
          - 2 * Constants.appGapTrackHeight;
        newPileupHeight = totalAvailableHudepTestPileupHeight;
        break;
      default:
        throw new Error("Unknown mode passed to handleResize fn");
    }
    newHgViewconf.views[0].tracks.top.forEach((track, i) => {
      switch (track.type) {
        case "pileup":
          track.height = newPileupHeight;
          break;
        default:
          break;
      }
    });
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      hgViewconf: newHgViewconf,
    }, () => {
      // console.log(`${this.state.windowWidth} x ${this.state.windowHeight}`);
    });
  }, 100);

  handlePileupTrackStatusChange = (data, uid) => {
    if (typeof data === 'undefined' || !uid) return;
    // console.log(`handlePileupTrackStatusChange | ${JSON.stringify(data)} | ${uid}`);
    let newCoverVisible = this.state.coverVisible;
    let newFetchingTilesetInfo = this.state.fetchingTilesetInfo;
    switch (data.state) {
      case "loading":
        newCoverVisible[uid] = true;
        newFetchingTilesetInfo[uid] = true;
        break;
      case "update_start":
        newCoverVisible[uid] = true;
        // newCoverVisible[uid] = this.state.fetchingTilesetInfo[uid];
        break;
      case "update_end":
        newCoverVisible[uid] = this.state.fetchingTilesetInfo[uid];
        newFetchingTilesetInfo[uid] = false;
        break;
      case "fetching_tileset_info":
        newCoverVisible[uid] = true;
        newFetchingTilesetInfo[uid] = true;
        break;
      case "fetching":
        newCoverVisible[uid] = true;
        newFetchingTilesetInfo[uid] = false;
        break;
      case "rendering":
        newCoverVisible[uid] = true; // this.state.fetchingTilesetInfo[uid];
        newFetchingTilesetInfo[uid] = false;
        break;
      default:
        break;
    }
    // console.log(`          new covervisible flags:        ${JSON.stringify(newCoverVisible)}`);
    // console.log(`     some new covervisible flags true?:  ${Object.values(newCoverVisible).some(e => e === true)}`);
    // console.log(`      all new covervisible flags false?: ${Object.values(newCoverVisible).every(e => e === false)}`);
    this.setState({
      coverVisible: newCoverVisible,
      fetchingTilesetInfo: newFetchingTilesetInfo,
    }, () => {
      this.handleResize();
    });
  };

  triggerPileupTrackRefreshLayout = () => {
    if (Object.values(this.state.coverVisible).some(e => e === true)) return;
    this.viewerBc.postMessage({state: 'request', msg: 'refresh-layout'});
  }

  triggerPileupTrackClustering = () => {
    if (Object.values(this.state.coverVisible).some(e => e === true)) return;
    if ((!this.state.hgViewCurrentPosition) || (this.state.mode === Constants.appModeLabels.test)) return "";
    const posn = this.state.hgViewCurrentPosition;
    const scale = Helpers.calculateScale(posn.left.chrom, posn.right.chrom, posn.left.start, posn.right.stop, this, true);
    const viewportWidth = parseInt(window.innerWidth);
    const pixelsPerBase = viewportWidth / scale.diff;
    const windowWidthInBases = 500;
    const windowWidthInPixels = parseInt(windowWidthInBases * pixelsPerBase);
    const windowHeightInPixels = parseInt(window.innerHeight) - Constants.appHeaderHeight;
    this.setState({
      clusterCoverEnabled: true,
      clusterCoverDimensions: {w: windowWidthInPixels, h: windowHeightInPixels},

    }, () => {})
  }

  xPositionToGenomicCoordinate = (x) => {
    const posn = this.state.hgViewCurrentPosition;
    const scale = Helpers.calculateScale(posn.left.chrom, posn.right.chrom, posn.left.start, posn.right.stop, this, true);
    const viewportWidth = parseInt(window.innerWidth);
    const basesPerPixel = scale.diff / viewportWidth;
    const start = posn.left.start + parseInt(x * basesPerPixel);
    console.log(`${posn.left.chrom}:${start}`);
    return start;
  }

  isPileupTrackClusteringButtonEnabled = () => Object.values(this.state.coverVisible).some(e => e === true);

  isPileupTrackLayoutRefreshButtonEnabled = () => Object.values(this.state.coverVisible).some(e => e === true);

  isAutocompleteEnabled = () => (this.state.mode !== Constants.appModeLabels.test) && Object.values(this.state.coverVisible).every(e => e === false);

  handleKeyDown = (event) => {
    const ESCAPE_KEY = 27;
    switch (event.keyCode) {
      case ESCAPE_KEY: 
        if (this.state.clusterCoverEnabled) {
          const newClusterCoverEnabled = false;
          this.setState({
            clusterCoverEnabled: newClusterCoverEnabled,
          });
        }
        break;
      default:
        break;
    }
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

  // toggleMode = (e) => {
  //   if (!this.state.modeToggleEnabled) return;
  //   const currentPosition = this.state.hgViewCurrentPosition;
  //   console.log(`currentPosition ${JSON.stringify(currentPosition)}`);
  //   const newMode = (this.state.mode === Constants.appModeLabels.test) ? Constants.appModeLabels.cd3pos : Constants.appModeLabels.test;
  //   const newHgViewconf = (this.state.mode === Constants.appModeLabels.test) ? Constants.cd3posHiglassPileupViewconf : Constants.testHiglassPileupViewconf;
  //   // console.log(`toggleMode | ${this.state.mode} -> ${newMode}`);
  //   Object.keys(this.pileupTrackStatusMonitors).forEach(k => this.pileupTrackStatusMonitors[k].close());
  //   const newCoverVisible = {};
  //   const newFetchingTilesetInfo = {};
  //   newHgViewconf.views[0].tracks.top.forEach((track, i) => {
  //     switch (track.type) {
  //       case "pileup":
  //         const monitor = new BroadcastChannel(`pileup-track-${track.uid}`);
  //         monitor.onmessage = (event) => this.handlePileupTrackStatusChange(event.data, track.uid);
  //         this.pileupTrackStatusMonitors[track.uid] = monitor;
  //         newCoverVisible[track.uid] = true;
  //         newFetchingTilesetInfo[track.uid] = true;
  //         break;
  //       default:
  //         break;  
  //     }
  //   });
  //   this.setState({
  //     mode: newMode,
  //     hgViewconf: newHgViewconf,
  //     coverVisible: newCoverVisible,
  //     fetchingTilesetInfo: newFetchingTilesetInfo,
  //   }, () => {
  //     this.hgViewRef.api.on("location", (event) => { 
  //       this.updateViewerLocation(event);
  //     });
  //     // this.updateChromosomeInfoObject((this.state.mode === Constants.appModeLabels.cd3pos) ? Constants.hg38ChromsizesURL : Constants.testHiglassChromsizesURL);
  //     switch (this.state.mode) {
  //       case Constants.appModeLabels.test:
  //         break;
  //       case Constants.appModeLabels.cd3pos:
  //       case Constants.appModeLabels.hudep:
  //         // this.zoomToChr11HBG2();
  //         setTimeout(() => {
  //           this.hgViewUpdatePosition(
  //             this.state.assembly,
  //             currentPosition.left.chrom, 
  //             currentPosition.left.start, 
  //             currentPosition.right.stop, 
  //             currentPosition.right.chrom, 
  //             currentPosition.left.start, 
  //             currentPosition.right.stop)
  //         }, 100);
  //         break;
  //       default:
  //         throw new Error("Unknown mode passed to switchToMode fn");
  //     }
  //   });
  // }

  toggleHgViewEditable = (e) => {
    if (!this.state.hgViewEditableToggleEnabled) return;
    const newHgViewEditable = !this.state.hgViewEditable;
    const newHgViewconf = JSON.parse(JSON.stringify(this.state.hgViewconf));
    newHgViewconf.editable = newHgViewEditable;
    this.setState({
      hgViewEditable: newHgViewEditable,
      hgViewconf: newHgViewconf,
    }, () => {
      const currentPosition = this.state.hgViewCurrentPosition;
      this.hgViewRef.api.on("location", (event) => { 
        this.updateViewerLocation(event);
      });
      setTimeout(() => {
        this.hgViewUpdatePosition(
          this.state.assembly,
          currentPosition.left.chrom, 
          currentPosition.left.start, 
          currentPosition.right.stop, 
          currentPosition.right.chrom, 
          currentPosition.left.start, 
          currentPosition.right.stop)
      }, 100);
    });
  }

  toggleHgViewTranscriptsDirectional = (e) => {
    if (!this.state.hgViewTranscriptsDirectionalEnabled) return;
    const newHgViewKey = this.state.hgViewKey + 1;
    const newHgViewTranscriptsDirectional = !this.state.hgViewTranscriptsDirectional;
    const newHgViewconf = JSON.parse(JSON.stringify(this.state.hgViewconf));
    newHgViewconf.views[0].tracks.top.forEach((track, i) => {
      if (track.type === "horizontal-transcripts") {
        track.options.blockStyle = (newHgViewTranscriptsDirectional) ? "directional" : "UCSC-like";
      }
    })
    this.setState({
      hgViewKey: newHgViewKey,
      hgViewTranscriptsDirectional: newHgViewTranscriptsDirectional,
      hgViewconf: newHgViewconf,
    }, () => {
      const currentPosition = this.state.hgViewCurrentPosition;
      this.hgViewRef.api.on("location", (event) => { 
        this.updateViewerLocation(event);
      });
      setTimeout(() => {
        this.hgViewUpdatePosition(
          this.state.assembly,
          currentPosition.left.chrom, 
          currentPosition.left.start, 
          currentPosition.right.stop, 
          currentPosition.right.chrom, 
          currentPosition.left.start, 
          currentPosition.right.stop)
      }, 100);
    });
  }

  toggleHgView5mCEventViewable = (e) => {
    if (!this.state.hgView5mCEventViewableToggleEnabled) return;
    const newHgViewKey = this.state.hgViewKey + 1;
    const newHgView5mCEventViewable = !this.state.hgView5mCEventViewable;
    const newHgViewconf = JSON.parse(JSON.stringify(this.state.hgViewconf));
    newHgViewconf.views[0].tracks.top.forEach((track, i) => {
      if (track.type === "pileup") {
        if (track.options.methylation) {
          let newMethylationEventCategories = [];
          let newMethylationEventColors = [];
          let newMethylationEventCategoryAbbreviations = [];
          if (this.state.hgViewM6AEventViewable) {
            newMethylationEventCategories = [...newMethylationEventCategories, ...Constants.appDefaultM6AEventCategories];
            newMethylationEventCategoryAbbreviations = [...newMethylationEventCategoryAbbreviations, ...Constants.appDefaultM6AEventCategoryAbbreviations];
            switch (track.options.methylation.set) {
              case "control":
                newMethylationEventColors = [...newMethylationEventColors, ...Constants.appDefaultM6AControlEventColors];
                break;
              case "treatment":
                newMethylationEventColors = [...newMethylationEventColors, ...Constants.appDefaultM6ATreatmentEventColors];
                break;
              default:
                newMethylationEventColors = [...newMethylationEventColors, ...Constants.appDefaultM6AEventColors];
                break;
            }
          }
          if (newHgView5mCEventViewable) {
            newMethylationEventCategories = [...newMethylationEventCategories, ...Constants.appDefault5mCEventCategories];
            newMethylationEventCategoryAbbreviations = [...newMethylationEventCategoryAbbreviations, ...Constants.appDefault5mCEventCategoryAbbreviations];
            newMethylationEventColors = [...newMethylationEventColors, ...Constants.appDefault5mCEventColors];
          }
          track.options.methylation.categories = newMethylationEventCategories;
          track.options.methylation.colors = newMethylationEventColors;
          track.options.methylation.categoryAbbreviations = newMethylationEventCategoryAbbreviations;
        }
      }
    });
    this.setState({
      hgViewKey: newHgViewKey,
      hgView5mCEventViewable: newHgView5mCEventViewable,
      hgViewconf: newHgViewconf,
    }, () => {
      const currentPosition = this.state.hgViewCurrentPosition;
      this.hgViewRef.api.on("location", (event) => { 
        this.updateViewerLocation(event);
      });
      setTimeout(() => {
        this.hgViewUpdatePosition(
          this.state.assembly,
          currentPosition.left.chrom, 
          currentPosition.left.start, 
          currentPosition.right.stop, 
          currentPosition.right.chrom, 
          currentPosition.left.start, 
          currentPosition.right.stop)
      }, 100);
    });
  }

  switchToMode = (m) => {
    if (m === this.state.mode) return;
    // console.log(`switchToMode m ${JSON.stringify(m)}`);
    const newHgViewKey = this.state.hgViewKey + 1;
    const newMode = m;
    const currentPosition = this.state.hgViewCurrentPosition;
    // console.log(`currentPosition ${JSON.stringify(currentPosition)}`);
    let newHgViewconf = {};
    switch (m) {
      case Constants.appModeLabels.test:
        newHgViewconf = Constants.testHiglassPileupViewconf;
        break;
      case Constants.appModeLabels.cd3pos:
        newHgViewconf = Constants.cd3posHiglassPileupViewconf;
        break;
      case Constants.appModeLabels.hudep:
        newHgViewconf = Constants.hudepHiglassPileupViewconf;
        break;
      case Constants.appModeLabels.hudepTest:
        newHgViewconf = Constants.hudepTestHiglassPileupViewconf;
        break;
      default:
        throw new Error("Unknown mode passed to switchToMode fn");
    }
    Object.keys(this.pileupTrackStatusMonitors).forEach(k => this.pileupTrackStatusMonitors[k].close());
    const newCoverVisible = {};
    const newFetchingTilesetInfo = {};
    newHgViewconf.views[0].tracks.top.forEach((track, i) => {
      switch (track.type) {
        case "horizontal-transcripts":
          track.options.blockStyle = (this.state.hgViewTranscriptsDirectional) ? "directional" : "UCSC-like";
          break;
        case "pileup":
          track.data.options.maxTileWidth = this.state.hgViewTileWidth;
          const monitor = new BroadcastChannel(`pileup-track-${track.uid}`);
          monitor.onmessage = (event) => this.handlePileupTrackStatusChange(event.data, track.uid);
          this.pileupTrackStatusMonitors[track.uid] = monitor;
          newCoverVisible[track.uid] = true;
          newFetchingTilesetInfo[track.uid] = true;
          if (track.options.methylation) {
            track.options.methylation.probabilityThresholdRange = this.state.hgViewProbabilityThresholdRange;
            let newMethylationEventCategories = [];
            let newMethylationEventColors = [];
            let newMethylationEventCategoryAbbreviations = [];
            if (this.state.hgViewM6AEventViewable) {
              newMethylationEventCategories = [...newMethylationEventCategories, ...Constants.appDefaultM6AEventCategories];
              newMethylationEventCategoryAbbreviations = [...newMethylationEventCategoryAbbreviations, ...Constants.appDefaultM6AEventCategoryAbbreviations];
              switch (track.options.methylation.set) {
                case "control":
                  newMethylationEventColors = [...newMethylationEventColors, ...Constants.appDefaultM6AControlEventColors];
                  break;
                case "treatment":
                  newMethylationEventColors = [...newMethylationEventColors, ...Constants.appDefaultM6ATreatmentEventColors];
                  break;
                default:
                  newMethylationEventColors = [...newMethylationEventColors, ...Constants.appDefaultM6AEventColors];
                  break;
              }
            }
            if (this.state.hgView5mCEventViewable) {
              newMethylationEventCategories = [...newMethylationEventCategories, ...Constants.appDefault5mCEventCategories];
              newMethylationEventCategoryAbbreviations = [...newMethylationEventCategoryAbbreviations, ...Constants.appDefault5mCEventCategoryAbbreviations];
              newMethylationEventColors = [...newMethylationEventColors, ...Constants.appDefault5mCEventColors];
            }
            track.options.methylation.categories = newMethylationEventCategories;
            track.options.methylation.colors = newMethylationEventColors;
            track.options.methylation.categoryAbbreviations = newMethylationEventCategoryAbbreviations;
          }
          break;
        default:
          break;
      }
    });
    newHgViewconf.editable = this.state.hgViewEditable;

    this.setState({
      mode: newMode,
      hgViewKey: newHgViewKey,
      hgViewconf: newHgViewconf,
      coverVisible: newCoverVisible,
      fetchingTilesetInfo: newFetchingTilesetInfo,
    }, () => {
      this.hgViewRef.api.on("location", (event) => { 
        this.updateViewerLocation(event);
      });
      switch (this.state.mode) {
        case Constants.appModeLabels.test:
          break;
        case Constants.appModeLabels.cd3pos:
        case Constants.appModeLabels.hudep:
        case Constants.appModeLabels.hudepTest:
          setTimeout(() => {
            this.hgViewUpdatePosition(
              this.state.assembly,
              currentPosition.left.chrom, 
              currentPosition.left.start, 
              currentPosition.right.stop, 
              currentPosition.right.chrom, 
              currentPosition.left.start, 
              currentPosition.right.stop)
          }, 100);
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
    if (!this.hgViewRef || !this.state.chromInfo) return;
    // console.log("[hgViewUpdatePosition]", genome, chrLeft, startLeft, stopLeft, chrRight, startRight, stopRight);

    const self = this;
    function jumpToPosition(animationTime) {
      self.hgViewRef.zoomTo(
        self.state.hgViewconf.views[0].uid,
        self.state.chromInfo.chrToAbs([chrLeft, startLeft]),
        self.state.chromInfo.chrToAbs([chrLeft, stopLeft]),
        self.state.chromInfo.chrToAbs([chrRight, startRight]),
        self.state.chromInfo.chrToAbs([chrRight, stopRight]),
        animationTime,
      );
    }

    if ((chrLeft === chrRight) && (chrLeft !== this.state.currentChrom) && (chrRight !== this.state.currentChrom)) {
      const newCurrentChrom = chrLeft;
      const newHgViewconf = JSON.parse(JSON.stringify(this.state.hgViewconf));
      const newHgViewKey = this.state.hgViewKey + 1;
      newHgViewconf.views[0].tracks.top.forEach((track, i) => {
        switch (track.type) {
          case "pileup":
            if (track.options.methylation) {
              switch (track.options.methylation.group) {
                case "HUDEP":
                  switch (track.options.methylation.set) {
                    case "control":
                      track.data.bamUrl = `https://areynolds-us-west-2.s3.us-west-2.amazonaws.com/HUDEP.control.DS182418.${newCurrentChrom}.bam`;
                      track.data.baiUrl = `https://areynolds-us-west-2.s3.us-west-2.amazonaws.com/HUDEP.control.DS182418.${newCurrentChrom}.bam.bai`;
                      break;
                    case "treatment":
                      track.data.bamUrl = `https://areynolds-us-west-2.s3.us-west-2.amazonaws.com/HUDEP.treatment.DS182417.${newCurrentChrom}.bam`;
                      track.data.baiUrl = `https://areynolds-us-west-2.s3.us-west-2.amazonaws.com/HUDEP.treatment.DS182417.${newCurrentChrom}.bam.bai`;
                      break;
                    default:
                      break;
                  }
                  break;
                default:
                  break;
              }
            }
            break;
          case "bar": 
            switch (track.group) {
              case "HUDEP":
                switch (track.set) {
                  case "control":
                    track.name = `${track.group}.${track.set}.${newCurrentChrom}`;
                    track.tilesetUid = Constants.bigWigUids['HUDEP']['control']['m6aEventsPerBaseMeanWithClipped'][newCurrentChrom];
                    track.options.name = `${track.group}.${track.set}.${newCurrentChrom}`;
                    break;
                  case "treatment":
                    track.name = `${track.group}.${track.set}.${newCurrentChrom}`;
                    track.tilesetUid = Constants.bigWigUids['HUDEP']['treatment']['m6aEventsPerBaseMeanWithClipped'][newCurrentChrom];
                    track.options.name = `${track.group}.${track.set}.${newCurrentChrom}`;
                    break;
                  default:
                    break;
                }
                break;
              default:
                break;
            }
            break;
          case "1d-heatmap":
            switch (track.group) {
              case "HUDEP":
                switch (track.set) {
                  case "log2FC":
                    track.name = `${track.group}.${track.set}.${newCurrentChrom}`;
                    track.tilesetUid = Constants.bigWigUids['HUDEP']['log2FC']['m6aEventsPerBaseMeanWithClipped'][newCurrentChrom];
                    track.options.name = `${track.group}.${track.set}.${newCurrentChrom}`;
                    break;
                  default:
                    break;
                }
                break;
              default:
                break;
            }
            break;
          default:
            break;
        }
      });
      this.setState({
        hgViewKey: newHgViewKey,
        hgViewconf: newHgViewconf,
        currentChrom: newCurrentChrom,
      }, () => {
        this.hgViewRef.api.on("location", (event) => { 
          this.updateViewerLocation(event);
        });
        setTimeout(() => {
          jumpToPosition(10);
        }, 100);
      })
    }
    else {
      jumpToPosition(10);
    }
  }

  zoomToChr11HBG2 = () => {
    this.hgViewUpdatePosition(
      this.state.assembly,
      'chr11',
      5254000,
      5257000,
      'chr11',
      5254000,
      5257000,
    );  
  }

  zoomToChr11TestRegion = () => {
    this.hgViewUpdatePosition(
      this.state.assembly,
      'chr11',
      0,
      135086622,
      'chr11',
      0,
      135086622,
    );  
  }

  drawerContent = () => {
    const self = this;
    const drawerItemGroupStyle = {
      paddingBottom: "10px",
    };
    const drawerItemGroupHeaderStyle = {
      fontWeight: '500',
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
      <div style={drawerItemGroupHeaderStyle}>
        <FaAngleDown /> mode
      </div>
      <div style={drawerItemContentStyle}>
        {modes}
      </div>
    </div>);

    //
    // • tag probability
    //
    const handleProbabilitySliderChange = debounce((value) => {
      const newHgViewKey = this.state.hgViewKey + 1;
      const newHgViewconf = JSON.parse(JSON.stringify(this.state.hgViewconf));
      const newProbabilityThresholdRange = value.toString().split(',').map(d => parseInt(d * 255 / 100));
      const currentPosition = this.state.hgViewCurrentPosition;
      // console.log(`${value} -> ${newProbabilityThresholdRange}`);
      newHgViewconf.views[0].tracks.top.forEach((track, i) => {
        switch (track.type) {
          case "pileup":
            track.options.methylation.probabilityThresholdRange = newProbabilityThresholdRange;
            break;
          default:
            break;
        }
      });
      this.setState({
        hgViewKey: newHgViewKey,
        hgViewconf: newHgViewconf,
        hgViewProbabilityThresholdRange: newProbabilityThresholdRange,
      }, () => {
        this.hgViewRef.api.on("location", (event) => { 
          this.updateViewerLocation(event);
        });
        switch (this.state.mode) {
          case Constants.appModeLabels.test:
            break;
          case Constants.appModeLabels.cd3pos:
          case Constants.appModeLabels.hudep:
          case Constants.appModeLabels.hudepTest:
            setTimeout(() => {
              this.hgViewUpdatePosition(
                this.state.assembly,
                currentPosition.left.chrom, 
                currentPosition.left.start, 
                currentPosition.right.stop, 
                currentPosition.right.chrom, 
                currentPosition.left.start, 
                currentPosition.right.stop)
            }, 100);
            break;
          default:
            throw new Error("Unknown mode passed to switchToMode fn");
        }
      });
    }, 500);
    const probabilities = {
      '47'  : `${parseInt(0.473 * 255)}`,
      '78'  : `${parseInt(0.787 * 255)}`,
      '94'  : `${parseInt(0.942 * 255)}`,
      '100' : `${parseInt(1.000 * 255)}`,
    };
    items.push(<div style={Object.assign({}, drawerItemGroupStyle, drawerSliderContentStyle)}>
      <div style={drawerItemGroupHeaderStyle}>
        <FaAngleDown /> probability threshold
      </div>
      <div style={drawerItemContentStyle}>
        <Slider
          range
          min={Constants.appDefaultProbabilitySliderRange[0]}
          max={Constants.appDefaultProbabilitySliderRange[1]}
          marks={probabilities}
          step={100*5/255}
          allowCross={false}
          onChange={handleProbabilitySliderChange}
          defaultValue={Constants.appDefaultProbabilityRange}
          className="slider-custom"
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
      newHgViewconf.views[0].tracks.top.forEach((track, i) => {
        switch (track.type) {
          case "horizontal-transcripts":
            track.options.blockStyle = (self.state.hgViewTranscriptsDirectional) ? "directional" : "UCSC-like";
            break;
          case "pileup":
            track.data.options.maxTileWidth = newTileWidth;
            break;
          default:
            break;
        }
      });
      self.setState({
        hgViewKey: newHgViewKey,
        hgViewconf: newHgViewconf,
        hgViewTileWidth: newTileWidth,
      }, () => {
        const currentPosition = self.state.hgViewCurrentPosition;
        self.hgViewRef.api.on("location", (event) => { 
          self.updateViewerLocation(event);
        });
        setTimeout(() => {
          self.hgViewUpdatePosition(
            self.state.assembly,
            currentPosition.left.chrom, 
            currentPosition.left.start, 
            currentPosition.right.stop, 
            currentPosition.right.chrom, 
            currentPosition.left.start, 
            currentPosition.right.stop);
        }, 100);
      });
      // console.log(`${newTileWidth}`);
      // console.log(`${JSON.stringify(newHgViewconf)}`);
    }
    const minimumTileWidth = parseInt(tileWidthsToKeys[Constants.appMinimumTileWidth]);
    const defaultTileWidth = parseInt(tileWidthsToKeys[Constants.appDefaultTileWidth]);
    // console.log(`${minimumTileWidth} | ${defaultTileWidth}`);
    items.push(<div style={Object.assign({}, drawerItemGroupStyle, drawerSliderContentStyle)}>
      <div style={drawerItemGroupHeaderStyle}>
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
    // • options
    //
    items.push(<div style={drawerItemGroupStyle}>
      <div style={drawerItemGroupHeaderStyle}>
        <FaAngleDown /> options
      </div>
      <div style={Object.assign({}, drawerItemContentStyle, { display: "flex" })}>
        <div className={(this.state.hgView5mCEventViewable) ? "flag-enabled" : "flag-disabled"}>
          CpG enabled
        </div>
        &nbsp;&nbsp;
        <FaToggleOn
          onClick={(e) => this.toggleHgView5mCEventViewable(e)}
          className={(this.state.hgView5mCEventViewable) ? "fa-toggle fa-toggle-on" : "fa-toggle fa-toggle-off"} />
        &nbsp;&nbsp;
        <div className={(!this.state.hgView5mCEventViewable) ? "flag-enabled" : "flag-disabled"}>
          disabled
        </div>
      </div>
      <div style={Object.assign({}, drawerItemContentStyle, { display: "flex" })}>
        <div className={(this.state.hgViewTranscriptsDirectional) ? "flag-enabled" : "flag-disabled"}>
          directional
        </div>
        &nbsp;&nbsp;
        <FaToggleOn
          onClick={(e) => this.toggleHgViewTranscriptsDirectional(e)}
          className={(this.state.hgViewTranscriptsDirectional) ? "fa-toggle fa-toggle-on" : "fa-toggle fa-toggle-off"} />
        &nbsp;&nbsp;
        <div className={(!this.state.hgViewTranscriptsDirectional) ? "flag-enabled" : "flag-disabled"}>
          UCSC-like
        </div>
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
    if ((!this.state.hgViewCurrentPosition) || (this.state.mode === Constants.appModeLabels.test)) return "";
    const p = this.state.hgViewCurrentPosition;
    const scale = Helpers.calculateScale(p.left.chrom, p.right.chrom, p.left.start, p.right.stop, this, true);
    return (p.left.chrom === p.right.chrom) ? `${p.left.chrom}:${p.left.start}-${p.right.stop} ${scale.scaleAsStr}` : `${p.left.chrom}:${p.left.start} - ${p.right.chrom}:${p.right.stop} ${scale.scaleAsStr}`;
  }

  copyCurrentPositionToClipboard = () => {
    if ((!this.state.hgViewCurrentPosition) || (this.state.mode === Constants.appModeLabels.test)) return "";
    const p = this.state.hgViewCurrentPosition;
    const locationAsStr = (p.left.chrom === p.right.chrom) ? `${p.left.chrom}:${p.left.start}-${p.right.stop}` : `${p.left.chrom}:${p.left.start} - ${p.right.chrom}:${p.right.stop}`;
    navigator.clipboard.writeText(locationAsStr);
  }

  render() {
    return (
      <div className="box" onMouseMove={debounce((e) => {
        this.setState({
          mousePosition:{x: e.clientX, y: e.clientY}
        });
      }, 2)}>
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
                onClick={(e) => e.currentTarget.blur()}
                onFocus={this.onFocusSearchInput}
                onPostFocus={this.closeDrawer}
                title={"Search for a gene of interest or jump to a genomic interval"}
                suggestionsClassName={"suggestions"}
                isMobile={false}
                isDisabled={!this.isAutocompleteEnabled()}
              />
            </div>
            <div className={this.isPileupTrackClusteringButtonEnabled() ? "header-tree header-tree-disabled" : "header-tree"} onClick={(e) => this.triggerPileupTrackClustering(e)} title={'Cluster over window'}>
              <FaTree />
            </div>
            <div className={this.isPileupTrackLayoutRefreshButtonEnabled() ? "header-repile header-repile-disabled" : "header-repile"} onClick={(e) => this.triggerPileupTrackRefreshLayout(e)} title={'Redo molecule layout'}>
              <FaIcicles />
            </div>
            <div className="header-location">
              {this.currentPosition()}
              <div className="header-location-clipboard" onClick={(e) => this.copyCurrentPositionToClipboard(e)} title={'Copy location to clipboard'}>
                <FaClipboard />
              </div>
            </div>
          </div>
        </div>
        <div className="row content">
          { (this.state.hgViewconf) 
            ?
            <div className="content-hg-parent"> 
              {
                (!this.state.clusterCoverEnabled)
                ? <div />
                : 
                  <div className="content-cluster-parent">
                    <div 
                      className="content-cluster-content-info"
                      style={{
                        position: "absolute",
                        top: parseInt((parseInt(window.innerHeight) - Constants.appHeaderHeight) / 2),
                        left: (this.state.mousePosition.x < parseInt(window.innerWidth) / 2) ? this.state.mousePosition.x + this.state.clusterCoverDimensions.w / 2 : "unset",
                        right: (this.state.mousePosition.x > parseInt(window.innerWidth) / 2) ? parseInt(window.innerWidth) - this.state.mousePosition.x + (this.state.clusterCoverDimensions.w / 2) : "unset",
                      }} 
                      >
                      <Badge color="success" pill>{this.state.hgViewCurrentPosition.left.chrom}:{this.xPositionToGenomicCoordinate(this.state.mousePosition.x - this.state.clusterCoverDimensions.w / 2)}-{this.xPositionToGenomicCoordinate(this.state.mousePosition.x + this.state.clusterCoverDimensions.w / 2)}</Badge>
                    </div>
                    <div 
                      className="content-cluster-content-drop" 
                      style={{
                        width: this.state.clusterCoverDimensions.w, 
                        height: this.state.clusterCoverDimensions.h,
                        left: this.state.mousePosition.x - parseInt(this.state.clusterCoverDimensions.w / 2),
                      }} 
                      onClick={(e) => {
                        const x = this.state.mousePosition.x;
                        this.xPositionToGenomicCoordinate(x);
                        this.setState({
                          clusterCoverEnabled: false,
                        });
                      }}
                    />
                    <div className="content-cluster-content-cover" />
                  </div>
              }
              { 
                (!this.state.coverEnabled) 
                  ? <div /> 
                  : (Object.values(this.state.coverVisible).some(e => e === true)) 
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
