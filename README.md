# Respuestas `TASKS.md`

### Q1

Si `findAll()` no tuviera `@Get()`, `GET /tasks` respondería `404 Not Found`, porque NestJS no registraría la ruta.  
Para corregirlo, se debe importar `Get` y agregar `@Get()` encima de `findAll()`.

### Q2

`transform: true` convierte `"42"` en `42`, pero no rechaza correctamente un valor inválido como `"abc"` en un parámetro simple; este puede llegar como `NaN`.  
`ParseIntPipe` sí convierte y además rechaza inmediatamente valores no numéricos con `400 Bad Request`.

### Q3

Con `whitelist: true` y sin `forbidNonWhitelisted: true`, la respuesta sería `201 Created` y el body sería:

```json
{
  "id": 3,
  "name": "Maria",
  "email": "m@m.com",
  "age": 20,
  "role": "student"
}
```

`password` se elimina antes de llegar al servicio.  
El problema es que el sistema acepta silenciosamente campos no permitidos, lo que oculta errores del cliente y riesgos de overposting.

### Q4

Sí, modificar lo que devuelve `findAll()` cambia los datos internos del servicio, porque se devuelven las mismas referencias del array y de los objetos.  
Para evitarlo, se deben devolver copias, por ejemplo:

```ts
findAll(): Product[] {
  return this.products.map((product) => ({ ...product }));
}
```

### Q5

`{"price": -50}` falla con `400 Bad Request`.  
`{}` pasa la validación.  
`@IsOptional()` solo significa que si la propiedad no viene, no se valida; si viene, sí se aplican los demás validadores.

### Q6

Si se borra la tarea `#1` y luego se crea una nueva, la nueva recibe el ID `4`.  
`findOne(1)` no devuelve otra tarea; lanza `NotFoundException`.  
Si el ID fuera `this.tasks.length + 1`, después de borrar `#1` la siguiente tarea volvería a recibir `3`, duplicando IDs.

### Q7

`a)` El servidor arranca normalmente.  
`b)` `POST /users` responde `404 Not Found`, porque el módulo no fue importado y sus rutas no se registraron.  
Se trata de un problema de configuración en runtime, no de compilación ni de arranque.

### Q8

`@Post()` devuelve `201 Created` por defecto en NestJS.  
No poner `@HttpCode(201)` no está mal si de todos modos se quiere `201`.  
Solo importa si se quiere otro status o dejar el contrato explícito en documentación o tests.

### Q9

Si el servicio devolviera `null`, quedaría así:

```ts
findOne(id: number): Product | null {
  return this.products.find((p) => p.id === id) ?? null;
}
```

Y el controlador quedaría así:

```ts
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  const product = this.productsService.findOne(id);

  if (!product) {
    throw new NotFoundException(`Product #${id} not found`);
  }

  return product;
}
```

La versión donde el servicio lanza `NotFoundException` es mejor, porque centraliza el manejo del error y evita repetir validaciones en `controller`, `update` y `remove`.
