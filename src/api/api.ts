import axios, {Method} from "axios";

const API_VERSION = 1;

type Auth = {
	method: string;
	token: string;
}
type Route = {
	path: string;
	method: Method;
}
export module Routes {
	export const UPGRADE_WEBSOCKET: Route 	= { path: "/upgrade", 		method: "get" };
	export const ONLINE_PLAYERS: Route 		= { path: "/player/online",	method: "get" };
}

declare interface Player {
	name: string;
	uuid: string;
}

export class CloudAPI {

	private readonly host: string;
	private readonly auth: Auth;
	private socket: WebSocket | undefined;

	constructor(host: string, auth: Auth) {
		this.host = host;
		this.auth = auth;
	}

	getAuth(): string {
		return this.auth.method + " " + this.auth.token;
	}

	initSocket(socket: WebSocket) {
		this.socket = socket;

		this.socket.onmessage = (event) => {
			const message = event.data;
			console.log("WebSocket: " + message);
		}
	}

	useUrl(route: Route, queryParams: Record<string, string> = {}, protocol: string = "http"): string {
		let query = "";
		for (const key in queryParams) {
			if (query === "") query = "?";
			else query += "&";
			query += key;
			query += "=";
			query += encodeURIComponent(queryParams[key]);
		}

		return `${protocol}://${this.host}/v${API_VERSION}${route.path}${query}`;
	}

	public async makeRequest(route: Route): Promise<any> {
		const target = this.useUrl(route);

		return axios(target, {
			headers: {
				Authorization: this.getAuth()
			},
			method: route.method
		}).then(value => value.data);
	}

	public async fetchPlayers(): Promise<Array<Player>> {
		return this.makeRequest(Routes.ONLINE_PLAYERS);
	}

}

export function useTitle(label: string) {
	// document.title = "DyCloud" + (label === null || label === "" ? "" : " | " + label);
}
