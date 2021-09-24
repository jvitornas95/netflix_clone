import react from "react";
import './FeatureMovie.css'

export default ({ item }) => {

    let firstDate = new Date(item.first_air_date);
    let genres = [];
    
    for (let i in item.genres){
        genres.push(item.genres[0].name)
    }

    return (
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className="featured--vertical">

                <div className="featured--horizontal" >
                    <div className="featured--name">{item.original_name}</div>
                    <div className="featured--info">
                        <div className="featured--points">{item.vote_average} pontos</div>
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                        <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons != 1 ? 's' : ''}</div>
                        <div className="featured--description">{item.overview}</div>
                        <div className="featured--button">
                            <a className="featured--whatchbutton" href="">▶ Assistir</a>
                            <a className="featured--mylistbutton" href="">Minha lista</a>
                        </div>
                        <div className="featured--genres"> <strong>Generos: {genres.join(', ')}</strong> </div>
                    </div>

                </div>

            </div>


        </section>
    )

}