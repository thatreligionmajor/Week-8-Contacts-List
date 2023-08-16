import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">Go to Contacts</span>
			</Link>
			<div className="ml-auto">
				<Link to="/addcontact">
					<button className="navbar-button css-button-arrow--green">Add New Contact</button>
				</Link>
			</div>
		</nav>
	);
};
