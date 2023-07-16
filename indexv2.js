let numTests = 5; // Número de pruebas a realizar
let testCompleted = 0; // Contador de pruebas completadas
let totalSpeed = 0; // Velocidad total acumulada

const measureSpeed = async () => {
  const startTime = performance.now(); // Tiempo de inicio de la prueba
  const response = await fetch('https://speedtest.example.com/sample.jpg'); // URL de la imagen de prueba
  const endTime = performance.now(); // Tiempo de finalización de la prueba
  const duration = endTime - startTime; // Duración de la prueba en milisegundos
  const speed = response.headers.get('content-length') / (duration / 1000); // Velocidad en bytes por segundo

  totalSpeed += speed; // Acumular la velocidad
  testCompleted++; // Incrementar el contador de pruebas completadas

  if (testCompleted === numTests) {
    // Calcular el promedio de velocidad
    const averageSpeed = totalSpeed / numTests;

    // Mostrar los resultados en elementos HTML
    document.getElementById('bits').textContent = averageSpeed.toFixed(2);
    document.getElementById('kbs').textContent = (averageSpeed / 1024).toFixed(2);
    document.getElementById('mbs').textContent = (averageSpeed / (1024 * 1024)).toFixed(2);
    document.getElementById('info').textContent = 'Pruebas completadas';
  } else {
    // Realizar la siguiente prueba
    measureSpeed();
  }
};

const init = () => {
  // Reiniciar los contadores
  testCompleted = 0;
  totalSpeed = 0;
  document.getElementById('info').textContent = 'Realizando pruebas...';

  // Iniciar la primera prueba
  measureSpeed();
};

window.onload = () => {
  // Iniciar las pruebas al cargar la página
  init();
};
