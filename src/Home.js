import React from 'react';
import amazonBg from './images/Prime.jpg';
import book from './images/book.jpg'
import './Home.css';
import Product from './Product';

function Home() {
  return (
    <div className='home'>
     <div className="home__container">
        <img className='home__image' src={amazonBg} alt="" />

        <div className="home__row">
            <Product title='The lean startup' price={19.99} image={book}
            rating={5} />

            <Product title='Switch up' price={39.99} image={book}
            rating={3} />

           
        </div>


        <div className="home__row">
        <Product title='Good note' price={290.99} image={book}
            rating={5} />

        <Product title='Jotter to read' price={2.99} image={book}
            rating={4} />

        <Product title='Wealthy note' price={29.99} image={book}
            rating={2} />

        </div>


        <div className="home__row">
        <Product title='The lean startup' price={20.99} image={book}
            rating={0} />

        </div>
     </div>
    </div>
  )
}

export default Home
