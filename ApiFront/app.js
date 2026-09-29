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

        eliminar.onclick = function () {
            ValidarEliminarAuto(element.vehiculoID, element.disponible);
        };

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

function abrirModalEditar() {
    document.getElementById("editarAuto").classList.add("abierto");
}

function cerrarModalEditar() {
    document.getElementById("editarAuto").classList.remove("abierto");
}
// funciones para crear, editar y eliminar autos

function CrearAuto() {
    var nuevoAuto = {
        modelo: document.getElementById("Modelo").value.trim(),
        kilometraje: document.getElementById("Kilometraje").value.trim(),
        precio: document.getElementById("Precio").value.trim(),
        patente: document.getElementById("Patente").value.trim(),
        marca: document.getElementById("Marca").value.trim(),
        anio: document.getElementById("Anio").value.trim(),
        fechaIngreso: document.getElementById("FechaIngreso").value.trim(),
    };

    //validaciones falatan aca

    fetch("http://localhost:5234/api/auto", {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoAuto),
    })
        .then((respuesta) => respuesta.json())
        .then((data) => {
            document.getElementById("Modelo").value = "";
            document.getElementById("Kilometraje").value = "";
            document.getElementById("Precio").value = "";
            document.getElementById("Patente").value = "";
            document.getElementById("Marca").value = "";
            document.getElementById("Anio").value = "";
            document.getElementById("FechaIngreso").value = "";
            cerrarModalCrear();
            ObtenerAuto();
        })

}

function BuscarAuto(id) { //tira error, revisar despues
    fetch(`http://localhost:5234/api/auto/${id}`)
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }
            return respuesta.json();
        })
        .then((data) => {
            console.log("datosAuto:", data);

            document.getElementById("AutoID").value = data.autoId;
            document.getElementById("ModeloEditar").value = data.modelo;
            document.getElementById("KilometrajeEditar").value = data.kilometraje;
            document.getElementById("PrecioEditar").value = data.precio;
            document.getElementById("PatenteEditar").value = data.patente;
            document.getElementById("MarcaEditar").value = data.marca;
            document.getElementById("AnioEditar").value = data.anio;
            document.getElementById("FechaIngresoEditar").value = data.fechaIngreso.split("T")[0];
            document.getElementById("EstadoEditar").value = data.estado;
            
            abrirModalEditar();

        })
        .catch((error) => {
            console.error("error al traer los datos de la api:", error);
        });
}

function EditarAuto() {
    let id = document.getElementById("autoID").value;
    let editarAuto = {
        autoID: document.getElementById("AutoID").value.trim(),
        modelo: document.getElementById("ModeloEditar").value.trim(),
        marca: document.getElementById("MarcaEditar").value.trim(),
        anio: document.getElementById("AnioEditar").value.trim(),
        patente: document.getElementById("PatenteEditar").value.trim(),
        fechaIngreso: document.getElementById("FechaIngresoEditar").value.trim(),
        precio: document.getElementById("PrecioEditar").value.trim(),
        kilometraje: document.getElementById("KilometrajeEditar").value.trim(),
        estado: document.getElementById("EstadoEditar").value.trim(),
    };
    fetch("http://localhost:5234/api/Auto", {
        method: "PUT",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editarAuto),
    })
        .then(() => {
            document.getElementById("ModeloEditar").value = "";
            document.getElementById("MarcaEditar").value = "";
            document.getElementById("KilometrajeEditar").value = "";
            document.getElementById("AnioEditar").value = "";
            document.getElementById("PatenteEditar").value = "";
            document.getElementById("PrecioEditar").value = "";
            document.getElementById("EstadoEditar").value = "";
            document.getElementById("FechaIngresoEditar").value = "";
            ObtenerAuto();
        })
        .catch((error) => {
            console.error("error de conexion en api", error);
        })
}

// funciones para eliminar 

function ValidarEliminarAuto(id, disponible) {
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

function EliminarAuto(id) {
    fetch(`http://localhost:5234/api/auto/${id}`, {
        method: "DELETE",
    })
        .then(() => {
            ObtenerAuto();
        })
        .catch((error) => console.error("error en la conexion a la api:", error));
}

ObtenerAuto() //esto no hay que sacarlo, esto ejecuta la funcion siempre