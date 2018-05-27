import WPAPI from 'wpapi'
import { base } from 'utils/template'

const wp = new WPAPI({
  endpoint: `${base}wp-json`
})

const getPosts = (perPage, page) => wp
  .posts()
  .perPage(perPage)
  .page(page)
  .order('asc')
  .orderby('date')
  .embed()

const getPostBySlug = slug => wp
  .posts()
  .slug(slug)
  .embed()

const getPostById = id => wp
  .posts()
  .id(id)
  .embed()

const getPageBySlug = slug => wp
  .pages()
  .slug(slug)
  .embed()

export default {
  getPosts,
  getPostBySlug,
  getPostById,
  getPageBySlug
}
