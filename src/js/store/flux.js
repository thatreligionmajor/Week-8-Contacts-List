const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [ //to mess with styling, when done st to empty array
				{
					"address": "wouldn't you like to know",
					"agenda_slug": "theresearch",
					"email": "theresabarkasy@email.com",
					"full_name": "Theresa Barkasy",
					"id": 23312579385,
					"phone": "these are certainly all numbers"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			// To call a function within a function you have to start it with getActions() syntax
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			fetchAllContacts: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
				fetch("https://playground.4geeks.com/apis/fake/contact/agenda/theresearch")
				.then(response => response.json())
				.then(data => 
					setStore({contacts:data})
				)
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire contacts array to look for the respective index
				//and change its color
				const contacts = store.contacts.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ contacts: contacts });
			}
		}
	};
};

export default getState;
