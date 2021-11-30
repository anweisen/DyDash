import {Navigate, Route, Routes} from "react-router-dom"
import {useEffect, useState} from "react";

import {CloudAPI} from "../../api/api";

import Nav from "../Nav";
import Overview from "./content/Overview";
import Players from "./content/Players";
import Loader from "../Loader";

import "./Dashboard.scss";

export default function Dashboard({ cookies }: { cookies: Record<string, any> }) {
	const [ connection, setConnection ] = useState<any>();

	useEffect(() => {
		if (connection != null) return;
		try {
			const api = new CloudAPI(cookies.encryption === "true", cookies.host, { method: cookies.method, token: cookies.token });
			const socket = api.upgradeWebSocket();

			socket.onerror = () => {
				setConnection(false);
			}
			socket.onopen = () => {
				api.initSocket(socket);
				setConnection(api);
			}

		} catch (ex) {
			console.error("Could not establish websocket connection");
			console.error(ex);
			setConnection(false);
		}
	}, [ connection, cookies.encryption, cookies.host, cookies.method, cookies.token ]);

	return (
		<>
			{ connection == null
				? <Loader />
				: !connection ? <Navigate to={"login"} />
				: <>
					<Nav/>
					<div className={"content"}>
						<Routes>
							<Route path={"/"}       element={<Overview api={connection} />} />
							<Route path={"player"}  element={<Players api={connection} />} />
						</Routes>
					</div>
				</>
			}

		</>
	);
}