import {useEffect, useState} from "react";
import {MdPeopleOutline} from "react-icons/all";

import Loader from "../../Loader";
import {CloudAPI, Player} from "../../../api/api";

function Card({ name, value }: { name: string; value: any; }) {
	return (
		<div className={"Card"}>
			<MdPeopleOutline className={"icon"}/>
			<p className={"name"}>{name}</p>
			<p className={"value"}>{value}</p>
		</div>
	);
}

export default function Overview({ api }: { api: CloudAPI; }) {
	const [ players, setPlayers ] = useState<Player[]>();

	useEffect(() => {
		if (players != null) return;
		api.fetchPlayers().then(players => setPlayers(players));
	});

	return (
		<div className={"Overview Dashboard-Component"}>
			{ players == null
				? <Loader/>
				: <>
					<Card name={"Online Player"} value={players.length} />
				</>
			}
		</div>
	);
}