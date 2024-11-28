import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(
		() => {
			if (store.token && store.token != "" && store.token != undefined) actions.getMessage();
		},

	 [store.token]
	);

	return (
		<div className="text-center mt-5">
			<h1>PabliUX Web Space</h1>
			{ !store.token ?

			<p className="card">
				Regístrate para comenzar
				<Link to="/signup">
				<button className="btn btn-warning">Registrarme</button>
				</Link>
			</p>
			
			:
			
			<p className="card bg-success text-white">
			¡Felicidades, tu usuario está registrado!
			</p>
			
			}

		</div>
	);
};
