function ObtenerAuto() {
    fetch('http://localhost:5234/Api/auto')
        .then((respuesta) => respuesta.json())
        .then((data) => {
            console.log(data);
            mostrarAuto(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function mostrarAuto(data) {
    const tbody = document.getElementById("tablaProducto");
    tbody.innerHTML = "";

    data.forEach((element) => {
        let tr = tbody.insertRow();

        tr.insertCell(0).innerHTML = element.modelo;

        tr.insertCell(1).innerHTML = element.marca;

        tr.insertCell(2).innerHTML = element.kilometraje;

        tr.insertCell(3).innerHTML = element.año;

        tr.insertCell(4).innerHTML = element.patente;

        tr.insertCell(5).innerHTML = element.precio;


        let editar = document.createElement("button"); // boton
        editar.textContent = "Editar"; // texto
        editar.classList.add("btn");

        editar.setAttribute(
            "onclick",
            `BuscarAuto(${element.autoID})`,
        );

        let tdEditar = tr.insertCell(6);
        tdEditar.appendChild(editar); // inserta en la celda

        let eliminar = document.createElement("button");
        eliminar.textContent ="Eliminar";
        eliminar.classList.add("btnElim");

        eliminar.setAttribute(
            "onclick",
            `BuscarAuto(${element.autoID})`,
        );

        let tdEliminar = tr.insertCell(7);
        tdEliminar.appendChild(eliminar);


    });
}

