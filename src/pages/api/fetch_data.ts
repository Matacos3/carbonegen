import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const apiUrl = `https://data.ademe.fr/data-fair/api/v1/datasets/base-carboner/lines?page=${req.query.position}&size=10`
    const response = await fetch(apiUrl)
    const data = await response.json()

    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'An error occurred while fetching data' })
  }
}