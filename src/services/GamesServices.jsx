export const getAllGames = () => {
    return fetch(`http://localhost:8088/games`).then((res) => res.json())
}

export const createGame = (newGame) => {
    return fetch(`http://localhost:8088/creategame`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newGame),
    });
}