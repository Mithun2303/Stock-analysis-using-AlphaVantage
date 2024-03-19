// import React from 'react';
// import Plot from 'react-plotly.js';
// import './Stock.css';

// class Stock extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       stockChartXValues: [],
//       stockChartYValues: []
//     }
//   }

//   componentDidMount() {
//     this.fetchStock();
//   }

//   fetchStock() {
//     const pointerToThis = this;
//     console.log(pointerToThis);
//     const API_KEY ='NYADSCNITJ9HU3ID';
//     let StockSymbol = 'MBG.DEX';
//     let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
//     let stockChartXValuesFunction = [];
//     let stockChartYValuesFunction = [];

//     fetch(API_Call)
//       .then(
//         function(response) {
//           return response.json();
//         }
//       )
//       .then(
//         function(data) {
//           console.log(data);

//           for (var key in data['Time Series (Daily)']) {
//             stockChartXValuesFunction.push(key);
//             stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
//           }

//           //console.log(stockChartXValuesFunction);
//           pointerToThis.setState({
//             stockChartXValues: stockChartXValuesFunction,
//             stockChartYValues: stockChartYValuesFunction
//           });
//         }
//       )
//   }

//   render() {
//     return (
//       <div className='container'>
//         <h1>Stock Market</h1>
//         <div className='plot'>
//             <Plot
//               data={[
//                 {
//                   x: this.state.stockChartXValues,
//                   y: this.state.stockChartYValues,
//                   type: 'scatter',
//                   mode: 'lines+markers',
//                   marker: {color: 'red'},
//                 }
//               ]}
//               onHover='hello'
//               layout={{width: 720, height: 440, title: 'A Fancy Plot'}}
//             />
//         </div >

//       </div>
//     )
//   }
// }

// export default Stock;























import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios'; // Use axios for HTTP requests in React
import './Stock.css';

const Stock = ({ symbol }) => {
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/stock/${symbol}`);
        const data = response.data;

        const timeSeriesDaily = data.timeSeriesDaily;
        if (!timeSeriesDaily) {
          throw new Error("Invalid response format");
        }

        setStockChartXValues(timeSeriesDaily.map(item => item.date));
        setStockChartYValues(timeSeriesDaily.map(item => item.open));
      } catch (error) {
        console.error(error);
        // Handle errors appropriately, e.g., display an error message to the user
      }
    };

    fetchData();
  }, [symbol]); // Re-fetch data on symbol change

  return (
    <div className='container'>
      <h1>Stock Market</h1>
      <div className='plot'>
        <Plot
          data={[
            {
              x: stockChartXValues,
              y: stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            }
          ]}
          onHover='hello'
          layout={{width: 720, height: 440, title: 'A Fancy Plot'}}
        />
    </div >

  </div>
)
}


export default Stock;
