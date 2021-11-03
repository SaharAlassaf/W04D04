import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Card({ item }) {
  let { id } = useParams();

  const [card, setCard] = useState(null);

  const getData = async () => {
    const response = await axios.get(
      "https://api.pokemontcg.io/v2/cards?pageSize=10"
    );

    setCard(
      response.data.data.find((ele) => {
        return ele.id === id;
      })
    );
  };

  useEffect(() => {
    getData();
  }, []);
  

  return (
    <div className="card" >
      {card ? <h3> {card?.name}</h3> : <h3> {item?.name}</h3>}
      <img src={card ? card?.images.small : item?.images.small} alt="img" />
    </div>
  );
}

export default Card;
