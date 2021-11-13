import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useCookies } from "react-cookie";

import "./theme.scss"

import Nav from "./components/Nav";
import Overview from "./components/Overview";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
	const [ cookies, setCookies ] = useCookies(["host", "method", "token"]);

	console.log("hello!")

	return (
		<div className="App">
			<Router>
				{ cookies.method == null || cookies.host == null ? <Login/> : <Dashboard/> }
				{/*<Dashboard></Dashboard>*/}
			</Router>
		</div>
	);
}

export default App;
