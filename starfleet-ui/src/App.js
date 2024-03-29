import React, { useReducer } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import SearchResult from './components/ResultPage/SearchResult';
import Search from './components/SearchPage/Search';
import { SearchContext } from './context';
import reducer from './reducer';

function App() {
    const [state, dispatch] = useReducer(reducer, {});

    return (
        <div className="App">
            <SearchContext.Provider value={{ state, dispatch }}>
                <BrowserRouter>
                    <Route
                        path="/"
                        exact
                        render={() => {
                            return <Search></Search>;
                        }}
                    ></Route>
                    <Route
                        path="/result"
                        exact
                        render={() => <SearchResult></SearchResult>}
                    ></Route>
                </BrowserRouter>
            </SearchContext.Provider>
        </div>
    );
}

export default App;
