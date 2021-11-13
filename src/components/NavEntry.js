import React from "react";
import { NavLink } from "react-router-dom";

export default function NavEntry({ name, icon, path }) {
	return (
		<div>
			<NavLink to={path} className={"NavEntry"}>
				{React.createElement(icon, { className: "icon" })}
				<p className={"name"}>{name}</p>
			</NavLink >
		</div>
	);
}