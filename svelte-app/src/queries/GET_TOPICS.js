import { gql } from '@apollo/client'

export const GET_TOPICS = gql`
query Topics ($id: ID) {
  topics (where: { category: $id }) {
    name
    cover {
      url
    }
    published_at
    category {
      name
      icon_name
      order
    }    
    subcategories {
      name
    }
    platforms {
      name
      classes
    }
    tests {
      content
      rating
      user {
        username
        image_profile {
          url
        }
      }
    }
  }
}
`