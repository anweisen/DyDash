import React from "react";
import { NavLink } from "react-router-dom";

export default function NavEntry({ name, icon, path, key }) {
	return (
		<div key={key}>
			<NavLink to={path} className={"NavEntry"}>
				{React.createElement(icon, { className: "icon" })}
				<p className={"name"}>{name}</p>
			</NavLink >
		</div>
	);
}