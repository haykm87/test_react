import React from "react";
import {
    ApolloClient,
    createHttpLink,
    gql,
    InMemoryCache,
} from "@apollo/client";


const link = createHttpLink({
    uri: "http://152.228.215.94:83/api"
});

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
}


const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
})

export default class API {


    async getList  () {
        try {
            let counts = client.query({
                query: gql`
                        query getList {
                            applicantIndividualCompanyRelations (where: {}) {
                                 id
                                 name
                            }
                        }`,
            })
                .then(result => {
                    return result;
                })
                .catch(error => {
                    return error;
                });
            return counts;
        } catch (err) {
            return err;
        }
    }
}
