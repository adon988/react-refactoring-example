import React, { useState, useEffect } from "react";

import Summary from "./Summary";

const Character = (props) => {
  const [loadedCharacter, setLoadedCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Component did update");
    fetchData();
  }, [props.selectedChar]);

  const fetchData = () => {
    console.log(
      "Sending Http request for new character with id " + props.selectedChar
    );
    setIsLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${props.selectedChar}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not fetch person!");
        }
        return response.json();
      })
      .then((charData) => {
        const loadedCharacter = {
          id: props.selectedChar,
          name: charData.name,
          height: charData.height,
          abilities: charData.abilities,
          baseExperience: charData.base_experience,
        };
        setLoadedCharacter(loadedCharacter);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter.id) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        baseExperience={loadedCharacter.baseExperience}
        abilities={loadedCharacter.abilities}
      />
    );
  } else if (!isLoading && !loadedCharacter.id) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
};

export default React.memo(Character);
