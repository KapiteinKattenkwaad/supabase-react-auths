import {useState, useEffect} from 'react'
import {supabase} from './supabaseClient'
import Avatar from './Avatar'

const Account = ({session}) => {
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [website, setWebsite] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)
    const [liked_movies, setLikedMovies] = useState([])

    const movies = [
        {id: 1, title: 'The Shawshank Redemption'},
        {id: 2, title: 'The Godfather'},
        {id: 3, title: 'The Godfather: Part II'},
        {id: 4, title: 'The Dark Knight'},
        {id: 5, title: '12 Angry Men'},
    ];
    const handleAddMovie = (movie) => {
        setLikedMovies(([...(liked_movies) || [], movie]));
        // setLikedMovies([...((liked_movies) || []), movie]);
    };

    const handleRemoveMovie = (movie) => {
        setLikedMovies(liked_movies.filter((m) => m.id !== movie.id));
    };

    useEffect(() => {
        getProfile()
    }, [session])

    const getProfile = async () => {
        try {
            setLoading(true)
            const {user} = session

            let {data, error, status} = await supabase
                .from('profiles')
                .select(`username, website, avatar_url, liked_movies`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setUsername(data.username)
                setWebsite(data.website)
                setAvatarUrl(data.avatar_url)
                setLikedMovies(data.liked_movies)
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    const updateProfile = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const {user} = session

            const updates = {
                id: user.id,
                username,
                website,
                avatar_url,
                liked_movies,
                updated_at: new Date(),
            }

            console.log(updates.liked_movies)

            let {error} = await supabase.from('profiles').upsert(updates)

            if (error) {
                throw error
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div aria-live="polite">
            {loading ? (
                'Saving ...'
            ) : (
                <form onSubmit={updateProfile} className="form-widget">
                    <Avatar
                        url={avatar_url}
                        size={150}
                        onUpload={(url) => {
                            setAvatarUrl(url)
                            updateProfile({username, website, avatar_url: url, liked_movies: liked_movies.map(item => JSON.parse(item))})
                        }}
                    />
                    <div>Email: {session.user.email}</div>
                    <div>
                        <label htmlFor="username">Name</label>
                        <input
                            id="username"
                            type="text"
                            value={username || ''}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="website">Website</label>
                        <input
                            id="website"
                            type="url"
                            value={website || ''}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                    </div>

                    <div>
                        <button className="button primary block" disabled={loading}>
                            Update profile
                        </button>
                    </div>
                </form>
            )}
            <div>
                {/*<label htmlFor="movies">Movies</label>*/}
                {/*<input*/}
                {/*    id="movies"*/}
                {/*    type="text"*/}
                {/*    value={liked_movies || ''}*/}
                {/*    onChange={(e) => addMovie(e.target.value)}*/}
                {/*/>*/}
                {/*{*/}
                {

                    // console.log((JSON.parse(liked_movies)))
                }

                {/*{*/}
                {/*    toShowMoves &&*/}
                {/*    toShowMoves.map((movie) =>*/}
                {/*        <li key={movie.id}>*/}
                {/*            {movie.title}*/}
                {/*        </li>*/}
                {/*    )*/}
                {/*}*/}
            </div>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        {movie.title}
                        <button onClick={() => handleAddMovie(movie)}>Add</button>
                        <button onClick={() => handleRemoveMovie(movie)}>Remove</button>
                    </li>
                ))}
            </ul>


            {
                liked_movies &&
                [...liked_movies].map((movie) =>
                    // console.log(movie)
                    <li key={movie.id}>
                        {movie.title}
                    </li>
                )
            }

            <button type="button" className="button block" onClick={() => supabase.auth.signOut()}>
                Sign Out
            </button>
        </div>
    )
}

export default Account
