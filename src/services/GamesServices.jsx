export const getAllGames = () => {
    return fetch(`http://localhost:8088/games?_expand=user`).then((res) => res.json())
}

export const getAllBridgeGames = () => {
  return fetch(`http://localhost:8088/gamebridge?_expand=user`).then((res) => res.json())
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

  export const getGameBridgeById = (Id) => {
    return fetch(`http://localhost:8088/gameBridge?gameId=${Id}&_expand=user`).then((res) =>
       res.json())
  
  };
  
  export const handleAcceptGame = (myGame) => {
    return fetch(`http://localhost:8088/gameBridge/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myGame)
    })
  }
