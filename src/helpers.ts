export function isLetter(letter: string) {
  return /^[a-zA-Z]$/.test(letter)
}

export const getLetterColours = (guessWord: string[], wordOfDay: string): string[] => {
  const wordOfDayLetters = wordOfDay.toUpperCase().split('')
  const numberOfLetters: { [key: string]: number } = wordOfDayLetters.reduce(
    (accumulator, currentVal) => ({
      ...accumulator,
      [currentVal]: accumulator[currentVal] ? accumulator[currentVal] + 1 : 1,
    }),
    {} as { [key: string]: number }
  )
  const result: string[] = []

  guessWord.forEach((letter, index) => {
    if (letter === wordOfDayLetters[index]) {
      result[index] = 'correct-letter'
      numberOfLetters[letter] = numberOfLetters[letter] - 1
    }
  })

  guessWord.forEach((letter, index) => {
    if (wordOfDayLetters.includes(letter) && numberOfLetters[letter] > 0) {
      result[index] = 'semi-correct-letter'
      numberOfLetters[letter] = numberOfLetters[letter] - 1
    } else if (!result[index]) {
      result[index] = 'incorrect-letter'
    }
  })

  return result
}
