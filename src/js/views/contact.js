import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

//one of the actions is to delete things, so save it for later

const Contact = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
        <ul className="list-group">
            {store.contacts.map((contact) => {
                return (
                    <li key={contact.id}>
                        <p>{contact.full_name}</p>
                        <p>{contact.address}</p>
                    </li>
                );
            })}
        </ul>
            <h1>Hello, contact.js</h1>
        </>
    );
};

export default Contact;