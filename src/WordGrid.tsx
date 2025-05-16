import { NUMBER_OF_TRIES } from './constants'
import WordRow from './WordRow'

const WordGrid = () => {
  const rows = []
  for (let i = 0; i < NUMBER_OF_TRIES; i++) {
    rows.push(<WordRow rowNum={i} />)
  }

  return <div className="words-grid">{rows}</div>
}

export default WordGrid
