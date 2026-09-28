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
//estas funciones solo traen los autos y la de abajo los muestra
function mostrarAuto(data) {
    const tbody = document.getElementById("tablaProducto");
    tbody.innerHTML = "";

    data.forEach((element) => {
        let tr = tbody.insertRow();

        tr.insertCell(0).innerHTML = element.modelo;

        tr.insertCell(1).innerHTML = element.marca;

        tr.insertCell(2).innerHTML = element.kilometraje;

        tr.insertCell(3).innerHTML = element.anio;

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
        eliminar.textContent = "Eliminar";
        eliminar.classList.add("btnElim");

        eliminar.setAttribute(
            "onclick",
            `EliminarAuto(${element.autoID})`,
        );

        let tdEliminar = tr.insertCell(7);
        tdEliminar.appendChild(eliminar);


    });
}

// funciones del modal artesanal 

function abrirModalCrear() {
    document.getElementById("crearAuto").classList.add("abierto");
}

function cerrarModalCrear() {
    document.getElementById("crearAuto").classList.remove("abierto");
}

// funciones para crear, editar y eliminar autos

function CrearAuto() { }

function BuscarAuto(autoID) { //tira error, revisar despues
    fetch(`http://localhost:5234/api/Auto/${autoID}`)
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }
            return respuesta.json();
        })
        .then((data) => {
            console.log("datos auto:", data);

            document.getElementById("AutoID").value = data.autoID;
            document.getElementById("ModeloEditar").value = data.Modelo;
            document.getElementById("MarcaEditar").value = data.Marca;
            document.getElementById("KilometrajeEditar").value = data.Kilometraje;
            document.getElementById("AnioEditar").value = data.Anio;
            document.getElementById("PatenteEditar").value = data.Patente;
            document.getElementById("PrecioEditar").value = data.Precio;
            document.getElementById("EstadoEditar").value = String(data.Estado);
            document.getElementById("FechaIngresoEditar").value = data.FechaIngreso
                ? data.fechaIngreso.split("T")[0]
                : "";

            document.getElementById("editarVehiculo").classList.add("abierto");
        })
        .catch((error) => {
            console.error("error al traer los datos de la api:", error);
        });
}

function EditarAuto() { }

// funciones para eliminar 

function ValidarEliminarAuto(autoID, disponible) {
    if (
        disponible = true
    ) {
        alert("este auto aun esta disponible, no puedes eliminarlo");
        return;
    }
    var siElimina = confirm("seguro quieres eliminar este auto? sera permanente")
    if (siElimina == true) {
        EliminarAuto(autoID);
    }
}

function EliminarAuto(autoID) {
    fetch(`http://localhost:5234/api/auto/${autoID}`, {
        method: "DELETE",
    })
        .then(() => {
            ObtenerAuto();
        })
        .catch((error) => console.error("error en la conexion a la api:", error));
}

ObtenerAuto() //esto no hay que sacarlo, esto ejecuta la funcion siempre