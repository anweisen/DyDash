import "./Login.scss";
import "./forms/Forms.scss";

export default function Login({ setCookies }) {
	return (
		<div className={"Login"}>

			<div className={"header"}>
				<img alt={""} src={"logo.png"}/>
				<h1>DyCloud</h1>
			</div>

			<div className={"form-container"}>
				<div className={"form"}>
					<h1>Login</h1>

					<div>

					</div>

					<a className={"button"} href={""} onClick={event => event.preventDefault()}>Login</a>
				</div>
			</div>

		</div>
	)
}