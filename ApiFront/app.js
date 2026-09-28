function ObtenerAuto() {
    fetch('http://localhost:5050/Api/auto')
        .then((respuesta) => respuesta.json())
        .then((data) => {
            console.log(data);
            mostrarProducto(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function mostrarAuto(data) {
    const tbody = document.getElementById("tablaAuto");
    tbody.innerHTML = "";

    data.forEach((element) => {
        let tr = tbody.insertRow();

        tr.insertCell(0).innerHTML = element.nombre;

        tr.insertCell(1).innerHTML = element.descripcion;

        tr.insertCell(2).innerHTML = element.precioCosto;

        tr.insertCell(3).innerHTML = element.precioVenta;

        let editar = document.createElement("button"); // boton
        editar.textContent = "Editar"; // texto
        editar.classList.add("btn", "btn-primary"); // agregamos clases

        editar.setAttribute(
            "onclick",
            `BuscarAuto(${element.productoID})`,
        );

        let tdEditar = tr.insertCell(4);
        tdEditar.appendChild(editar); // inserta el boton editar en la celda
    });
}


function EliminarVehiculo(id) {
    fetch(`http://localhost:5050/api/auto/${id}`, {
        method: "DELETE",
    })
        .then(() => {
            ObtenerAuto();
        })
        .catch((error) => console.error("No se pudo acceder a la API:", error));
}


function BuscarAuto(Autoid) {
    fetch(`http://localhost:5050/api/CargaVehiculo/${Autoid}`)
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }
            return respuesta.json();
        })
        .then((data) => {
            console.log("busqueda por id:", data);

            document.getElementById("AutoID").value = data.AutoID;
            document.getElementById("MarcaEditar").value = data.marca;
            document.getElementById("ModeloEditar").value = data.modelo;
            document.getElementById("AñoEditar").value = data.año;
            document.getElementById("PatenteEditar").value = data.patente;
            document.getElementById("KilometrajeEditar").value = data.kilometraje;
            document.getElementById("FechaIngresoEditar").value = data.fechaIngreso.split("T")[0];
            document.getElementById("EstadoEditar").value = data.disponible;

            let modal = new bootstrap.Modal(document.getElementById("editarVehiculo"));
            modal.show();// hay que  ver como hacer un modal casero
        })
        .catch((error) => {
            console.error("No se pudo acceder a la API:", error);
        });
}

ObtenerAuto();