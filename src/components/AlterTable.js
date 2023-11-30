import React, { Component } from 'react';
import * as d3 from 'd3';

const data = {
  name: "Eve",
  value:50,
  children: [
    {name: "Sandbox", value:500},
    {name: "Intra-Organziation"},
    {name: "Community Development", value:500},
    {name: "ESG Fellowship"},
    {name: "Software", value:500},
    {name: "Business", value:500},
    
  ]
};
class AlterTable extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			data: [],
		}
	}

	componentDidMount(){
		  const width = 528;
		  const height = width;
		  const margin = 1; // to avoid clipping the root circle stroke
		 // const name = d => d.id.split(".").pop(); // "Strings" of "flare.util.Strings"
		 // const group = d => d.id.split(".")[1]; // "util" of "flare.util.Strings"
		 // const names = d => name(d).split(/(?=[A-Z][a-z])|\s+/g); // ["Legend", "Item"] of "flare.vis.legend.LegendItems"

		  // Specify the number format for values.
		  const format = d3.format(",d");

		  // Create a categorical color scale.
		  const color = d3.scaleOrdinal(d3.schemeTableau10);

		  // Create the pack layout.
		  const pack = d3.pack()
		      .size([width - margin * 2, height - margin * 2])
		      .padding(30);

		  // Compute the hierarchy from the (flat) data; expose the values
		  // for each node; lastly apply the pack layout.
		  const root = pack(d3.hierarchy(data)
		      .sum(d => d.value));

		  this.setState({
		  	data: root.descendants().slice(1)
		  })

	}

	render(){
		 return (
		    <div className='fixed right-[0%] top-[20%] w-2/4 text-black'>
		    	{
		    		this.state.data.map((item) => {
		    					return (
		    							<ul className="w-[30%] hover:bg-zinc-300">{item.data.name}
		    							</ul>
		    						)
		    			
		    		})
		    	}
		    </div>
		  );
	}
}

export default AlterTable;