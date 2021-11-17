import { Navigate, Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react";

import API from "../api/api";

import Nav from "./Nav";
import Overview from "./Overview";
import Loader from "./Loader";

import "./Dashboard.scss";

export default function Dashboard({ cookies }) {
	const [ connection, setConnection ] = useState(null);

	useEffect(() => {
		if (connection != null) return;
		const socket = new WebSocket(`ws://${cookies.host}/v1/upgrade?auth=${encodeURIComponent(cookies.method + " " + cookies.token)}`);

		socket.onerror = () => {
			setConnection(false);
		}
		socket.onopen = () => {
			setTimeout(() => setConnection(new API(socket.prototype)), 3000);
		}
	});

	return (
		<>
			{ connection == null
				? <Loader />
				: !connection ? <Navigate to={"login"} />
				: <>
					<Nav/>

					<div className={"content"}>
						<Routes>
							<Route path={"/"} element={<Overview/>} />
							<Route path={"player"} />
						</Routes>
					</div>
				</>
			}

		</>
	);
}