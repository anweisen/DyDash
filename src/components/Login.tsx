import {MdClose, MdDone, MdExpandMore} from "react-icons/md";
import {IconType} from "react-icons";
import {Navigate} from "react-router-dom";
import React, {useState} from "react";

import "./Login.scss";

type Hooks = Record<string, { value: string | undefined; set: (value: string) => void }>;
type LoginMethod = { name: string; fields: string[] }
const loginMethods: LoginMethod[] = [
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
			"API Token"
		]
	}
]
const addressField = "Cloud Hostaddress";

function getMethodByName(name: string): LoginMethod | undefined {
	for (let method of loginMethods) {
		if (method.name === name)
			return method;
	}
	return undefined;
}
function MethodFormInputs({ method, hooks, cookies }:{ method: LoginMethod; hooks: Hooks; cookies: any }) {
	const split = cookies.token === null || cookies.method !== method.name ? [] : cookies.token.split(":");

	return (
		<>
			{method.fields.map((field, index) => <FormInput key={field} name={field} hooks={hooks} defaultValue={split[index]} />)}
		</>
	);
}
function FormInput({ name, hooks, defaultValue }:{ name: string; hooks: Hooks; defaultValue?: string }) {
	const [ value, set ] = useState<string>();
	hooks[name] = { value: value, set: set };
	return <input className={"input underlined"} defaultValue={defaultValue} placeholder={name} onChange={event => set(event.target.value)}/>
}
function SwappableIcon({ status, setStatus, text, onIcon, offIcon }:{ status: boolean; setStatus: (value: boolean) => void ; text: string; onIcon: IconType; offIcon: IconType; }) {
	const [ rotated, setRotated ] = useState(status);

	return (
		<div className={"box underlined"} onClick={event => {
			setStatus(!status);
			setRotated(false);
			setTimeout(() => {
				setRotated(true);
			}, 1);
		}}>
			<p className={"text"}>{text}</p>
			{status ? React.createElement(onIcon, { className: "icon" + (rotated ? "" : " rotated") }) : React.createElement(offIcon, { className: "icon" + (rotated ? " rotated" : "") }) }
		</div>
	);
}
function LoginSelect({ method, setMethod, encryption, setEncryption, hooks, cookies }:{ method: LoginMethod | undefined; setMethod: (value: LoginMethod) => void; encryption: boolean; setEncryption: (value: boolean) => void; hooks: Hooks; cookies: any }) {
	const [ collapsed, setCollapsed ] = useState(true);

	return (
		<div className={"LoginSelect"}>

			<div className={"box underlined"} onClick={event => setCollapsed(!collapsed)}>
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
			<SwappableIcon status={encryption} setStatus={setEncryption} text={"SSL Encryption"} onIcon={MdDone} offIcon={MdClose} />
			<FormInput name={addressField} hooks={hooks} defaultValue={cookies.host} />
			{method != null ? <MethodFormInputs method={method} hooks={hooks} cookies={cookies} /> : null}

		</div>
	)
}

export default function Login({ cookies, setCookies }:{ cookies: any; setCookies: any }) {
	const [ method, setMethod ] = useState(getMethodByName(cookies.method));
	const [ redirect, setRedirect ] = useState(false);
	const [ encryption, setEncryption ] = useState(cookies.encryption === "true");
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
					<LoginSelect method={method} setMethod={setMethod} encryption={encryption} setEncryption={setEncryption} hooks={hooks} cookies={cookies} />
					<div className={"button"} onClick={event => {
						event.preventDefault();

						if (method == null) return;
						const host = hooks[addressField].value;
						const options = { magAge: 7*24*60*60*60 };

						setCookies("encryption", encryption);
						setCookies("method", method.name, options);
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