import React from 'react'

const ScoreBoard = ({players}) => {

    const getScoreBoard = () => {
        const scoreBoard = players.filter(player => player.speedWPM !== -1)
        return scoreBoard.sort((a,b) => a.speedWPM > b.speedWPM ? -1 : b.speedWPM > a.speedWPM ? 1 : 0)
    }

    const scoreBoard = getScoreBoard(players)

    if (scoreBoard.length === 0) {
        return null
    }

    return (
        <table className="table table-stripe my-3">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">User</th>
                    <th scope="col">WPM</th>
                </tr>
            </thead>
            <tbody>
                {
                    scoreBoard.map((player, index) => {
                        return <tr key={index+1}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{player.userName}</td>
                                    <td>{player.speedWPM}</td>
                              </tr>
                    })
                }
            </tbody>
        </table>
    )
}

export default ScoreBoard