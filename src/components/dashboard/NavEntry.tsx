import React from "react";
import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

export default function NavEntry({ name, icon, path }: { name: string, path: string; icon: IconType }) {
	return (
		<div>
			<NavLink to={path} className={"NavEntry"}>
				{React.createElement(icon, { className: "icon" })}
				<p className={"name"}>{name}</p>
			</NavLink >
		</div>
	);
}