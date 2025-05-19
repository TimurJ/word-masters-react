import { NUMBER_OF_TRIES } from './constants'
import WordRow from './WordRow'
import { useHandleKeyPresses } from './useHandleKeyPresses'

interface WordGridProps {
  wordOfDay: string
}

const WordGrid = ({ wordOfDay }: WordGridProps) => {
  const { previousWords, guessWord, currentRowIndex } = useHandleKeyPresses(wordOfDay)

  return (
    <div className="words-grid">
      {Array.from({ length: NUMBER_OF_TRIES }).map((_, index) => (
        <WordRow
          guessWord={guessWord}
          wordOfDay={wordOfDay}
          previousWords={previousWords}
          rowIndex={index}
          currentRowIndex={currentRowIndex}
          key={index}
        />
      ))}
    </div>
  )
}

export default WordGrid
