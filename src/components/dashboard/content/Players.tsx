import {useEffect, useState} from "react";

import Loader from "../../Loader";
import {CloudAPI, Player} from "../../../api/api";

export default function Players({ api }: { api: CloudAPI }) {
	const [ players, setPlayers ] = useState<Player[]>();

	useEffect(() => {
		if (players != null) return;
		api.fetchPlayers().then(players => setPlayers(players));
	});

	return (
		<div className={"Players Dashboard-Component"}>
			{ players == null
				? <Loader/>
				: null
			}
		</div>
	);
}