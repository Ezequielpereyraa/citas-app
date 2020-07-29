import React, { Fragment, useState } from 'react';
import uuid from 'react-uuid'
import PropTypes from 'prop-types'

const Formulario = ({ newCitas }) => {
  const [cita, setCita] = useState({
    // objeto con el estado inicial de los inputs
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  })
  // Error de validacion 
  const [error, setError] = useState(false)
  // Funcion para actualizar el estado 
  const actualizarCita = (e) => {
    setCita({
      ...cita, // De esta forma hacemos una copia del objeto inicial 
      [e.target.name]: e.target.value // e = es el evento que recibe cada input, con e.target.name vemos en que campo estamos escribiendo y con e.target.value obtenemos el valor de mismo
    })
  }
  // Destructuramos el objeto 
  const { mascota, propietario, fecha, hora, sintomas } = cita
  // Funcion para enviar el formulario
  const submitCita = e => {
    e.preventDefault()
    // validar 
    if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' ||
      hora.trim() === '' ||
      sintomas.trim() === '') {
      setError(true);
      return;
    }
    // Eliminar mensaje previo
    setError(false)
    // Asignar ID
    cita.id = uuid()
    // Crear Cita 
    newCitas(cita);
    // Reset Formulario
    setCita({
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: ''
    })
  }
  return (
    <Fragment>
      <h2>Crear Cita</h2>
      { error ? <p className='alerta-error'>
        Todos los Campos Son Obligatorios
      </p> : null }
      <form
        onSubmit={ submitCita }
      >
        <label>Nombre de Mascota</label>
        <input type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          value={ mascota }
          onChange={ actualizarCita } // funcion de las cuales se obtiene el valor del input
        />
        <label>Nombre Dueño</label>
        <input type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño"
          value={ propietario }
          onChange={ actualizarCita }
        />
        <label>Fecha</label>
        <input type="date"
          name="fecha"
          className="u-full-width"
          value={ fecha }
          onChange={ actualizarCita }
        />
        <label>Hora</label>
        <input type="time"
          name="hora"
          className="u-full-width"
          value={ hora }
          onChange={ actualizarCita }
        />
        <label>Sintomas</label>
        <textarea
          name="sintomas"
          className="u-full-width"
          value={ sintomas }
          onChange={ actualizarCita }
        ></textarea>
        <button
          type="submit"
          className="u-full-width button-primary"
        >
          Agregar Cita
        </button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes = {
  newCitas: PropTypes.func.isRequired
}

export default Formulario;
