// /**
//  * Created by lema on 2018/2/20.
//  */
// import React from 'react';
// import ReactDOM from 'react-dom';
// import {VictoryStack, VictoryBar, VictoryAxis, VictoryLabel} from 'victory';

// const dataA = [
//     { x: "Tunning Mod", y: 57 },
//     { x: "Traits", y: 40 },
//     { x: "Cloths", y: 38 },
//     { x: "Hair", y: 37 },
//     { x: "Makeup", y: 25 },
//     { x: "House", y: 19 },
//     { x: "Lot", y: 15 },
//     { x: "Furniture", y: 13 },
//     { x: "Character", y: 12 }
// ];

// const dataB = dataA.map((point) => {
//     const y = Math.round(point.y + 3 * (Math.random() - 0.5));
//     return {point, y };
// });

// const width = 500;
// const height = 500;
// const padding = { top: 80, bottom: 80, left: 20, right: 20 };


// export default class StackedBar extends React.Component {

//     render() {
//         return (
//             <svg viewBox={`0 0 ${width} ${height}`}
//                  style={{ width: "100%", height: "auto" }}
//             >
//                 <VictoryStack horizontal
//                               standalone={false}
//                     /* setting a symmetric domain makes it much easier to center the axis  */
//                               domain={{ x: [-60, 60] }}
//                               padding={padding}
//                               height={height}
//                               width={width}
//                               style={{ data: { width: 20 }, labels: { fontSize: 11 } }}
//                 >
//                     <VictoryBar
//                         style={{ data: { fill: "tomato" } }}
//                         data={dataA}
//                         y={(data) => (-Math.abs(data.y))}
//                         labels={(data) => (`${Math.abs(data.y)}%`)}
//                     />
//                     <VictoryBar
//                         style={{ data: { fill: "orange" } }}
//                         data={dataB}
//                         labels={(data) => (`${Math.abs(data.y)}%`)}
//                     />
//                 </VictoryStack>

//                 <VictoryAxis dependentAxis
//                              height={height}
//                              width={width}
//                              padding={padding}
//                              style={{
//                                  axis: { stroke: "transparent" },
//                                  ticks: { stroke: "transparent" },
//                                  tickLabels: { fontSize: 11, fill: "black" }
//                              }}
//                              tickLabelComponent={<VictoryLabel x={250} textAnchor="middle"/>}
//                              tickValues={dataA.map((point) => point.x).reverse()}
//                 />
//             </svg>
//         );
//     }

// }

