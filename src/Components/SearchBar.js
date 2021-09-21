import React from "react";
import { Link } from "react-router-dom";


class SearchBar extends React.Component{
    state ={
       
    }
    
    handleSubmit =(e) =>{
        e.preventDefault()
    }
    render(){
        return(
            <div className="row mt-3 mb-3">
                <div className="col-9 ">
                    <form onSubmit={this.handleSubmit}>
                        <input value={this.props.searchQueryProp} onChange={(e) => this.props.handleChangesProp(e)} type="text" className="form-control" placeholder='Search a movie'/>
                    </form>
                </div>

                <div className="col-3">
                    <Link to='/add' type="button" className="btn btn-outline-secondary w-100">Add Movie</Link>
                </div>
            </div>
            
        )
    }
}
export default SearchBar