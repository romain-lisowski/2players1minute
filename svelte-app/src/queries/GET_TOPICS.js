import { gql } from '@apollo/client'

export const GET_TOPICS = gql`
query Topics ($id: ID) {
  topics (where: { category: $id }) {
    id
    name
    cover {
      url
    }
    published_at
    category {
      id
      name
      icon_name
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