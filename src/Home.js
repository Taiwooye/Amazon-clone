import React from "react";
import amazonBg from "./images/Prime.jpg";
import "./Home.css";
import Product from "./Product";
import { useState, useEffect } from "react";

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        return response.json();
      })
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  return (
    <div className="home">
      <div className="home__container">
        <img className="home__image" src={amazonBg} alt="" />

        {
          <div className="home__row">
            {items.map((item) => {
              
              return (
                <Product key={item.id} title={item.title.slice(0, 25) + "..."}
                 image={item.image}
                 price={item.price}
                 rating={item.rating }
                 >
                  {item.title}
                 {item.image}
                 {item.price}
                 {item.rating}

                </Product>
              );
            })}
          </div>
        }
        
      </div>
    </div>
  );
}

export default Home;
