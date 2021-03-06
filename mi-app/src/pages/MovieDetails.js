import styles from '../styles/MovieDetails.module.css';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { httpGet } from '../utils/httpClient';
    
export function MovieDetails() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    
    useEffect(() => {
        httpGet("/movie/" + movieId).then(data => {
            setMovie(data);
        })
    }, [movieId])
    
    if (!movie) {
        return null;
    }

    const imageUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
    return (
        <div className={styles.detailsContainer}>
            <img
                
                src={imageUrl}
                alt={movie.title}
                className={`${styles.col} ${styles.movieImage}`}
            />
            <div className= {`${styles.col} ${styles.movieDetails}`} >
                <p className={`${styles.firstItem}`}>
                    <strong>Title:</strong> {movie.title}
                </p>
                <p>
                    <strong>Genres:</strong>{" "}
                    {movie.genres.map(genre => genre.name).join(", ")}
                </p>
                <p>
                    <strong>Description:</strong> {movie.overview}
                </p>
            </div>
        </div>
    )
}