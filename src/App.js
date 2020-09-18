import React, { Component } from "react";
import Search from "./components/Search"
import Table from "./components/Table"
import Button from "./components/Button"
// import logo from './logo.svg';
import "./App.css";

const BackgroundContext = React.createContext(null);


// =====  HACKERNEWS URL CONSTATNS AND DEFAULT PARAMETERs ====== //
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';    // CHANGED THIS TO SEARCH BY DATE
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page='
const PARAM_HPP = 'hitsPerPage=';

const DEFAULT_QUERY = 'technology';
const DEFAULT_HPP = 100;

// isSearched() is used to filter the list with a (searchTerm) === NO MORE USED
// const isSearched = searchTerm => item =>
//   item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',  // searchKey is non-fluctant and helps in implemnenting a client-cache
      searchTerm: DEFAULT_QUERY,
    };

    console.log("STATE",this.state);
  }

  // HELPER FUNCTION TO SEARCH FROM [HACKER-NEWS API]
  fetchSearchTopStories = (searchTerm, page =0) => {
    console.log("... calling HackerNews API");
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result))   // SET SEARCH RESULT IN THE STATE
    .catch(error => error);
  }

  // SETS SEARCH RESULT FROM HACKERNEWS IN THE STATE
  setSearchTopStories = (result)  =>{
    const { hits, page } = result;
    const { searchKey, results } = this.state;
    const oldHits = results && results[searchKey]
     ? results[searchKey.hits]
     : [];
    const updatedHits = [...oldHits, ...hits ]
    console.log(result);  // VIEW SEARCH RESULT IN CONSOLE
    // DONT FOR THE DATA STRUCTURE RETURNED FROM THE HACKERNEWS API
    this.setState({
      results: {
        ...results,
        [searchKey]: {
          hits: updatedHits,
          page,
        }
      }
    });
  }

  // check if result is cached before making  API call
  needsToSearchTopStories=(searchTerm) =>{
    return !this.state.results[searchTerm];
  }

  // handler for 'DISMISS' button in [TABLE-COMPONENT]
  onDismiss=(id) =>{
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    // update the state
    this.setState({ 
      results: {
        ...results, 
        [searchKey]: {hits: updatedHits, page}
      }
    });
  }

  // changes the 'searchTerm' in the state, each time we type in the input field
  onSearchChange=(event) =>{
    // 'event' is REACTs systhetic event
    this.setState({ searchTerm: event.target.value }); // update state to the input text
  }

  // called when 'SEARCH' button is clicked
  onSearchSubmit=(event) =>{
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm })
    if(this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }

  //  COMPONENT-DID-MOUNT LIFECYCLE
  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    // FETCH DATA USING THE NATIVE [FETCH API]
    this.fetchSearchTopStories(searchTerm);
  }

  // RENDER RENDER REDNER RENDER RENDER
  render() {
    const { 
      results, 
      searchTerm, 
      searchKey 
    } = this.state;

    const page = (
      results && 
      results[searchKey] && 
      results[searchKey].page
    ) || 0;

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];

    return (
      <div className="page">
        <div className="interactions">
          <Search 
          value={searchTerm} 
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
          label="Search"
          />
        </div>

        <Table
          list={list}
          onDismiss={this.onDismiss}
        />

        {
          results &&
          <div className="interactions">
            <Button onClick={() => this.fetchSearchTopStories(searchKey, page+1)}>
              More
            </Button>
          </div>
        }
      </div>
    );
  }
}

export default App;

// REACT v16 ERROR BOUNDARY COMPONENT
// class ErrorBoundary extends Component {
//   render() {
//     return (
//       <div>
//         <h1>I catch errors in child components</h1>
//       </div>
//     )
//   }

//   componentDidCatch(err, info) {

//   }
// }