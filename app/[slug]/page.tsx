import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { getArticleData } from '@/lib/articles'

interface ArticleParams {
  params: {
    slug: string
  }
}
export default async function Article({ params }: ArticleParams) {
  const articleData = await getArticleData(params.slug)
  return (
    <section className="mx-auto w-10/12 md:w-1/2 mt-20 flex flex-col gap-5">
      <div className="flex justify-between font-poppins">
        <Link href="/" className="link">
          voltar para home
        </Link>
        <p>{articleData.date.toString()}</p>
      </div>

      <article
        className="article"
        dangerouslySetInnerHTML={{ __html: articleData.contentHtml }}
      />
    </section>
  )
}
