Tienes el rol de un programador frontend, en html y javascript.

El objetivo es construir una aplicación web que contenga un cronómetro y una cuenta atrás, como el siguiente ejemplo: https://www.online-stopwatch.com/

Tiene que tener una pantalla inicial en la que se pueda elegir o cuenta atrás o cronómetro, de la misma forma que en el ejemplo.
Al presionar la imagen de cuenta atrás, tiene que aparecer una interfaz similiar a la indicada en la imagen adjunta, con un botón por cada número del 1 al 9, un botón de "Set" y un botón de "Clear" (que pondrá todos los números a 0). 

Al presionar cada uno de los botones numéricos el número presionado se pondrá en la última posición y los demás se desplazarán hacia la izquierda (pasando de segundos a minutos, y posteriormente a horas).
Escribe el código, suponiendo que hay un fichero index.html y un fichero script.js (en el que irán las funciones javascript necesarias)


------------------------------------------------

los botones que me has dado están desordenados. Van del 5 al 9, y después del 0 al 4. Ponlos ordenados del 0 al 9.

------------------------------------------------

faltaría poner un botón, en la parte inferior de los botones de números y de set y clear, que permita volver a la vista anterior de selección de cronómetro o cuentra atrás. El botón tiene que ocupar todo el ancho del resto de elementos, con el texto "Volver" y tener una flecha hacia la izquierda para indicar que se volverá hacia atrás al ser pulsado. Al pulsarlo tiene que resetear la cuenta atrás a todo "0"s.

------------------------------------------------

Implementa el cronómetro siguiendo el mismo patrón que la cuenta atrás. Al pulsar el botón del cronómetro, debe ocultarse el menú principal y mostrarse un display con el mismo estilo que el de la cuenta atrás, junto con dos botones: "start" y "clear". El botón "start" debe iniciar el cronómetro y cambiar su texto a "stop" mientras esté en marcha. Al pulsar "stop", el cronómetro debe detenerse manteniendo el tiempo actual y el texto del botón debe volver a "start". El botón "clear" debe poner el cronómetro a 0, detenerlo si estaba en marcha y asegurarse de que el botón principal vuelva a mostrar "start". Asegúrate de limpiar correctamente cualquier intervalo/timer activo al detener o reiniciar el cronómetro.

------------------------------------------------

Por último, ajusta el comportamiento del botón “Set” durante la cuenta atrás para que funcione igual que el botón del cronómetro.

Cuando la cuenta atrás esté en marcha, el botón “Set” debe cambiar su texto a “Stop”.

Si el usuario pulsa el botón mientras muestra “Stop”, la cuenta atrás debe pausarse en el tiempo restante actual y el texto del botón debe cambiar a “Continue”.

Si el usuario pulsa el botón mientras muestra “Continue”, la cuenta atrás debe reanudarse exactamente desde el punto en el que se había pausado, y el texto del botón debe volver a cambiar a “Stop”.

Asegúrate de que este comportamiento solo afecte a la cuenta atrás y no rompa el funcionamiento actual del cronómetro.

