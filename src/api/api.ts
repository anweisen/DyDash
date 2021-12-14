import axios from "axios";

const API_VERSION = 1;

type Authentication = {
	method: string;
	token: string;
}
type Route = {
	path: string;
	method: HttpMethod;
}
type HttpMethod =
	| "options"
	| "get"
	| "head"
	| "post"
	| "put"
	| "patch"
	| "delete"
//	| "trace" 		# not supported by axios
//	| "connect"		# not supported by axios
	| "purge"
	| "link"
	| "unlink";
type UniqueId = string;
export module Routes {
	export const UPGRADE_WEBSOCKET: Route 	= { path: "/upgrade", 				method: "get" };
	export const STATUS: Route				= { path: "/status", 				method: "get" };
	export const PING: Route				= { path: "/ping", 					method: "get" };
	export const ONLINE_PLAYERS: Route		= { path: "/player/online",			method: "get" };
	export const ONLINE_PLAYER_COUNT: Route	= { path: "/player/online/count",	method: "get" };
}

export interface Player {
	name: string;
	uuid: UniqueId;
}
export interface Status {
	up_time: number;
	startup_time: number;
}

export class CloudAPI {

	private readonly host: string;
	private readonly auth: Authentication;
	private readonly encryption: boolean;
	private socket: WebSocket | undefined;

	constructor(encryption: boolean, host: string, auth: Authentication) {
		this.encryption = encryption;
		this.host = host;
		this.auth = auth;
	}

	getAuth(): string {
		return `${this.auth.method} ${this.auth.token}`;
	}

	initSocket(socket: WebSocket): void {
		this.socket = socket;

		this.socket.onmessage = (event) => {
			const message = event.data;
			console.log("WebSocket: " + message);
		}
	}

	useUrl(route: Route, queryParams: Record<string, string> = {}, protocol: string = this.encryption ? "https" : "http"): string {
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

	public upgradeWebSocket(): WebSocket {
		return new WebSocket(this.useUrl(Routes.UPGRADE_WEBSOCKET, { auth: this.getAuth() }, this.encryption ? "wss" : "ws"));
	}

	public async makeRequest(route: Route): Promise<any> {
		const endpoint = this.useUrl(route);

		const startTime = Date.now();
		return axios(endpoint, {
			headers: {
				Authorization: this.getAuth()
			},
			timeout: 3500,
			method: route.method
		}).then(value => {
			const date = new Date();
			console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()} Fetched ${route.path} in ${Date.now() - startTime}ms`)
			return value.data;
		});
	}

	public async makePropertyRequest(route: Route, property: string): Promise<any> {
		return this.makeRequest(route).then(value => value[property]);
	}

	public async fetchStatus(): Promise<Status> {
		return this.makeRequest(Routes.STATUS);
	}

	public async fetchPlayers(): Promise<Player[]> {
		return this.makeRequest(Routes.ONLINE_PLAYERS);
	}

	public async fetchPlayerCount(): Promise<number> {
		return this.makePropertyRequest(Routes.ONLINE_PLAYER_COUNT, "count");
	}

}

export function useTitle(label: string) {
	// document.title = "DyCloud" + (label === null || label === "" ? "" : " | " + label);
}
