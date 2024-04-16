import Link from 'next/link'

interface ArticleListItemProps {
  category: string
  articles: ArticleItem[]
}
export function ArticleListItem({ category, articles }: ArticleListItemProps) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-cormorantGaramond text-4xl">{category}</h2>

      <div className="flex flex-col gap-2.5 font-poppins text-lg">
        {articles.map((article, index) => (
          <Link key={index} href={`/${article.id}`} className="link">
            {article.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
