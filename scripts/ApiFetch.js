    console.log("Estas dentro del API");
    const button = document.getElementById('botonLeer');
    button.addEventListener("click", solicitudFetch);
    let data = document.getElementById("contenido");
    const localStorageTimeLimit_s = 60;

    function solicitudFetch() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));
    data.innerHTML = "";
        console.log(usuarios);
        console.log(typeof usuarios);

    if (usuarios && usuarios.time > Date.now()) {
    fetchData(usuarios.data);
    }
    else {
        data.innerHTML = `
        <tr>
            <td class="col-md-1  text-center">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-dark" role="status">
                    </div>
                </div>
            </td>

            <td class=" col-md-3 text-center">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-dark" role="status">
                    </div>
                </div>
            </td>

            <td class="col-md-3 text-center">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-dark" role="status">
                    </div>
                </div>
            </td>

            <td class="col-md-3 text-center">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-dark" role="status">
                    </div>
                </div>
            </td>

            <td class="col-md-2 text-center">
                <div class="d-flex col-xs-1 justify-content-center">
                    <div class="spinner-border text-dark" role="status">
                    </div>
                </div>
            </td>
        </tr>
    `;

    fetch("https://reqres.in/api/users?delay=3")
        .then ((mensaje) => {
            if (mensaje.status == 200) {
                console.log("Peticion: Realizada");
                return mensaje.json();
            }
        })
        .then((usuarios) => {
            const usuariosData = {
                data: usuarios.data,
                time: Date.now() + 60000,
            };
            data.innerHTML = "";

            localStorage.setItem("usuarios", JSON.stringify(usuariosData));
            fetchData(usuarios.data)

        })
        .catch ( err => {
            console.log("Error en la peticion:", err);
            console.warn("Estado de la peticion:", err.status);
    });

    }
    }


    function fetchData(user) {
    for (let i = 0; i <user.length; i++) {
        data.innerHTML += `
            <tr class="usuarios container-sm text-center" >
                <td id="user-id" class="col-md-1 table-bordered opacity-75 table-hover table-dark "> ${user[i].id}</td>
                <td id="user-avatar" class="col-md-3 table-bordered opacity-60 table-hover table-secondary"><img src="${user[i].avatar}" alt="${user[i].first_name}" class="rounded-circle " style="width: 65px"/></td>
                <td id="user-name" class="col-md-3 table-secondary"> ${user[i].first_name}</td>
                <td id="user-lastname" class="col-md-3 table-secondary"> ${user[i].last_name}</td>
                <td id="user-email" class="col-md-2 col-xs-1 table-secondary"> ${user[i].email}</td>
                
            </tr>`;
    };
    }