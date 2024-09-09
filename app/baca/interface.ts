export interface IArticleCard {
    _id: string
    title: string
    slug: string
    publishedAt: string
    author: {
        name: string,
        imageUrl: string
    }
    category: string
    imagePost: string
    body: string[]
  }