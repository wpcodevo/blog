import React, { Component } from "react";

class GoogleFixAds extends Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <ins
        className='adsbygoogle'
        style={this.props.style}
        data-ad-client={process.env.DATA_AD_CLIENT}
        data-ad-slot={this.props.slot}
      >
        {" "}
      </ins>
    );
  }
}

export default GoogleFixAds;
