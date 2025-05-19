import { NUMBER_OF_LETTERS } from './constants'
import type { PreviousWordsObject } from './useHandleKeyPresses'

interface WordRowProps {
  guessWord: string[]
  wordOfDay: string
  previousWords: PreviousWordsObject[]
  rowIndex: number
  currentRowIndex: number
}

const WordRow = ({ guessWord, previousWords, rowIndex, currentRowIndex }: WordRowProps) => {
  return (
    <div className="words-row">
      {Array.from({ length: NUMBER_OF_LETTERS }).map((_, index) => {
        if (rowIndex < currentRowIndex) {
          return (
            <div
              className={`letter-container ${previousWords[rowIndex].letterColours[index]}`}
              key={index}
            >
              {previousWords[rowIndex].word[index]}
            </div>
          )
        } else if (rowIndex === currentRowIndex) {
          return (
            <div className="letter-container" key={index}>
              {guessWord[index]}
            </div>
          )
        } else {
          return <div className="letter-container" key={index}></div>
        }
      })}
    </div>
  )
}

export default WordRow
