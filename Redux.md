# Conceptos Fundamentales de Redux
#### Fuente única de verdad
El **estado** de toda la aplicación esta guardado en un árbol contenido en **store** único. El hecho de que el árbol de datos sea único hace que depurar la aplicación sea más fácil y agiliza la comunicación entre componentes.
#### Estado de sólo lectura
La única manera de alterar el estado es emitiendo una **acción** que describa lo que ocurrió, y si hace falta, que aporte datos nuevos. La acción no modifica al estado directamente y se dan en orden.
#### Los cambios se realizan con funciones puras
Los reducers describen como se transforma el estado según las acciones. Los reducers son funciones puras, es decir que no tienen ningún efecto secundario, y a igual input, produce igual resultado, donde el resultado es el estado nuevo. Cada reducer debería afectar su o sus partes pertinentes del árbol de estado