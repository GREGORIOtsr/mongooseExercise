# Ejercicios con MongoDB, Mongoose y REST API con Express #

Rutas Express para acceder, crear, actualizar y borrar contenido dentro de una base de datos en MongoDB.

Dentro de la carpeta [utils](utils) existen dos archivos json con objetos de prueba para Products y Providers.

**Paquetes usados en este proyecto:**
- Express
- MongoDB
- Mongoose
- dotenv

---------------------------------------------------------------------------

### Vercel Deployment ###

[**Vercel.app**](https://mongoose-exercise.vercel.app/)

---------------------------------------------------------------------------

### Colecciones ###

**Providers:**

Ejemplo de objeto:

```javascript
{
    "_id": ObjectId("655227aec5dbde7a481a1fcf")
    "company_name": "Primaprix",
	"CIF": "B86977014",
	"address": "Calle del Barquillo 17",
    "url_web":"https://primaprix.eu/es/tiendas/"
}
```

Endpoint: https://mongoose-exercise.vercel.app/api/providers

**Products:**

Ejemplo de objeto:

```javascript
{
    "_id": ObjectId("65523a110d7f15b7c5b9c86f")
    "title": "Brownies de coco",
	"price": 1.75,
    "description": "Brownies de chocolate con topping de coco",
    "provider": ObjectId("655227aec5dbde7a481a1fcf")
}
```

Endpoint: https://mongoose-exercise.vercel.app/api/products
