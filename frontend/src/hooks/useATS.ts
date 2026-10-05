import { useState } from 'react'
import { atsApi } from '@/services/ats.api'
import type { Resume, ATSAnalysis } from '@/types/resume'

export function useATS() {
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function analyze(resume: Resume, jobDescription: string) {
    setAnalyzing(true)
    setError(null)

    try {
      const result = await atsApi.analyze(resume, jobDescription)
      setAnalysis(result)
      return result
    } catch (e) {
      setError((e as Error).message)
      throw e
    } finally {
      setAnalyzing(false)
    }
  }

  return { analysis, analyzing, error, analyze }
}
