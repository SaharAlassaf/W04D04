import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Card from "../Card";

function Cards() {
  const [search, setSearch] = useState("");

  const [pokemon, setPokemon] = useState([]);
  const history = useHistory()


  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(
      "https://api.pokemontcg.io/v2/cards?pageSize=10"
    );
    setPokemon(response.data.data);
  };

  const handleClick = (id) => {
    history.push(`/card/${id}`);
  };

  return (
    <div className="cards">
      {pokemon.length ? (
        <ul>
          <div>
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {pokemon
            // eslint-disable-next-line
            .filter((item) => {
              if (search === "") {
                return item;
              } else if (item.name.includes(search)) {
                return item;
              }
            })
            .map((item, i) => {
              // let url = `/card/${item.id}`;
              return (
                <div onClick={() => handleClick(item.id)} key={i}> 
                  <Card item={item}  />
                </div>
              );
            })}
        </ul>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default Cards;
