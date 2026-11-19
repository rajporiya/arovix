export interface ContentItem {
  _id?: string
  title?: string
  slug?: string
  summary?: string
  description?: string
  category?: string
  location?: string
  skills?: string[]
  imageUrl?: string
}

export interface ApiList<T> {
  data?: T[]
}
