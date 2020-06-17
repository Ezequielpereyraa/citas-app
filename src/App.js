import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario'
import Cita from './components/Cita'
function App() {
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = [];
  }
  // useState para mostrar las citas
  const [citas, setCitas] = useState(citasIniciales)
  const newCitas = (cita) => { // funcion para almacenar las nuevas citas
    setCitas([...citas, cita])
  }
  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas))
    } else {
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas, citasIniciales])

  const eliminarCita = (id) => {
    const arrayCitasE = citas.filter(cita => cita.id !== id);
    setCitas(arrayCitasE)
  }
  // Mensaje Condicional
  const titulo = citas.length === 0 ? 'No hay Citas' : 'Administra tus Citas'
  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              newCitas={ newCitas }
            />
          </div>
          <div className="one-half column">
            <h1>{ titulo }</h1>
            { citas.map(cita => ( // Recorremos las citas del useState
              <Cita
                key={ cita.id } // hay que asignarle unna key unica
                cita={ cita } // pasamos como props todo el objeto
                eliminarCita={ eliminarCita }
              />
            )) }
          </div>
        </div>
      </div>
    </Fragment>
  );
}


export default App;