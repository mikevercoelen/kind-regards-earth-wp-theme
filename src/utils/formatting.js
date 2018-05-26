import _ from 'lodash'
import moment from 'moment'

export const postToArticle = (post, categories, media) => {
  if (!post) {
    return null
  }

  let category = _.find(categories, c => {
    return c.id === post.categories[0]
  })

  const mDate = moment(post.date)

  const article = {
    slug: post.slug,
    title: post.title.rendered,
    category,
    date: mDate.format(`do of MMMM 'YY`),
    description: post.excerpt.rendered,
    readingTime: post.acf.readingtime,
    youtubeId: post.acf.youtubeid,
    location: post.acf.location,
    content: post.content.rendered,
    subtitle: post.acf.subtitle
  }

  if (post.featured_media !== 0) {
    const img = _.find(media, m => {
      return m.id === post.featured_media
    })

    const { medium_large: mediumLarge, full } = img.media_details.sizes

    if (mediumLarge && full) {
      article.img = {
        mediumLarge: {
          width: mediumLarge.width,
          height: mediumLarge.height,
          src: mediumLarge.source_url
        },
        full: {
          width: full.width,
          height: full.height,
          src: full.source_url
        }
      }
    }
  }

  return article
}
