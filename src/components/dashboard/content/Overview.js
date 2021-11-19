import { useEffect, useState } from "react";
import { MdPeopleOutline } from "react-icons/md";

import Loader from "../../Loader";

function Card({ name, value }) {
	return (
		<div className={"Card"}>
			<MdPeopleOutline className={"icon"}/>
			<p className={"name"}>{name}</p>
			<p className={"value"}>{value}</p>
		</div>
	);
}

export default function Overview({ api }) {
	const [ players, setPlayers ] = useState();

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