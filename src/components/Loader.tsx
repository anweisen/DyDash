import "./Loader.scss";

export default function Loader() {
	return (
		<div className={"Loader"}>
			{/*<div className="lds-ripple">*/}
			{/*	<div/><div/>*/}
			{/*</div>*/}
			<div className="lds-ellipsis">
				<div/><div/><div/><div/>
			</div>
		</div>
	);
}