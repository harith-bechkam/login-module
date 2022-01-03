import React from "react";
import store from "./store/store";
import Routes from "./Routes";
import { Provider } from 'react-redux';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// const theme = createTheme();

class App extends React.Component {

    render() {
        return (
            <>
                <Provider store={store}>
                    {/* <ThemeProvider theme={theme}> */}
                        <Routes />
                    {/* </ThemeProvider> */}
                </Provider>
            </>
        )
    }
}

export default App;
