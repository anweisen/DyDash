import { MdExpandMore } from "react-icons/md";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import "./Login.scss";

type Hooks = Record<string, { value: string | undefined; set: (value: string) => void }>;
type LoginMethod = { name: string; fields: string[] }
const loginMethods: Array<LoginMethod> = [
	{
		name: "Player",
		fields: [
			"Player Name",
			"Access Token"
		]
	},
	{
		name: "Token",
		fields: [
			"Access Token"
		]
	}
]
const addressField = "Cloud Hostaddress";

function MethodFormInputs({ method, hooks }:{ method: LoginMethod; hooks: Hooks }) {
	return (
		<>
			{method.fields.map(field => <FormInput key={field} name={field} hooks={hooks} />)}
		</>
	);
}
function FormInput({ name, hooks }:{ name: string; hooks: Hooks }) {
	const [ value, set ] = useState<string>();
	hooks[name] = { value: value, set: set };
	return <input className={"input"} placeholder={name} onChange={event => set(event.target.value)}/>
}
function LoginSelect({ method, setMethod, hooks }:{ method: LoginMethod | undefined; setMethod: (value: LoginMethod) => void; hooks: Hooks }) {
	const [ collapsed, setCollapsed ] = useState(true);

	return (
		<div className={"LoginSelect"}>

			<div className={"box"} onClick={event => setCollapsed(!collapsed)}>
				<p className={"text"}>{method == null ? "Select Method" : method.name}</p>
				<MdExpandMore className={"icon" + (collapsed ? "" : " rotated")}/>
			</div>
			<div className={"dropdown-container"}>
				<span className={"dropdown" + (collapsed ? "" : " shown")}>
					<div className={"dropdown-selection"}>
						{loginMethods.map(current =>
							<p key={current.name} className={(current === method ? "current" : "")} onClick={event => {
								setMethod(current);
								setCollapsed(true);
							}}>
								{current.name}
							</p>
						)}
					</div>
				</span>
			</div>
			<FormInput name={addressField} hooks={hooks} />
			{method != null ? <MethodFormInputs method={method} hooks={hooks} /> : null}

		</div>
	)
}

export default function Login({ setCookies }:{ setCookies: any }) {
	const [ method, setMethod ] = useState<LoginMethod>();
	const [ redirect, setRedirect ] = useState(false);
	const hooks: Hooks = {};

	function Redirect({ to }: { to: string }) {
		return redirect ? <Navigate to={to} /> : null;
	}

	return (
		<div className={"Login"}>

			<div className={"header"}>
				<img alt={""} src={"logo-sized.png"}/>
				<h1>DyCloud » Dashboard</h1>
			</div>

			<div className={"form-container"}>
				<div className={"form"}>
					<h1>Login</h1>
					{/*<h1>•┃ Login ┃•</h1>*/}
					{/*<h1>•» Login «•</h1>*/}
					<LoginSelect method={method} setMethod={setMethod} hooks={hooks} />
					<div className={"button"} onClick={event => {
						event.preventDefault();

						if (method == null) return;
						const host = hooks[addressField].value;
						const options = { magAge: 7*24*60*60*60 };

						setCookies("method", method, options);
						setCookies("host", host, options);

						let token = "";
						for (const field of method.fields) {
							if (token.length > 0) token += ":";
							token += hooks[field].value;
						}
						setCookies("token", token, options);

						setRedirect(true);
					}}>Login</div>
					<Redirect to={"/"} />
				</div>
			</div>

		</div>
	)
}