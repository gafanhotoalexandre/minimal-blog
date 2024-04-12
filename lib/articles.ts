import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import moment from 'moment'
import { remark } from 'remark'
import html from 'remark-html'

const articlesDirectory = path.join(process.cwd(), 'articles')

function getSortedArticles(): ArticleItem[] {
  const fileNames = fs.readdirSync(articlesDirectory)

  const allArticlesData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')

    const fullPath = path.join(articlesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')

    const matterResult = matter(fileContents)

    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      category: matterResult.data.category,
    }
  })

  return allArticlesData.sort((a, b) => {
    const format = 'DD-MM-YYYY'
    const dateOne = moment(a.date, format)
    const dateTwo = moment(b.date, format)

    if (dateOne.isBefore(dateTwo)) {
      return -1
    } else if (dateTwo.isAfter(dateOne)) {
      return 1
    } else {
      return 0
    }
  })
}

export function getCategorisedArticles(): Record<string, ArticleItem[]> {
  const sortedArticles = getSortedArticles()
  const categorisedArticles: Record<string, ArticleItem[]> = {}

  sortedArticles.forEach((article) => {
    if (!categorisedArticles[article.category]) {
      categorisedArticles[article.category] = []
    }
    categorisedArticles[article.category].push(article)
  })

  return categorisedArticles
}
