import React, { useEffect, useState } from 'react'
import './App.css'
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';
import Header from './components/Header';

// eslint-disable-next-line
export default () => {

  const [movieList, setMovieList] = useState([]); //usando state
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(null)

  useEffect(() => { // carrega apos a pagina ser recarregada;

    const loadAll = async () => {

      //lista de filmes
      let list = await Tmdb.getHomeList();
      setMovieList(list)

      //filme em destaque
      let original = list.filter(film => film.slug == 'Originais');
      let random = Math.floor(Math.random() * (original[0].items.results.length - 1));
      let choosen = original[0].items.results[random];
      let chosenInfo = await Tmdb.getMovieInfo(choosen.id, 'tv');

      setFeatureData(chosenInfo);
      
    }

    loadAll()
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])

  return (
    <div className="page">

      <Header black={blackHeader} />

      {featureData &&
        <FeatureMovie item={featureData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
      
      <footer>
        Aula B7Web <br/>
        Direitor de imagem Netflix <br/>
        Dados usados do site themoviedb.org <br/>
      </footer>
    </div>
  );
}