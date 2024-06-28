// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import PropTypes from 'prop-types';
import { useMemo, useEffect, useReducer, useContext, useCallback, createContext } from 'react';

const AuthContext = createContext({});

const initialState = {
  user: null,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      ...state,
      user: action.payload,
    };
  }
  return state;
};


export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    const url = "https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc";
    const response = await axios.get(url);
    console.log(response.data);
    dispatch({
      type: 'INITIAL',
      payload: response.data,
    });
  }, []);
  
  useEffect(() => {
    initialize();
  }, [initialize]);










  
  // --------------------------------dependency authprovider--------------------------
  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      dispatch,
    }),
    [
      state.user,
      dispatch
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}


const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


AuthProvider.propTypes = {
  children: PropTypes.node,
};
export { useAuth };
