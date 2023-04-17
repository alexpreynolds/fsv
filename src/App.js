import React, { Component } from "react";

import axios from "axios";

import {
  Navbar,
  NavbarBrand,
  Nav,
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import { 
  HiGlassComponent, 
  version as HiGlassVersion,
} from "higlass";
import "higlass/dist/hglib.css";

// higlass-pileup
// ref. https://github.com/higlass/higlass-pileup
import "higlass-pileup/dist/higlass-pileup.js";

import { FaToggleOn } from 'react-icons/fa';

import * as Constants from "./Constants.js";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "fiber-seq viewer",
      mode: "test",
      modeToggleEnabled: false,
      hgViewKey: 0,
      hgViewconf: Constants.testHiglassPileupViewconf,
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
    };
    this.hgViewRef = React.createRef();
  }

  componentDidMount() {
    // this.queryHiglassIoForDefaultViewconf();
  }

  componentWillUnmount() {}

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

  toggleMode = (e) => {
    if (!this.state.modeToggleEnabled) return;
    const newMode = (this.state.mode === "test") ? "data" : "test";
    // console.log(`toggleMode | ${this.state.mode} -> ${newMode}`);
    this.setState({
      mode: newMode,
    });
  }

  render() {
    return (
      <div className="box">
        <div className="row header">
          <Navbar fixed="top" dark full>
            <NavbarBrand href='/'>{this.state.title}</NavbarBrand>
            <Nav>
              <div className={(this.state.mode === "data") ? "mode-enabled" : "mode-disabled"}>
                chr11 (Gimelbrant)
              </div>
              &nbsp;&nbsp;
              <FaToggleOn 
                onClick={(e) => this.toggleMode(e)} 
                className={(this.state.mode === "data") ? "fa-toggle fa-toggle-data fa-toggle-disabled" : "fa-toggle fa-toggle-test fa-toggle-disabled"} />
              &nbsp;&nbsp;
              <div className={(this.state.mode === "test") ? "mode-enabled" : "mode-disabled"}>
                test (higlass-pileup)
              </div>
            </Nav>
          </Navbar>
        </div>
        <div className="row content">
          { (this.state.hgViewconf) 
            ? 
            <HiGlassComponent 
              key={this.state.hgViewKey}
              ref={this.hgViewRef}
              options={this.state.hgOptions}
              viewConfig={this.state.hgViewconf}
            /> 
            : 
            <div /> }
        </div>
        <div className="row footer" />
      </div>
    );
  }
}

export default App;
