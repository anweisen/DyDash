import { MdHome, MdPeople, MdOutlineLogout } from "react-icons/md";

import NavEntry from "./NavEntry";

import "./Nav.scss";


const links = [
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
		name: "Logout",
		path: "logout",
		icon: MdOutlineLogout
	}
];

export default function Nav() {
	return (
		<div className={"Nav"}>
			<div className={"header"}>
				<img alt={""} src={"logo.png"} />
				<h1>DyCloud</h1>
			</div>
			<div className={"links"}>
				{links.map(link => <NavEntry key={link.path} name={link.name} icon={link.icon} path={link.path} />)}
			</div>
		</div>
	);
};