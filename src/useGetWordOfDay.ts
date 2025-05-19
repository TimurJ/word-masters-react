import { useEffect, useState } from 'react'
import { WORD_OF_DAY_URL } from './constants'

export const useGetWordOfDay = () => {
  const [wordOfDay, setWordOfDay] = useState('')

  useEffect(() => {
    async function fetchWordOfDay() {
      const response = await fetch(WORD_OF_DAY_URL)
      const data = await response.json()

      setWordOfDay(data.word as string)
    }

    fetchWordOfDay()
  }, [])

  return wordOfDay
}
