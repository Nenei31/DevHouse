import React, { useState} from "react";
import CategoriaService from "../../services/categoriaService";

const AgregarCategorias = () => {

const [nombre, setNombre] = useState('');
const [descripcion, setDescripcion] = useState('');
const [mostrarModal, setMostrarModal] = useState(false);





const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaCategoria = {
        nombre: nombre,
        descripcion: descripcion
    };

    CategoriaService.createCategoria(nuevaCategoria)
        .then((response) => {
            console.log('Categoría creada:', response.data);
            setMostrarModal(true);//mostramos el modal
            //limpiamos los datos
            setNombre('');
            setDescripcion('');
        })
        .catch((error) => {
            console.error('Error al crear la categoría:', error);
            setMostrarModal(false);
        });
};

const handleOkClick = () => {
    setMostrarModal(false);
    // Limpiar los campos del formulario
    setNombre("");
    setDescripcion("");
};


    return (
        <main class="body-agregarItems">
            <div class="container-agregar">
                <h1>Agregar Productos</h1>
                <form id="productForm" onSubmit={handleSubmit}>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="nombre">Nombre De La Categoria</label>
                            <input type="text" name="nombre" id="nombre" placeholder="Nombre del producto" value={nombre}
                                onChange={(e) => setNombre(e.target.value)} required />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="descripcion">Descripción</label>
                            <input type="text" name="descripcion" id="descripcion" placeholder="Descripción del producto" value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)} required />
                        </div>
                    </div>
                    <div class="form-buttons">
                        <button type="button"  onClick={() => window.history.back()}>Volver Atrás</button>
                        <button type="submit">Guardar</button>
                    </div>
                </form>
                {mostrarModal && (
                    <div className="modal">
                        <div className="modal-content">
                        <p>Categoría creada correctamente</p>
                        <button className="btn btn-danger" onClick={handleOkClick}>OK</button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}

export default AgregarCategorias;