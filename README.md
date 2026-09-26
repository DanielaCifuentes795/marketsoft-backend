# MarketSoft Backend

API REST para la gestión de un supermercado, desarrollada como proyecto académico para la asignatura Programación 4 de la Universidad de Manizales.

El proyecto implementa una arquitectura MVC utilizando Node.js, Express, PostgreSQL y Sequelize, permitiendo realizar operaciones CRUD sobre productos, proveedores, usuarios, ventas y detalles de venta.

## Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- Sequelize ORM
- JavaScript
- Swagger / OpenAPI
- Git y GitHub

## Integrantes

| Integrante | Responsabilidad |
|---|---|
| Alejandra Salazar Cardona | Productos y Proveedores |
| Daniela Cifuentes Rendón | Usuarios y Ventas |
| María Paulina Clavijo Salazar | Detalle de Venta y Swagger |

## Arquitectura del proyecto

El proyecto utiliza el patrón MVC:

- **Model:** definición de las entidades y relaciones mediante Sequelize.
- **Controller:** contiene la lógica de negocio y las operaciones CRUD.
- **Routes:** define los endpoints de la API.
- **View:** las respuestas de la API se presentan en formato JSON y se documentan mediante Swagger.

## Entidades

### Producto

Atributos:

- id
- name
- description
- price
- stock
- providerId

### Proveedor

Atributos:

- id
- name
- phone
- email
- city

### Usuario

Atributos:

- id
- name
- email
- role

### Venta

Atributos:

- id
- userId
- date
- total

### DetalleVenta

Atributos:

- id
- saleId
- productId
- quantity
- price

## Relaciones

Las relaciones implementadas son:

- Un proveedor puede tener muchos productos.
- Un producto pertenece a un proveedor.
- Un usuario puede tener muchas ventas.
- Una venta pertenece a un usuario.
- Una venta puede tener muchos detalles de venta.
- Un detalle de venta pertenece a una venta.
- Un producto puede aparecer en muchos detalles de venta.
- Un detalle de venta pertenece a un producto.

## Requisitos previos

Para ejecutar el proyecto se requiere tener instalado:

- Node.js
- npm
- PostgreSQL
- Git

También se debe crear una base de datos PostgreSQL llamada:

```text
marketsoft-backend