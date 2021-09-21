import React from "react";
import { Link } from "react-router-dom";

class MovieList extends React.Component{
    constructor(props){
        super()
    }
    truncateString = (overview) =>{
        if (!overview.length) return null
        if (overview.length<=95) {return overview}
        else{
           return overview.substring(0,95)+'...'
        }
    }
    render(){
        return(
            <div className="row">
            {this.props.movies.map((movie,i) => (
                <div className="col-lg-4" key = {i}>
                    <div className="card mb-4 shadow-sm">
                    <img src={movie.imageURL} className="card-img-top" alt={movie.name}/>
                    <div className="card-body">
                        <h5 className="card-title">{movie.name}</h5>
                        <p className="card-text">{this.truncateString(movie.overview)}</p>
                    </div>
                    <div className="d-flex justify-content-around align-items-center mb-3">
                        <button type="button" className="btn btn-outline-danger" onClick={()=>this.props.DeleteMovieProp(movie)}>Delete</button>
                        <Link to={`/edit/${movie.id}`} type="button" className="btn btn-outline-warning">Edit</Link>
                        <button type="button" className="btn btn-outline-info">{movie.rating}</button>
                    </div>
                </div>
            </div>
            ))}
                
        </div>
        )
    }
}
export default MovieList