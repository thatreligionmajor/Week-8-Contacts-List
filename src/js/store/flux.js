const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			// To call a function within a function you have to start it with getActions() syntax
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			fetchAllContacts: () => {
				fetch("https://playground.4geeks.com/apis/fake/contact/agenda/theresearch")
				.then(response => response.json())
				.then(data => {
					console.log(data);
					setStore({contacts:data})
				})
			},
			fetchDeleteOneContact: id => {
				let options = {
					method: "DELETE",
					body: JSON.stringify(id),
					headers: {
						"Content-Type": "application/json"
					}
				}
				fetch("https://playground.4geeks.com/apis/fake/contact/" + id, options)
					.then(res => {
					if (!res.ok) throw Error(res.statusText);
						return res;
					})
					.then(res => console.log("Successfully deleted", res))
			},

			deleteContact: (id) => {
				//get the store
				const store = getStore();
				let revisedContactList = store.contacts.filter(contact => contact.id !== id);
				getActions().fetchDeleteOneContact(id);

				setStore({ contacts: revisedContactList }); //assuming the back end works, will reset regardless atm 
			},
			saveContact: (fullName, address, email, phone) => {
				let newContact = {
					full_name: fullName,
					address: address,
					email: email,
					phone: phone,
					agenda_slug: "theresearch"
				}
				getActions().addContact(newContact);
			},
			updateContact: (fullName, address, email, phone) => { //this is new, should pair with the editContact.js
				let updatedContact = {
					full_name: fullName,
					address: address,
					email: email,
					phone: phone,
					agenda_slug: "theresearch"
				}
				getActions().addContact(updatedContact);
			}, //getActions().addContact needs to get edited, I believe

			fetchEditOneContact: updatedContact => { //this is new, should pair with the editContact.js
				let options = {
					method: "PUT",
					body: JSON.stringify(updatedContact),
					headers: {
						"Content-Type": "application/json" //API Keys, etc.
					}
				}
				fetch("https://playground.4geeks.com/apis/fake/contact/", options)
					.then(res => {
						if (!res.ok) throw Error(res.statusText);
							return res;
						})
					.then(res => console.log("Successfully edited", res))
			},

			fetchCreateOneContact: newContact => {
				let options = {
					method: "POST",
					body: JSON.stringify(newContact),
					headers: {
						"Content-Type": "application/json" //API Keys, etc.
					}
				}
				fetch("https://playground.4geeks.com/apis/fake/contact/", options)
					.then(res => {
						if (!res.ok) throw Error(res.statusText);
							return res;
						})
					.then(res => console.log("Successfully created", res))
			},

				addContact: (aNewContact) => {
					const store = getStore();
					let revisedStore = [...store.contacts, aNewContact];
					getActions().fetchCreateOneContact(aNewContact);
					setStore({contacts: revisedStore})
				},
				// editContact: (updatedContact) => {
				// 	const store = getStore();
				// 	let revisedStore = [...store.contacts, updatedContact];
				// 	getActions().fetchEditOneContact(updatedContact);
				// 	setStore({contacts: revisedStore})
				// }
			}
		}
	};

export default getState;
