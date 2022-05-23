import React from 'react'
import Movies from './Movies'
import './MoviesList.css'
import { connect } from "react-redux";
import { MovieActionTypes } from "../reducers/movieReducer";
class MoviesList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      canSee: 4,
      input: 0,
      category: '',
      key: '',
      click: null,
      categores: ['', 'Comedy', 'Animation', 'Thriller', 'Drame'],
      movies: []
    }
  }
  componentDidMount() {
    this.filtrer()
  }

  handleClick = (e) => {

    const remove = window.confirm("Etes-vous sûr de bien vouloir retirer ce film de la site ?")
    if (remove) {
      let index = e
      let newMovie = this.state.movies;
      let id = newMovie.findIndex(item => item.id === (e))
      console.log(id)
      newMovie.splice(id, 1)
      this.setState({ movies: newMovie })
      this.props.dispatch({
        type: MovieActionTypes.DeleteMovie, index
      })
    }
    if (this.props.listMovies.filter(movies => movies.category.includes(this.state.category)).length == 0) {
      let newcategores = this.state.categores.filter(item => !this.state.category.includes(item))
      this.setState({ categores: newcategores })
      console.log(newcategores)
    }
  }


  handleLike = (e) => {
    let id = e;
    let newMovie = this.state.movies;
    let movie = newMovie.find(item => item.id === (e))
    let likes = movie.likes
    let dislikes = movie.dislikes
    if (movie.click != "like") {
      this.setState({
        click: "like"
      });
      let newlike = likes + 1
      movie.likes = newlike
      movie.click = "like"
      console.log("movie.likes" + movie.likes)
    } else {
      this.setState({
        click: null
      });
      movie.click = null
      let newlike = likes - 1
      movie.likes = newlike
      console.log("movie.likes" + movie.likes)
    }
  }
  handleDislike = (e) => {
    let id = e;
    let newMovie = this.state.movies;
    let movie = newMovie.find(item => item.id === (e))
    let dislikes = movie.dislikes
    if (movie.click != "dislike") {
      this.setState({
        click: "dislike"
      });
      let newlike = dislikes + 1
      movie.dislikes = newlike
      movie.click = "dislike"
      console.log("movie.likes" + movie.likes)
    } else {
      this.setState({
        click: null
      });
      movie.click = null
      let newdislike = dislikes - 1
      movie.dislikes = newdislike
      console.log("movie.likes" + movie.likes)
    }
  }



  next = () => {

    let out = this.state.input + this.state.canSee
    if (out < this.props.listMovies.filter(movies => movies.category.includes(this.state.category)).length) {
      this.setState({ input: out })
      const newMovie = this.props.listMovies.filter(movies => movies.category.includes(this.state.category)).slice(out, out + this.state.canSee)
      this.setState({ movies: newMovie })
      console.log("next")
      console.log(this.state.input)
    }
  }
  Previous = () => {
    let out = this.state.input - this.state.canSee
    if (out > -1) {
      const newMovie = this.props.listMovies.filter(movies => movies.category.includes(this.state.category)).slice(out, this.state.input)
      this.setState({ input: out })
      this.setState({ movies: newMovie })
      console.log("previous")
    }
  }


  filtrer = () => {
    const newMovie = this.props.listMovies.filter(movies => movies.category.includes(this.state.category)).slice(0, this.state.canSee)
    this.setState({ movies: newMovie })


  }

  loadMore = (i) => {
    const newMovie = this.props.listMovies.filter(movies => movies.category.includes(this.state.category)).slice(0, i)
    const movie = this.props.listMovies.filter(movies => movies.category.includes(this.state.category))
    this.setState({ movies: newMovie })
    this.setState({ canSee: i })
    this.props.dispatch({
      type: MovieActionTypes.UpdateMovie, movie
    })
  }
  handleChange = (e) => {

    this.setState({ category: e.target.value })
    this.setState({ key: e.target.key })
    const newMovie = this.props.listMovies.filter(movies => movies.category.includes(e.target.value)).slice(0, this.state.canSee)
    const movie = this.props.listMovies.filter(movies => movies.category.includes(e.target.value))
    this.setState({ movies: newMovie })
    this.setState({ input: 0 })
    this.props.dispatch({
      type: MovieActionTypes.UpdateMovie, movie
    })


  }

  render() {
    return (
      <div>
        <select className="app-select" onChange={this.handleChange}>
          {this.state.categores.map((categorie, key) => (
            <option id={key}>{categorie}</option>))}
        </select>
        <div className="movieslist-container">
          {this.state.movies.map((id) => (<Movies {...id} handleClick={this.handleClick} handleLike={this.handleLike} handleDislike={this.handleDislike} />))}
        </div>
        <div className='flex'>
          <button className="btn btn-light" type="button" onClick={() => { this.loadMore(4) }}>Affiche 4 résultats sur{this.props.listMovies.filter(movies => movies.category.includes(this.state.category)).length}</button>
          <button className="btn btn-light" type="button" onClick={() => { this.loadMore(8) }}>Affiche 8 résultats sur{this.props.listMovies.filter(movies => movies.category.includes(this.state.category)).length}</button>
          <button className="btn btn-light" type="button" onClick={() => { this.loadMore(12) }}>Affiche 12 résultats sur{this.props.listMovies.filter(movies => movies.category.includes(this.state.category)).length}</button>
        </div>
        <div className='flex'>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item"><a class="page-link" href="#" onClick={this.Previous}>Previous</a></li>
              <li class="page-item"><a class="page-link" href="#" onClick={this.next}  >Next</a></li>
            </ul>
          </nav>
        </div>

      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    listMovies: state.movies

  };
};

export default connect(
  mapStateToProps,
)(MoviesList);
