import React, { Component } from "react";
import axios from "axios";
import StocksContainer from "./StocksContainer";
import Chart from "../tiles/Chart";
import Ticker from "../tiles/Ticker";
import DailyHistoryContainer from "./DailyHistoryContainer";

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbolList: [
        "SPX",
        "MSFT",
        "AAPL",
        "AMZN",
        "FB",
        "BRK-B",
        "GOOG",
        "GOOGL",
        "JPM",
        "JNJ",
        "V"
      ],
      indivStockData: [],
      sp500: {},
      sp10: {}
    };
  }

  componentDidMount() {
    console.log(this.state.indivStockData);
    console.log(this.state.sp500);
    console.log(this.state.sp10);
  }

  componentDidUpdate() {
    console.log(this.state.indivStockData);
    console.log(this.state.sp500);
    console.log(this.state.sp10);
  }

  buttonClick = async () => {
    this.fetchData(this.state.symbolList);
  };

  fetchData = symbolList => {
    fetch(`/api/v1/fetch/`, {
      method: "POST",
      body: JSON.stringify(symbolList),
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({
          indivStockData: body.indivStockData,
          sp500: body.sp500,
          sp10: body.sp10
        });
      });
  };

  render() {
    return (
      <div>
        <div className="row" id="sp10-title">
          SP10
          <button onClick={this.buttonClick}>Fetch Data</button>
          <button onClick={this.testClick}>Test Click</button>
        </div>
        <div className="row">
          <div className="outline small-8 columns">
            <div className="row">
              <div className="outline small-6 columns">
                Today
                <Ticker sp10={this.state.sp10} sp500={this.state.sp500} />
              </div>
              <div className="outline small-6 columns">
                Last 365 Days
                <Ticker sp10={this.state.sp10} sp500={this.state.sp500} />
              </div>
            </div>
            <div className="outline row">
              <Chart />
            </div>
          </div>
          <div className="outline small-4 columns">
            <StocksContainer stockData={this.state.indivStockData} />
          </div>
          <div className="outline">
            <DailyHistoryContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeContainer;
