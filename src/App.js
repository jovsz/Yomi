import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import {db} from './components/firebase';



const App = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [dbMovies, setDbMovies] = useState([]);

	const getMovieRequest = async (searchValue) => {
		const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=e9ec797c`;
		

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);


	useEffect(() => {
		
		db.collection("movies-to-watch")
		.doc()
		.get() 
		.then((snapshot) => { 
			if (snapshot.exists) 
			{ setDbMovies(snapshot.data()); 
				console.log(setDbMovies)
			} else {  } 
     	})

		

		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}

	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = async (movie) => {
		const newFavouriteList = [...favourites, movie];
		console.log(movie)
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
		
		db.collection('movies-to-watch')
        .add({
            title: movie.Title,
            poster: movie.Poster
        })
        .then(() =>{
            
        })
        .catch((err) => {
            alert('Error: ' + err.message);
        });
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={AddFavourites}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
			<p className='fs-2 fw-bold'>Peliculas pendientes de ver:</p>
			</div>
			<div className='row'>
				<MovieList
					movies={favourites}
					handleFavouritesClick={removeFavouriteMovie}
					favouriteComponent={RemoveFavourites}
				/>
			</div>
			<div className="blog-container">
            	<p>{dbMovies.title}</p>
            	<img src={dbMovies.poster} alt={dbMovies.title} />
            </div>
		</div>
	);
};

export default App;
