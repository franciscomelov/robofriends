import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'
import './App.css';





class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: [],
      searchfield: ""
    }
  }

  componentDidMount() { // get data from  => here
    fetch('https://jsonplaceholder.typicode.com/users') //httmps error
      .then(response => response.json())
      .then(users => this.setState({ robots: users }))
  }



  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  render() {
    const { robots, searchfield } = this.state;

    const filteredRobot = this.state.robots.filter(robot => {
      return (
        robot.name.toLowerCase().includes(searchfield.toLowerCase())
        , robot.username.toLowerCase().includes(searchfield.toLowerCase())
      )
    })
    return !robots.length ?
      <h1>Loading...</h1> :
      (
        <div className="tc">
          <h1 className="f2 ">ROBOFRIENDS...</h1>
          <SearchBox searchChange={this.onSearchChange} />

          <Scroll>
            <ErrorBoundry>
              <CardList robots={filteredRobot} />
            </ErrorBoundry>

          </Scroll>

        </div>
      );

  }

}



export default App;