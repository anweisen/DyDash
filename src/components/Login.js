import { MdExpandMore } from "react-icons/md";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import "./Login.scss";

const loginMethods = [
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

function MethodFormInputs({ method, hooks }) {
	const methodObject = loginMethods.find(current => current.name === method);
	return methodObject.fields.map(field => <FormInput key={field} name={field} hooks={hooks} />);
}
function FormInput({ name, hooks }) {
	const [ value, set ] = useState();
	hooks[name] = { value: value, set: set };
	return <input className={"input"} placeholder={name} onChange={event => set(event.target.value)}/>
}
function LoginSelect({ method, setMethod, hooks }) {
	const [ collapsed, setCollapsed ] = useState(true);

	return (
		<div className={"LoginSelect"}>

			<div className={"box"} onClick={event => setCollapsed(!collapsed)}>
				<p className={"text"}>{method == null ? "Select Method" : method}</p>
				<MdExpandMore className={"icon" + (collapsed ? "" : " rotated")}/>
			</div>
			<div className={"dropdown-container"}>
				<span className={"dropdown" + (collapsed ? "" : " shown")}>
					<div className={"dropdown-selection"}>
						{loginMethods.map(method =>
							<p key={method.name} onClick={event => {
							setMethod(method.name);
							setCollapsed(true);
							}}>
								{method.name}
							</p>)
						}
					</div>
				</span>
			</div>
			<FormInput name={addressField} hooks={hooks} />
			{method != null ? <MethodFormInputs method={method} hooks={hooks} /> : null}

		</div>
	)
}

export default function Login({ setCookies }) {
	const [ method, setMethod ] = useState();
	const hooks = {};
	const [ redirect, setRedirect ] = useState();

	function Redirect({ to }) {
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

						const methodObject = loginMethods.find(current => current.name === method);
						let token = "";
						for (const field of methodObject.fields) {
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