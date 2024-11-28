import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()

	const add = async (e) => {
		e.preventDefault()
		let info = {
			email: email,
			password: password
		}
		let resp = await actions.signup(info)
		if (resp) {
			navigate("/login")
		}
	}
	return (
		<div className="container">
			<h1>Sign Up</h1>
			<form>
				<div className="mb-3">
					<label for="exampleInputEmail1" className="form-label">Email address</label>
					<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
				</div>
				<div className="mb-3">
					<label for="exampleInputPassword1" className="form-label">Password</label>
					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
				</div>
				<button type="button" onClick={(e) => add(e)} className="btn btn-primary">Signup</button>
			</form>
		</div>
	);
};
