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
		if (connection != null) return; // only try to connect the first time
		const api = new CloudAPI(cookies.encryption, cookies.host, { method: cookies.method, token: cookies.token });
		const socket = api.upgradeWebSocket();

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
							<Route path={"/"}       element={<Overview api={connection} />} />
							<Route path={"player"}  element={<Players api={connection} />} />
						</Routes>
					</div>
				</>
			}

		</>
	);
}