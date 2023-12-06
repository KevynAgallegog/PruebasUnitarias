const request = require('supertest');
const app = require('../app');

describe('Test de las rutas de productos', () => {
  it('Debería obtener todos los productos', async () => {
    const response = await request(app).get('/productos');
    expect(response.status).toBe(200);
  });

  it('Debería crear un nuevo producto', async () => {
    const newProduct = {
      nombre: 'Producto de prueba',
      descripcion: 'Descripción de prueba',
      precio: 99.99
    };

    const response = await request(app)
      .post('/productos')
      .send(newProduct);

    expect(response.status).toBe(201);
  });

});