import { ApolloClient, HttpLink, InMemoryCache } from "apollo-client-preset";
import { setContext } from "apollo-link-context";
import { getToken } from "./token";
import { LOCAL_GRAPHQL_URI } from "@env";

const APOLLO_SERVER_URL = LOCAL_GRAPHQL_URI;

const httpLink = new HttpLink({
    uri: APOLLO_SERVER_URL,
});

const authLink = setContext(async (req, { headers }) => {
    const token = await getToken();
    return {
        ...headers,
        headers: {
            authorization: token ? token : "",
        },
    };
});

const link = authLink.concat(httpLink);

export default new ApolloClient({
    link,
    cache: new InMemoryCache(),
});
