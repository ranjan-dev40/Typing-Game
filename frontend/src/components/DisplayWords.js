import React from 'react'

const typedCorrectlyStyle = {
    "backgroundColor" : "#34eb77"
}

const currentStyle = {
    "textDecoration" : "underline"
}

const DisplayWords = (props) => {
    const {wordArray, player} = props

    const getTypedWords = (wordArray, player) => {
        let typedWords = wordArray.slice(0, player.currWordInd)
        typedWords = typedWords.join(" ")

        return <span style={typedCorrectlyStyle}>{typedWords+" "}</span>
    }

    const getCurrentWord = (wordArray, player) => {
        if (player.currWordInd < wordArray.length) {
            return <span style={currentStyle}>{wordArray[player.currWordInd]+" "}</span>
        }

        return null
    }

    const getWordsToBeTyped = (wordArray, player) => {
        let wordsToBeTyped = wordArray.slice(player.currWordInd + 1, wordArray.length)
        wordsToBeTyped = wordsToBeTyped.join(" ")
        return <span>{wordsToBeTyped}</span>
    }

    return (
    <>
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{display: "flex", fontSize: "1.5rem", flexDirection: "row", justifyContent: "center", border: "2px solid black", borderRadius: "1rem", padding: "1rem", margin: "1rem"}}>
                <p>
                {getTypedWords(wordArray, player)}{getCurrentWord(wordArray, player)}{getWordsToBeTyped(wordArray, player)}
                </p>
            </div>
        </div>
    </>
  )
}

export default DisplayWords