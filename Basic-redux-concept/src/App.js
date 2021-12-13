import React from "react";
// import { store } from "../src/store";
import Routes from "./Routes";
import { Provider } from 'react-redux';
import { createStore } from "redux";
import allReducers from './reducers'



const store = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


class App extends React.Component {

    render() {
        return (
            <>
                <Provider store={store}>
                    <Routes />
                </Provider>
            </>
        )
    }
}

export default App;
