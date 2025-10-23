import config from '../blog.config.js'

import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import Pagination from '@/components/Pagination'
import { getAllPosts } from '@/lib/notion'
import { useConfig } from '@/lib/config'

export async function getStaticProps () {
  const posts = await getAllPosts({ includePages: false })
  const postsToShow = posts.slice(0, config.postsPerPage)
  const totalPosts = posts.length
  const showNext = totalPosts > config.postsPerPage
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      showNext
    },
    revalidate: false
  }
}

export default function Blog ({ postsToShow, page, showNext }) {
  const { title, description } = useConfig()

  return (
    <Container title={title} description={description}>
      {postsToShow.map(post => (
        <BlogPost key={post.id} post={post} />
      ))}
      {showNext && <Pagination page={page} showNext={showNext} />}
    </Container>
  )
}
