export const getAllGames = () => {
    return fetch(`http://localhost:8088/games`).then((res) => res.json())
}

export const createNewGame = (newGame) => {
    return fetch(`http://localhost:8088/games`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newGame),
    });
}

export const deleteGame = (gameId) => {
    return fetch(`http://localhost:8088/games/${gameId}`, {
      method: "DELETE"
    });
  };

  export const getGameById = (gameId) => {
    return fetch(`http://localhost:8088/games/${gameId}`).then((res) =>
       res.json())
  
  };

  export const updateGame = (myGame) => {
    return fetch(`http://localhost:8088/games/${myGame.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myGame)
    })
  }
