import { Navigate } from "react-router-dom";

export default function Logout({ cookies, setCookies }) {
	for (let key in cookies) {
		if (key === "cookieconsent_status") continue;
		setCookies(key, "", { expires: new Date(0) })
	}

	return <Navigate to={"/login"} />
}