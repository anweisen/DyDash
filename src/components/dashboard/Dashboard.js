import { Navigate, Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react";

import { CloudAPI, Routes as ApiRoutes } from "../../api/api";

import Nav from "../Nav";
import Overview from "./content/Overview";
import Loader from "../Loader";

import "./Dashboard.scss";

export default function Dashboard({ cookies }) {
	const [ connection, setConnection ] = useState(null);

	useEffect(() => {
		if (connection != null) return;
		const api = new CloudAPI(cookies.host, { method: cookies.method, token: cookies.token });
		const socket = new WebSocket(api.useUrl(ApiRoutes.UPGRADE_WEBSOCKET, { auth: cookies.method + " " + cookies.token}, "ws"));

		socket.onerror = () => {
			setConnection(false);
		}
		socket.onopen = () => {
			api.initSocket(socket);
			setConnection(api);
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
							<Route path={"/"} element={<Overview api={connection} />} />
							<Route path={"player"} />
						</Routes>
					</div>
				</>
			}

		</>
	);
}