import { ImHammer2 } from "react-icons/all";
import { useEffect, useState } from "react";

import Loader from "../../Loader";

export default function Players({ api }) {
	const [ players, setPlayers ] = useState();

	useEffect(() => {
		if (players != null) return;
		api.fetchPlayers().then(players => setPlayers(players));
	});

	return (
		<div className={"Players Dashboard-Component"}>
			{ players == null
				? <Loader/>
				: <>
				</>
			}
		</div>
	);
}