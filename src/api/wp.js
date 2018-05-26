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

const getPostBySlug = slug => wp
  .posts()
  .slug(slug)

const getPostById = id => wp
  .posts()
  .id(id)

const getCategories = () => wp.categories()
const getMedia = id => wp.media()

export default {
  getPosts,
  getCategories,
  getMedia,
  getPostBySlug,
  getPostById
}
