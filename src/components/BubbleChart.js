import React, { Component } from 'react';
import * as d3 from 'd3';
//data clean
// function chartTwo(
// }



function chartTwo(data, {
  width = window.innerWidth/1.2, // outer width, in pixels
  height = width/(1.5),
  value = ([, y]) => y,
  padding = 10, // padding between circles
  margin = 1, // default margins
  marginTop = 100, // top margin, in pixels
  marginRight = margin, // right margin, in pixels
  marginBottom = margin, // bottom margin, in pixels
  marginLeft = margin,
  background = background
}){

  document.querySelector('.chart').innerHTML = '';

  var diameter = width/2;

  let myBackground = (background === 1) ? "bg-[url('./bg.png')] bg-cover" :'bg-none';
  
  var tooltip = d3.select("#bubble")
  .append('div')
  .style('opacity',1)
   var showTooltip = function(d, title){
    tooltip
      .transition()
      .duration(200)
    tooltip
      .html("<span class='text-black'>" + title + "</span>\n\n" + "<span class='text-green-700'>Green</span>\n<span class='text-red-700'>Red</span>\n<span class='text-blue-700'>Blue</span>\n<span class='text-purple-700'>Purple</span>\n<span class='text-yellow-700'>Yellow</span>")
      .style("left", (d.x) + "px")
      .style("top", (d.y) + "px")
      .attr("id", 'tooltip')
      .attr("class", "tooltip bg-white p-2.5 border-2 border-black absolute w-[100px] text-[10px] z-40")
  }

  var moveTooltip = function(d) {
    tooltip
      .style("left", (d.x) - 50 + "px")
      .style("top", (d.y) + 50 + "px")
  }

  var hideTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 1)
  }


  var svg = d3.select('.chart').append('svg')
    .attr('width', diameter)
    .attr('height', '100vh')
    .attr('id', "bubbleChart")
    .attr("class", myBackground + ' w-[100%] ' + 'text-[6px] xs:text-[4px] sm:text-[6px] md:text-[12px] lg:text-[12px] ')
    .attr("viewBox", [-marginLeft, -marginTop, width, height]);

  var bubble = d3.pack(data)
            .size([diameter, diameter])
            .padding(3);

  var nodes = d3.hierarchy(data)
            .sum(function(d) { return d.value; });

  var color = 'blue';

  change(data, bubble(nodes));

  function change(data, nodes) {

    // generate data with calculated layout values
    var vis = svg.selectAll('circle')
        .data(nodes)
      .enter()
        .insert("circle")
        .attr('transform', d => 'translate(' + [d.x, d.y] + ')')
        .attr('r', d => d.r)
        .attr('name', d=> d.data.name)
        .attr('class', 'stroke-[1px] opacity-[.8] fill-[#9DB4CC] hover:opacity-[1] hover:stroke-[4px] hover:stroke-red-700')
        .attr('stroke', d=> {return 'black'})
        .attr('display', d=> {return (d.parent === null) ? 'none' : ''})
        .on('mouseover', d => showTooltip(d, d.target['__data__'].data.name))
        .on("mousemove", moveTooltip)
        .on("mouseleave", hideTooltip)


    var texts = svg.selectAll(null)
          .data(nodes)
        .enter()
        .append('text')
        .attr('transform', d => 'translate(' + [d.x, d.y] + ')')
        .attr('r', d => d.r)
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .attr("class", '')
        .text(d => {return (d.parent === null || d.children) ? '' : (d.data.name + ' ' + d.data.value)});
  };
}

class AppV1 extends Component {

	constructor(props){
		super(props);
		this.state = {
			data: this.props.data,
      version: this.props.version,
      renderNum:0,
      background:0,
		}
    this.changeBackground = this.changeBackground.bind(this);
	}

  changeBackground(){
       if(document.getElementById('tooltip')){
          document.getElementById('tooltip').remove();
        }
       if(document.querySelector('#bubbleChart').classList[0] === "bg-none"){

        document.querySelector('#bubbleChart').classList.replace("bg-none", "bg-[url('./bg.png')]");
       }else{
         document.querySelector('#bubbleChart').classList.replace("bg-[url('./bg.png')]", "bg-none");
       }

       this.setState({
        background: this.state.background === 1 ? 0: 1,
       })
  }

	componentDidMount(){

    chartTwo(this.props.data, {
      value: d=> d.value,
      background: this.state.background
    });

		this.setState({
			data: [],
      renderNum: 1,
		})
	}


	render(){
    if(document.getElementById('tooltip')){
      document.getElementById('tooltip').remove();
    }
    
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

        chartTwo(this.props.data, {
        value: d=> d.value,
        background: this.state.background
      });
    }
	  return (
      <div>
        <button onClick={this.changeBackground} className="hover:opacity-[.75] bg-[url('./icon.png')] w-[40px] h-[40px] bg-contain fixed top-[5%] left-[5%]"></button>
	      <div class="chart"></div>
        <div id="bubble">    
	      </div>
      </div>
	  );
	}
}

export default AppV1;