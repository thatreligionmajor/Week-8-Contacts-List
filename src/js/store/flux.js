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
			fetchCreateOneContact: newContact => {
				//create the same way we did the delete function with a options separate
				//method: "PUT",
				//json.stringify newcontact
			},
			deleteContact: (id) => {
				//get the store
				const store = getStore();
				let revisedContactList = store.contacts.filter(contact => contact.id !== id);
				getActions().fetchDeleteOneContact(id);

				setStore({ contacts: revisedContactList });
			},
			saveContact: (fullName, address, email, phone) => {
				let newContact = {
					full_name: "Jane Doe",
					address: "12345 A Street, City, State Zip",
					email: "jdoe@email.com",
					phone: "(123) 413-4412",
					agenda_slug: "theresearch"
				}
				getActions().addContact(newContact);
			},
				addContact: (aNewContact) => {
					const store = getStore();
					let revisedStore = [...store.contacts, aNewContact];
					getActions().fetchCreateOneContact(aNewContact);
					setStore({contacts: revisedStore})
				}
			}
		}
	};

export default getState;
