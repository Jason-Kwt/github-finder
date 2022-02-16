import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";
const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN


export const GithubProvider = ({children}) => {

    const initialState = {
        users: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState)
    /* const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true) */

    const setLoading = () => {
        dispatch({
            type: 'SET_LOADING',
        })
    }

    // Get search result
    const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams({
            q: text,
        })

        const response = await fetch (`${GITHUB_URL}/search/users?${params}`,
        {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            },
        })
        const {items} = await response.json()
        /* setUsers(data)
        setLoading(false) */
        dispatch({
            type: 'GET_USERS',
            payload: items,
        })
    }

    // Clear searcg result
    const clearSearchUsers = () => {
        dispatch({
            type: 'CLEAR_USERS',
        })
    }

    return (
        <GithubContext.Provider value={{
            users: state.users,
            loading: state.loading,
            searchUsers,
            clearSearchUsers,
        }}>
            {children}
        </GithubContext.Provider> 
    )
}

export default GithubContext