import React, { Component } from 'react';
import * as d3 from 'd3';
//data clean
// function chartTwo(
// }
var data1 = {
        name: 'root',
        children: [
          {
            name: "CC",
            className: "cc",
            value: 20,
            children: [{name:'CC1', value:30}]
          },
          {
            name: "DD",
            className: "dd",
            value: 20,
          },
          {
            name: "EE",
            className: "ee",
            value: 20,
          }
        ]
      };


function chartTwo(data, {
  width = window.innerWidth, // outer width, in pixels
  height = width/(1.5),
  value = ([, y]) => y,
  padding = 10, // padding between circles
  margin = 1, // default margins
  marginTop = margin, // top margin, in pixels
  marginRight = margin, // right margin, in pixels
  marginBottom = margin, // bottom margin, in pixels
  marginLeft = margin,
}){
  document.querySelector('.chart').innerHTML = '';

  var diameter = 250;

  var svg = d3.select('.chart').append('svg')
    .attr('width', diameter)
    .attr('height', diameter);

  var bubble = d3.pack(data)
            .size([diameter, diameter])
            .padding(1.5);

  var nodes = d3.hierarchy(data)
            .sum(function(d) { return d.value; });

  var color = 'blue';

  change(data, bubble(nodes));

  function change(data, nodes) {

    // generate data with calculated layout values
    console.log(nodes);
    var vis = svg.selectAll('circle')
        .data(nodes)
      .enter()
        .insert("circle")
        .attr('transform', d => 'translate(' + [d.x, d.y] + ')')
        .attr('r', d => d.r)
        .attr('class', 'fill-slate-700 stroke-[2px] stroke-red-500')
  };
}

// function chart(data, {
//   name = ([x]) => x, // alias for label
//   label = name, // given d in data, returns text to display on the bubble
//   value = ([, y]) => y, // given d in data, returns a quantitative size
//   group, // given d in data, returns a categorical value for color
//   title, // given d in data, returns text to show on hover
//   link, // given a node d, its link (if any)
//   linkTarget = "_blank", // the target attribute for links, if any
//   width = width, // outer width, in pixels
//   height = width/(1.5), // outer height, in pixels
//   background = background,
//   padding = 10, // padding between circles
//   margin = 1, // default margins
//   marginTop = margin, // top margin, in pixels
//   marginRight = margin, // right margin, in pixels
//   marginBottom = margin, // bottom margin, in pixels
//   marginLeft = margin, // left margin, in pixels
//   groups, // array of group names (the domain of the color scale)
//   colors = d3.schemeTableau10, // an array of colors (for groups)
//   fill = "#ccc", // a static fill color, if no group channel is specified
//   fillOpacity = 0.7, // the fill opacity of the bubbles
//   stroke, // a static stroke around the bubbles
//   strokeWidth, // the stroke width around the bubbles, if any
//   strokeOpacity, // the stroke opacity around the bubbles, if any
// } = {}) {

//   document.querySelector('#bubble').innerHTML = '';

//   var tooltip = d3.select("#bubble")
//   .append('div')
//   .style('opacity',1)
//    var showTooltip = function(d, T){
//     tooltip
//       .transition()
//       .duration(200)
//     tooltip
//       .style("opacity", 1)
//       .html("<span class='text-green-700'>Green</span>\n<span class='text-red-700'>Red</span>\n<span class='text-blue-700'>Blue</span>\n<span class='text-purple-700'>Purple</span>\n<span class='text-yellow-700'>Yellow</span>")
//       .style("left", (d.x) + "px")
//       .style("top", (d.y) + "px")
//       .attr("class", "bg-white p-2.5 border-2 border-black absolute w-[50px] text-[10px] z-40")
//   }

//   var moveTooltip = function(d) {
//     tooltip
//       .style("left", (d.x) - 50 + "px")
//       .style("top", (d.y) + 50 + "px")
//   }

//   var hideTooltip = function(d) {
//     tooltip
//       .transition()
//       .duration(200)
//       .style("opacity", 0)
//   }

//   // Compute the values.
//   const D = d3.map(data, d => d);
//   const V = d3.map(data, value);
//   console.log(V);
//   const G = group == null ? null : d3.map(data, group);
//   const I = d3.range(V.length).filter(i => V[i] > 0);

//   // Unique the groups.
//   if (G && groups === undefined) groups = I.map(i => G[i]);
//   groups = G && new d3.InternSet(groups);

//   // Construct scales.
//   const color = G && d3.scaleOrdinal(groups, colors);

//   // Compute labels and titles.
//   const L = label == null ? null : d3.map(data, label);
//   const T = title === undefined ? L : title == null ? null : d3.map(data, title);

//   // Compute layout: create a 1-deep hierarchy, and pack it.
//   const root = d3.pack()
//       .size([width - marginLeft - marginRight, height - marginTop - marginBottom])
//       .padding(padding)
//     (d3.hierarchy({children: I})
//       .sum(i => V[i]));

//   let myBackground = (background === 0) ? 'bg-none': "bg-[url('./bg.png')] bg-cover";


//   const svg = d3.select("#bubble")
//         .append("svg")
//         .attr('id', 'bubbleChart')
//         .attr("class", 'w-1/2 ' + "text-[10px] h-[100vh] " + myBackground)
//         .attr("viewBox", [-marginLeft, -marginTop, width, height])
//         .attr("text-anchor", "middle");

//   const leaf = svg.selectAll("a")
//     .data(root.leaves())
//     .join("a")
//       .attr("transform", d => `translate(${d.x},${d.y})`)
//       .on('mouseover', d => showTooltip(d, T))
//       .on("mousemove", moveTooltip)
//       .on("mouseleave", hideTooltip)
      
//   leaf.append("circle")
//       .attr("fill", G ? d => color(G[d.data]) : fill == null ? "none" : fill)
//       .attr("fill-opacity", fillOpacity)
//       .attr("r", d => d.r)
//       .attr("class", "opacity-[.75] stroke-black hover:scale-110 hover:stroke-2 hover:stroke-red-700")
  


//   // if (T) leaf.append("title")
//   //     .text(d => T[d.data]);

//   if (L) {
//     // A unique identifier for clip paths (to avoid conflicts).
//     const uid = `O-${Math.random().toString(16).slice(2)}`;

//     leaf.append("clipPath")
//         .attr("id", d => `${uid}-clip-${d.data}`)
//       .append("circle")
//         .attr("r", d => d.r);

//     leaf.append("text")
//       .selectAll("tspan")
//       .data(d => `${L[d.data]}`.split(/\n/g))
//       .join("tspan")
//         .attr("x", 0)
//         .attr("y", (d, i, D) => `${i - D.length / 2 + 0.85}em`)
//         .attr("fill-opacity", (d, i, D) => i === D.length - 1 ? 0.7 : null)
//         .text(d => d);
//   }

//   return [Object.assign(svg.node(), {scales: {color}}), []];
// }

class AppV1 extends Component {

	constructor(props){
		super(props);
		this.state = {
			data: this.props.data,
      version: this.props.version,
      renderNum:0,
      background:1
		}
    this.changeBackground = this.changeBackground.bind(this);
	}

  changeBackground(){
       if(document.querySelector('#bubbleChart').classList[3] === "bg-none"){
        document.querySelector('#bubbleChart').classList.replace("bg-none", "bg-[url('./bg.png')]");
        this.setState({
          background:1,
        })
       }else{
         document.querySelector('#bubbleChart').classList.replace("bg-[url('./bg.png')]", "bg-none");
         this.setState({
          background:0,
         })
       }
  }

	componentDidMount(){
    //const files = this.state.data.filter(d => d.value !==null)
		// var chartResults = chart(this.props.data.children, {
  //     label: d => [...d.name.split(".").pop().split(/(?=[A-Z][a-z])/g), d.value.toLocaleString("en")].join("\n"),
  //     value: d => d.value,
  //     group: d => d.name.split(".")[1],
  //     title: d => `${d.name}\n${d.value.toLocaleString("en")}`,
  //     width: window.innerWidth/2, 
  //     background: this.state.background
  //   })

    chartTwo(data1, {
      value: d=> d.value
    });

		this.setState({
			data: [],
      renderNum: 1,
		})
	}


	render(){
	const myNewData = this.state.data;
  const versionClass = (this.state.version === 1) ?
    'fixed left-[10%]':
    (this.state.version === 2) ?
    '':
    '';
    
    if(this.state.renderNum > 0){
      // var chartResults = chart(this.props.data.children, {
      //   label: d => [...d.name.split(".").pop().split(/(?=[A-Z][a-z])/g), d.value.toLocaleString("en")].join("\n"),
      //   value: d => d.value,
      //   group: d => d.name.split(".")[1],
      //   title: d => `${d.name}\n${d.value.toLocaleString("en")}`,
      //   width: window.innerWidth/2,
      //   background: this.state.background 
      // })

      chartTwo(data1, {
      value: d=> d.value
    });
    }
	  return (
      <div>
        <a onClick={this.changeBackground} className="hover:opacity-[.75] bg-[url('./icon.svg')] w-[40px] h-[40px] bg-contain fixed top-[5%] left-[5%]"></a>
	      <div class="chart"></div>
        <div id="bubble">    
	      </div>
      </div>
	  );
	}
}

export default AppV1;