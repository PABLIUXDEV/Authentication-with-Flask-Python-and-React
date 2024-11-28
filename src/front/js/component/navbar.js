import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto d-flex">
					<Link to="/signup">
						<button className="btn btn-primary mx-2">Sign up</button>
					</Link>

					
					{ !store.token ?

					<Link to="/login">
						<button className="btn btn-primary">Log in</button>
					</Link>
					:
		
						<button onClick={() => actions.logout()} className="btn btn-primary">Logout</button>
		

					}
				</div>
			</div>
		</nav>
	);
};
