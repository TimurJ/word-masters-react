interface WordRowProps {
  rowNum: number
}
const WordRow = (props: WordRowProps) => {
  return (
    <div className={`words-row row-${props.rowNum}`}>
      <div className="letter-container"></div>
      <div className="letter-container"></div>
      <div className="letter-container"></div>
      <div className="letter-container"></div>
      <div className="letter-container"></div>
    </div>
  )
}

export default WordRow
