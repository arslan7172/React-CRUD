import React from 'react';
import serialize from 'form-serialize'
import axios from 'axios';
class EditMovie extends React.Component {
    constructor(props){
        super()
        this.state = {
            name : '',
            rating: '',
            imageURL : '',
            overview : ''
    }
    }
    
    componentDidMount = async () => {
        const id = this.props.match.params.id
        const response = await axios.get(`http://localhost:3001/movies/${id}`)
        this.setState({
            name : response.data.name,
            rating : response.data.rating,
            overview  : response.data.rating,
            imageURL : response.data.imageURL
        })
    }
    updateChanges = (e) => {
       this.setState({[e.target.name] : e.target.value}) 
    }

    handleFormSubmit = (e) =>{
        e.preventDefault()
        const {name, rating, imageURL, overview } = this.state

        const id = this.props.match.params.id

        const updatedMovie = {
            name, 
            rating,
            imageURL,
            overview
        }

        this.props.onEditMovie(id,updatedMovie);
        this.props.history.push('/')

    }
    render() {

        return  (
            <div className="container">
            <form className="mt-5" onSubmit={this.handleFormSubmit}>
            <input className="form-control" id="disabledInput" type="text" placeholder="Fill The Form To Add A Movie.." disabled/>
                <div className="form row">
                    <div className="form-group col-md-10">
                        <label htmlFor="inputName" >Name</label>
                        <input  type="text" 
                                className="form-control" 
                                name="name"
                                    value={this.state.name}
                                    onChange = {this.updateChanges}
                                />
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputRating">Rating</label>
                        <input 
                                type="text" 
                                className="form-control" 
                                name="rating"
                                    value = {this.state.rating}
                                    onChange = {this.updateChanges}
                                />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="inputImage">Image URL</label>
                        <input 
                                type="text" 
                                className="form-control" 
                                name="imageURL"
                                    value={this.state.imageURL}
                                    onChange = {this.updateChanges}
                                />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="overviewTextarea">Overview</label>
                        <textarea 
                                className="form-control" 
                                name="overview" rows="5" value={this.state.overview} onChange = {this.updateChanges}></textarea>
                    </div>
                </div>
                <input type="submit" className="btn btn-danger btn-block" value="Edit Movie" />
            </form>
        </div>
        )

    }
}


export default EditMovie;