import logo from './logo.svg';
import './App.css';
import AppSelect from './AppSelect';
import React, { Component } from 'react';
import * as d3 from 'd3';

const data = {
	name: 'Full',
	children:  
  	[
	    {id: 0, name: "Sandbox",value:100},
	    {id: 1,name: "Intra-Organziation", value:200, children:
	    [
	    	{id:6, name:"Structure", value:120},
	    	{id:7, name:"Operation", value:120},
	    	{id:8, name:"Core Values", value:100},
	    ]},
	    {id: 2,name: "Community Development", value:200},
	    {id: 3,name: "ESG Fellowship", value:200},
	    {id: 4,name: "Software", value:200},
	    {id: 5,name: "Business Model Strategy", value:100},
    ]
}

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			tab: 'V2'
		}
		this.welcome = this.welcome.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount(){
		document.querySelector('#tabOne').classList.add('bg-white');
		document.querySelector('#tabTwo').classList.add('bg-black');
		document.querySelector('#tabThree').classList.add('bg-white');
		document.querySelector('#tabFour').classList.add('bg-white');
	}
	handleClick(e){
		this.setState({
			tab: e.target.innerHTML,
		})
	}

	welcome(p) {
		if(document.querySelector('#tabOne')){
			for(var i=0;i<4;i++){
				let myTab = (i === 0) ? '#tabOne' :
						(i === 1) ? '#tabTwo' :
						(i === 2) ? '#tabThree' :
						'#tabFour';
				if(p === ('V' + (i+1))){
					document.querySelector(myTab).classList.replace('bg-white', 'bg-black');
				}else{
					document.querySelector(myTab).classList.replace('bg-black', 'bg-white');
				}
			}
		}
		return <AppSelect data={data} version={this.state.tab}/>
	}
	render(){
	  var myTab = this.state.tab;
	  const tabCount = 4;

	  return (
	    <div>
	    	<header>
		      {
		      	this.welcome(myTab)
		      }
	      	<div id="tabs" className="fixed bottom-0 z-50 w-full flex justify-center">
		      	<ul>
		      	{
		      		[...Array(tabCount)].map((e, i) => {
		      			const myTabNumber = (i === 0) ? 'One' :
		      					(i === 1) ? 'Two' :
		      					(i === 2) ? 'Three' :
		      					'Four';
		      			return (<li id={'tab' + myTabNumber} onClick={(e) => this.handleClick(e)} className="float-left block rounded-lg text-[#19be87] text-center m-1.5 px-0.5">
		      			{'V'+ (i+1)}
		      			</li>)
		      		})
		      	}
		      	</ul>
	      	</div>
	      	</header>
	    </div>
	  );
	}
}

export default App;