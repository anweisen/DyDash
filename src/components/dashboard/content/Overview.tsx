import React, {useEffect, useState} from "react";
import {IconType} from "react-icons";
import {MdPeopleOutline, MdTimeline} from "react-icons/all";

import Loader from "../../Loader";
import {CloudAPI, Status} from "../../../api/api";

function Card({ name, value, icon }: { name: string; value: any; icon: IconType }) {
	return (
		<div className={"Card"}>
			{React.createElement(icon, { className: "icon" })}
			<p className={"name"}>{name}</p>
			<p className={"value"}>{value}</p>
		</div>
	);
}

export default function Overview({ api }: { api: CloudAPI; }) {
	const [ requested, setRequested ] = useState(false);
	const [ playerCount, setPlayerCount ] = useState<number>();
	const [ status, setStatus ] = useState<Status>();
	const [ uptime, setUpTime ] = useState<number>();

	useEffect(() => {
		if (requested) return;
		setRequested(true);

		api.fetchPlayerCount().then(count => setPlayerCount(count));
		api.fetchStatus().then(status => {
			setStatus(status)
			updateUpTime();
		});
	}, [ requested, api, updateUpTime ]);
	useEffect(() => {
		if (status == null) return;
		const interval = setInterval(updateUpTime, 1000);
		return () => {
			clearInterval(interval);
		}
	});
	function updateUpTime() {
		if (status == null) return;
		setUpTime(Date.now() - status.startup_time);
	}
	function formatTime(millis: number | undefined): string {
		if (millis === undefined) return "/";
		let seconds = Math.trunc(millis / 1000);
		let minutes = Math.trunc(seconds / 60);
		let hours = Math.trunc(minutes / 60);
		let days = Math.trunc(hours / 24);
		// millis %= 1000;
		seconds %= 60;
		minutes %= 60;
		hours %= 24;

		return `${num2(days)}:${num2(hours)}:${num2(minutes)}:${num2(seconds)}`;
	}
	function num2(num: number): string {
		return num > 9 ? "" + num : "0" + num;
	}

	return (
		<div className={"Overview Dashboard-Component"}>
			{ playerCount == null || status == null
				? <Loader/>
				: <>
					<Card name={"Uptime"} value={formatTime(uptime)} icon={MdTimeline} />
					<Card name={"Online Player"} value={playerCount} icon={MdPeopleOutline} />
				</>
			}
		</div>
	);
}