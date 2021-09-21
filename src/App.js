import React from 'react'
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import MovieList from './Components/MovieList';
import SearchBar from './Components/SearchBar';
import axios from 'axios'
import AddMovie from './Components/AddMovie';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import EditMovie from './Components/EditMovie';

class App extends React.Component{
  constructor(props){
    super()
    this.state = {
      movies :  [ ],
      searchQuery : ''
    }
  }
  componentDidMount(){
    this.getMovies()
  }
  async getMovies(){
    const response = await axios.get('http://localhost:3001/movies')
    this.setState({movies : response.data})
  }
  DeleteMovie =async (movie) => {
    await axios.delete(`http://localhost:3001/movies/${movie.id}`)
    const leftMovies = this.state.movies.filter(m => m.id!==movie.id)

    this.setState({movies : leftMovies})
  }
  handleChanges =(e) =>{
    this.setState({searchQuery : e.target.value})
    
}
addNewMovie = async (newMovie) => {
  await axios.post('http://localhost:3001/movies',newMovie)
  this.setState( st => ({
    movies : st.movies.concat([newMovie])
  }))
  this.getMovies()
}
editMovie = async (id,updatedMovie) =>{
  await axios.put(`http://localhost:3001/movies/${id}`,updatedMovie)
  this.getMovies()
}

//.sort((a,b) => b.id-a.id)
  render(){
    const searchedMovies = this.state.movies.filter( movie => movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase())!==-1).reverse()
    return(
      <Router>
        <div className="container">
        <Route path='/' exact render = {() =>(
          <React.Fragment>
            <SearchBar searchQueryProp={this.state.searchQuery}  handleChangesProp={this.handleChanges} />
          <MovieList DeleteMovieProp={this.DeleteMovie} movies={searchedMovies} />
          </React.Fragment>
          
        )}>
          
        </Route>
          <Route path = '/add' exact render={({history}) => (
            <AddMovie newMovieProp={(movie) => {this.addNewMovie(movie)
              history.push("/")
            }}/>
          )}>
            
          </Route>
          <Route path='/edit/:id' render={(props) => (
            <EditMovie
              {...props}
              onEditMovie = {this.editMovie}
              />
          )} />
          
        </div>
      </Router>
      
    )
  }
}

export default App;
