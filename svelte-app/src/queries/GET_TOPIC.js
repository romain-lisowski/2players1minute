import { gql } from '@apollo/client'

export const GET_TOPIC = gql`
query Topic($id: ID!) {
  topic(id: $id) {
    name
    cover {
      url
    }
    published_at
    category {
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
      rating
      title
      content
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