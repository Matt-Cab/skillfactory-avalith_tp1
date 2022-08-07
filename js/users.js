const URL_GET_USERS = "https://jsonplaceholder.typicode.com/users";

const fetchUsers = async () => {
    try {
        const response = await fetch(URL_GET_USERS);

        if (response.ok) {
            const users = await response.json();
            return { status: response.status, users };
        }

        return { status: response.status }
    }
    catch (error) {
        return { error };
    }
}

const addUserToTable = (user, table) => {
    const userRow = document.createElement("tr");
    userRow.classList = "table-users--row";

    userRow.innerHTML = `
        <td class="table-users--data">${user.id}</td>
        <td class="table-users--data">${user.name}</td>
        <td class="table-users--data">${user.name}</td>
        <td class="table-users--data">${user.phone}</td>
        <td class="table-users--data">${user.address.city}</td>
        <td class="table-users--data">${user.company.name}</td>
    `;

    table.appendChild(userRow);
}

const renderUsers = async () =>{
    const data = await fetchUsers();

    if (data.error) {
        console.error(data.error);
    }
    else {
        const tableOfUsers = document.querySelector(".table-users--body");

        if (data.status === 200) {
            const listOfUsers = data.users;

            listOfUsers.forEach(user => addUserToTable(user, tableOfUsers));
        }
    }
}

renderUsers();