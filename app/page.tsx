import { ArticleListItem } from '@/components/ArticleListItem'
import { getCategorisedArticles } from '@/lib/articles'

export default function Home() {
  const articles = getCategorisedArticles()

  console.log(articles)
  return (
    <section className="mx-auto w-11/12 md:w-1/2 mt-20 flex flex-col gap-16 mb-20">
      <header className="font-cormorantGaramond font-light text-6xl text-neutral-900 text-center">
        <h1>dev memories</h1>
      </header>

      <section className="md:grid md:grid-cols-2 flex flex-col gap-10">
        {articles !== null &&
          Object.keys(articles).map((category) => (
            <ArticleListItem
              key={category}
              category={category}
              articles={articles[category]}
            />
          ))}
      </section>
    </section>
  )
}
