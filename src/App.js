import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { useCookies } from "react-cookie";

import "./theme.scss"

import Login from "./components/Login";
import Logout from "./components/Logout";
import Dashboard from "./components/Dashboard";

function App() {
	const [ cookies, setCookies ] = useCookies(["host", "method", "token"]);
	const cookiesSet = cookies.method != null && cookies.host != null && cookies.token != null;

	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path={"logout"} element={<Logout cookies={cookies} setCookies={setCookies} />} />
					<Route path={"login"} element={<Login setCookies={setCookies} />} />
					<Route path={"*"} element={!cookiesSet ? <Navigate to={"/login"} /> : <Dashboard cookies={cookies} />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
