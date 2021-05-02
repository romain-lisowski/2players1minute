import { gql } from '@apollo/client'

export const GET_CATEGORIES = gql`
query Categories {
  categories (sort: "order") {
    id
    name
    icon_name
    order
  }
}
`