import { gql } from '@apollo/client';

export const GET_POPULAR_REPOSITORIES = gql`
  
query TrendingRepoQuery($query: String!) {
    search(query: $query , type: REPOSITORY, first: 10) {
        edges {
            node {
                ... on Repository {
                    name
                    owner {
                        login
                    }
                    licenseInfo {
                        name
                    }

                    stargazerCount
                    description
                    createdAt
                    languages(first: 8) {
                        edges {
                            node {
                                name
                                color
                            }
                        }
                        totalCount
                    }
                    url
                    forkCount
                }
            }
        }
    }
}

`;
