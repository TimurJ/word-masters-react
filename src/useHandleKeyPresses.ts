import { useEffect, useState } from 'react'
import { VALIDATE_WORD_URL, NUMBER_OF_LETTERS, NUMBER_OF_TRIES } from './constants'
import { isLetter, getLetterColours } from './helpers'

export interface PreviousWordsObject {
  word: string[]
  letterColours: string[]
}

export const useHandleKeyPresses = (wordOfDay: string) => {
  const [previousWords, setPreviousWords] = useState<PreviousWordsObject[]>([])
  const [guessWord, setGuessWord] = useState<string[]>([])
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [currentRowIndex, setCurrentRowIndex] = useState<number>(0)

  useEffect(() => {
    async function checkValidWord(word: string) {
      const response = await fetch(VALIDATE_WORD_URL, {
        method: 'POST',
        body: JSON.stringify({ word }),
      })
      const json = await response.json()

      return json.validWord
    }
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (gameOver) {
        return
      }

      if (isLetter(event.key) && guessWord.length < NUMBER_OF_LETTERS) {
        setGuessWord((previousLetters) => [...previousLetters, event.key.toUpperCase()])
      } else if (event.key === 'Backspace' && guessWord.length > 0) {
        setGuessWord((previousLetters) => [...previousLetters.slice(0, previousLetters.length - 1)])
      } else if (event.key === 'Enter' && guessWord.length === NUMBER_OF_LETTERS) {
        const isValidWord = await checkValidWord(guessWord.join(''))

        if (!isValidWord) {
          alert('Invalid Word!')
          return
        }

        setCurrentRowIndex((previousIndex) => ++previousIndex)
        setPreviousWords((previousWords) => {
          return [
            ...previousWords,
            { word: guessWord, letterColours: getLetterColours(guessWord, wordOfDay) },
          ]
        })
        setGuessWord([])

        if (guessWord.join('').toLocaleLowerCase() === wordOfDay.toLocaleLowerCase()) {
          alert('You Won!')
          setGameOver(true)
          return
        }

        if (previousWords.length === NUMBER_OF_TRIES - 1) {
          alert('You Lost!')
          setGameOver(true)
          return
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [gameOver, guessWord, previousWords, wordOfDay, currentRowIndex])

  return { previousWords, guessWord, currentRowIndex }
}
