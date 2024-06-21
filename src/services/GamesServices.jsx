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