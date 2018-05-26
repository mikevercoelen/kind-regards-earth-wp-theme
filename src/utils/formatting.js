import moment from 'moment'

export const postToArticle = (post) => {
  if (!post) {
    return null
  }

  const mDate = moment(post.get('date'))

  const author = post.getIn(['_embedded', 'author', 0])
  const categories = post.getIn(['_embedded', 'wp:term', 0])

  const article = {
    author,
    categories,
    slug: post.get('slug'),
    title: post.getIn(['title', 'rendered']),
    date: mDate.format(`do of MMMM 'YY`),
    description: post.getIn(['excerpt', 'rendered']),
    readingTime: post.getIn(['acf', 'readingtime']),
    youtubeId: post.getIn(['acf', 'youtubeid']),
    location: post.getIn(['acf', 'location']),
    content: post.getIn(['content', 'rendered']),
    subtitle: post.getIn(['acf', 'subtitle']),
    img: {}
  }

  const featuredMedia = post.getIn(['_embedded', 'wp:featuredmedia', 0])

  if (featuredMedia) {
    const mediumLarge = featuredMedia.getIn(['media_details', 'sizes', 'medium_large'])
    const full = featuredMedia.getIn(['media_details', 'sizes', 'full'])

    if (mediumLarge) {
      article.img.mediumLarge = {
        width: mediumLarge.get('width'),
        height: mediumLarge.get('height'),
        src: mediumLarge.get('source_url')
      }
    }

    if (full) {
      article.img.full = {
        width: full.get('width'),
        height: full.get('height'),
        src: full.get('source_url')
      }
    }
  }

  return article
}
