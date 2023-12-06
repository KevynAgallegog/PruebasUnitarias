const express = require('express');
const router = express.Router();
const db = require('../db/conexion');

// Obtener todos los productos
router.get('/', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.json({ productos: results });
  });
});

// Crear un nuevo producto
router.post('/', (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  db.query('INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)', [nombre, descripcion, precio], (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(201).json({ message: 'Producto creado exitosamente', id: result.insertId });
  });
});

// Actualizar un producto por su ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio } = req.body;
  db.query('UPDATE productos SET nombre = ?, descripcion = ?, precio = ? WHERE id = ?', [nombre, descripcion, precio, id], (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.json({ message: 'Producto actualizado exitosamente', affectedRows: result.affectedRows });
  });
});

// Eliminar un producto por su ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM productos WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.json({ message: 'Producto eliminado exitosamente', affectedRows: result.affectedRows });
  });
});

module.exports = router;