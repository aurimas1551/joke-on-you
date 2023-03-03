import { useState } from "react";
import { useEffect } from "react";
import './Jokes.css';

function Jokes() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://v2.jokeapi.dev/joke/Programming?amount=10")
      .then((res) => res.json())
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

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>Programmer jokes</h1>
        <p>Tip: Hover over grey areas</p>
        <ul>
          {items.jokes.map((item) => {
            if (item.type === "single") {
              return <li key={item.id}>
                {item.joke}
                </li>;
            } else {
              return (
                <li key={item.id}>
                  <span>{item.setup}</span><br/><span className="delivery">{item.delivery}</span>
                </li>
              );
            }
          })}
        </ul>
      </div>
    );
  }
}

export default Jokes;
