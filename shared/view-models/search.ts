export type SearchResultType = 'league' | 'team' | 'athlete' | 'game' | 'tournament'

export interface SearchResultViewModel {
    id: string
    type: SearchResultType
    title: string
    subtitle: string
    description?: string
    date?: string
    route: string
    imageText: string
    keywords: string[]
}