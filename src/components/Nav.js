import NavEntry from "./NavEntry";

import "./Nav.scss";

import { ReactComponent as people } from '../icons/people.svg'
import { ReactComponent as home } from '../icons/home.svg'

const links = [
	{
		name: "Overview",
		path: "/",
		icon: home,
	},
	{
		name: "Players",
		path: "player",
		icon: people
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
				{links.map(link => <NavEntry key={links.path} name={link.name} icon={link.icon} path={link.path} />)}
			</div>
		</div>
	);
};