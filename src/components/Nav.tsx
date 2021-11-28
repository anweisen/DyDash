import {MdHome, MdOutlineLogout, MdPeople, MdStorage} from "react-icons/all";
import {IconType} from "react-icons";

import NavEntry from "./dashboard/NavEntry";

import "./dashboard/Nav.scss";

const links: { name: string; path: string; icon: IconType }[] = [
	{
		name: "Overview",
		path: "/",
		icon: MdHome
	},
	{
		name: "Players",
		path: "player",
		icon: MdPeople
	},
	{
		name: "Services",
		path: "service",
		icon: MdStorage
	},
	{
		name: "Logout",
		path: "logout",
		icon: MdOutlineLogout
	}
];

export default function Nav() {
	return (
		<div className={"Nav"}>
			<div className={"header"}>
				<img alt={""} src={"logo-sized.png"} />
				<h1>DyCloud</h1>
			</div>
			<div className={"links"}>
				{links.map(link => <NavEntry key={link.path} name={link.name} icon={link.icon} path={link.path} />)}
			</div>
		</div>
	);
};