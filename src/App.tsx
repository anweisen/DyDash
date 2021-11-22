import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { useCookies } from "react-cookie";

import Login from "./components/Login";
import Logout from "./components/Logout";
import Dashboard from "./components/dashboard/Dashboard";

import "./theme.scss";

export default function App() {
	const [ cookies, setCookies ] = useCookies(["encryption", "host", "method", "token"]);
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
