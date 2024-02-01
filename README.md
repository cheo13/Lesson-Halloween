
# Hallowen Party
## Evaluación del 3M: Cuenta la historia con Endpoints

**Objetivo:** Desarrollar una API para manejar disfrazes, asistentes y fiestas.

### Primer Paso: Escojer los disfrazes

1. **Endpoint `/costumes/stock`**: Crea un endpoint que devuelva los disfrazes, los que que se encuentren en stock.

2. **Manejo de Inventario Insuficiente**:
    - Si la cantidad de disfrazes en stock es menor que el número de asistentes, implementa un endpoint adicional `/costumes/supplying`.
    - Este endpoint debe permitir agregar más disfrazes al inventario hasta satisfacer la demanda (attendess).

### Segundo Paso: Comprar los disfrazes

1. **Endpoint `attendees/purchase`**: Realizar las compras. En el service de `attendees`, escribir el codigo de Typescript correspondiente para que devuelva los asistentes conjuntamente con los disfrazes que le corresponde a cada uno.
2. **Manejo de Presupuesto Insuficiente**:
    - Si un asistente no tiene suficiente dinero, crea un endpoint `/bank` para incrementar su presupuesto.
    - Para menores de edad, ya que no pueden acceder al banco, implementa un endpoint `/reallocation`. Este endpoint debe permitir transferir dinero de un asistente con exceso de fondos a un asistente menor de edad con fondos insuficientes.

### Tercer Paso: Revisar que fiestas hay según la fecha

1. **Endpoint `/parties/{date}`**: Implementa un endpoint para obtener la lista de fiesta disponibles de acorde a una fecha solicitada

### Cuarto Paso: Ingresar a la fiesta

1. **Endpoint `/attendees/adults`**: Implementa un endpoint |para identificar a los asistentes mayores de edad. Este filtro es necesario ya que no se permite la entrada de menores a la fiesta.

### Quinto Paso: Visitar a la Casita de Terror

1. **Endpoint `/attendees/nervous`**: Crea un endpoint que devuelva la lista de asistentes que están nerviosos. Esto es importante para la actividad posterior a la fiesta, como la visita a una casa del terror, donde no se recomienda la entrada a personas nerviosas.

---
