import { Route, Routes } from "react-router-dom"

import Nav from "./Nav";
import Overview from "./Overview";

export default function Dashboard() {
	return (
		<>
			<Nav/>

			<div className={"content"}>
				<Routes>
					<Route path={"/"} element={<Overview/>} />
					<Route path={"player"} />
				</Routes>
			</div>
		</>
	);
}