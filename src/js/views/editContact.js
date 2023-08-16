import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const EditContact = () => {
    const{store, actions} = useContext(Context);
    const [fullName, setFullName] = useState("");
    const[email, setEmail] = useState("");
    const[phone, setPhone] = useState("");
    const[address, setAddress] = useState("");

    let navigate = useNavigate();
	let params = useParams(); //parameters in the URL

	const loadContact = () => {
		fetch("https://playground.4geeks.com/apis/fake/contact/" + params.id)
		.then(response => response.json())
		.then(data => {
			console.log(data)
			setFullName(data[0].full_name)
			setAddress(data[0].address)
			setEmail(data[0].email)
			setPhone(data[0].phone)
		})
	}

    const editingContact = (e) => {
        e.preventDefault() //prevents from refreshing
        console.log(fullName, email, phone, address)
        actions.updateContact(fullName, address, email, phone) //TO DO: replace save contact with a put
        setFullName("")
        setAddress("")
        setEmail("")
        setPhone("")
        navigate("/")
    }

	useEffect(() => {
		loadContact()
	}, [])

    return (
        <>
            <h1>Edit a Contact</h1>
            <div className="form-group">
                <label for="addFullName">Full Name</label>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="full name" className="form-control" id="addFullName" placeholder="Full Name" />
            </div>
            <div className="form-group">
                <label for="addEmail">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="addEmail" placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label for="addPhone">Phone</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="phone number" className="form-control" id="addPhone" placeholder="Enter phone" />
            </div>
            <div className="form-group">
                <label for="addAddress">Address</label>
                <input value={address} onChange={(e) => setAddress(e.target.value)} type="address" className="form-control" id="addAddress" placeholder="Enter address" />
            </div>
            <button onClick={(e) => editingContact(e)} class="btn btn-primary">Submit</button>
            <Link to={"/"}>or get back to contacts</Link> 
        </>
    );
};

export default EditContact;