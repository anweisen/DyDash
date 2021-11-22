import axios from "axios";

const API_VERSION = 1;

type Auth = {
	method: string;
	token: string;
}
type HttpMethod =
	| "get"
	| "delete"
	| "head"
	| "options"
	| "post"
	| "put"
	| "patch"
	| "purge"
	| "link"
	| "unlink";

type Route = {
	path: string;
	method: HttpMethod;
}
export module Routes {
	export const UPGRADE_WEBSOCKET: Route 	= { path: "/upgrade", 		method: "get" };
	export const ONLINE_PLAYERS: Route 		= { path: "/player/online",	method: "get" };
}

export interface Player {
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

	initSocket(socket: WebSocket): void {
		this.socket = socket;

		this.socket.onmessage = (event) => {
			const message = event.data;
			console.log("WebSocket: " + message);
		}
	}

	useUrl(route: Route, queryParams: Record<string, string> = {}, protocol: string = "http"): string {
		console.log(queryParams)
		let query = "";
		for (const key in queryParams) {
			if (query === "") query = "?";
			else query += "&";
			query += key;
			query += "=";
			query += encodeURIComponent(queryParams[key]);
			console.log(key)
			console.log(queryParams[key])
		}

		return `${protocol}://${this.host}/v${API_VERSION}${route.path}${query}`;
	}

	public upgradeWebSocket(): WebSocket {
		return new WebSocket(this.useUrl(Routes.UPGRADE_WEBSOCKET, { auth: this.auth.method + " " + this.auth.token }, "wss"));
	}

	public async makeRequest(route: Route): Promise<any> {
		const endpoint = this.useUrl(route);

		return axios(endpoint, {
			headers: {
				Authorization: this.getAuth()
			},
			timeout: 3500,
			method: route.method
		}).then(value => value.data);
	}

	public async fetchPlayers(): Promise<Player[]> {
		return this.makeRequest(Routes.ONLINE_PLAYERS);
	}

}

export function useTitle(label: string) {
	// document.title = "DyCloud" + (label === null || label === "" ? "" : " | " + label);
}