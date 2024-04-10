import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<
  FeResponse | ResponseError
  >) {
  const feId = req.query.feId
  console.log(feId)
  try {
    const apiUrl = `https://data.ademe.fr/data-fair/api/v1/datasets/base-carboner/lines?q=${feId}&q_fields=Identifiant_de_l%27%C3%A9l%C3%A9ment
    `
    const response = await fetch(apiUrl)
    const data = await response.json()

    res.status(200).json(data.results[0])
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'An error occurred while fetching data' })
  }
}

type ResponseError = {
  error: string
}
export type FeResponse = {
  "Type_de_l'élément": string
  "Nom_attribut_français": string
  "Statut_de_l'élément": string
  "Qualité_TeR": number
  "Source": string
  "Programme": string
  "Nom_base_français": string
  "Nom_base_anglais": string
  "Code_de_la_catégorie": string
  "Structure": string
  "Date_de_création": string
  "Période_de_validité": string
  "Transparence": number
  "Unité_français": string
  "Url_du_programme": string
  "Localisation_géographique": string
  "Tags_anglais": string
  "_i": number
  "Total_poste_non_décomposé": number
  "Unité_anglais": string
  "Nom_attribut_anglais": string
  "Tags_français": string
  "_rand": number
  "Identifiant_de_l'élément": string
  "Date_de_modification": string
  "Type_Ligne": string
  "_score": number
  "_id": string
}

