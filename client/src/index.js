import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const theme = createTheme({
	components: {},
	palette: {
		primary: {
			main: "#c51162",
		},
		secondary: {
			main: "#2196f3",
		},
	},
});

ReactDOM.render(
	<BrowserRouter>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</BrowserRouter>,
	document.getElementById("root")
);
