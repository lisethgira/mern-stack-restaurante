const express = require('express');
const router = express.Router();

// Task Model
const Plato = require('../models/plato');

// GET all Tasks
router.get('/', async (req, res) => {
  const platos = await Plato.find();
  res.json(platos);
});

// GET Task by id
router.get('/:id', async (req, res) => {
  const plato = await Plato.findById(req.params.id);
  res.json(plato);
});

// ADD a new task
router.post('/', async (req, res) => {
  const { title, description, precio  } = req.body;
  const plato = new Plato({title, description, precio });
  await plato.save();
  res.json({status: 'Plato guardado Correctamente'});
});

// UPDATE a new task
router.put('/:id', async (req, res) => {
  const { title, description, precio  } = req.body;
  const newPlato = {title, description, precio };
  await Plato.findByIdAndUpdate(req.params.id, newPlato);
  res.json({status: 'Plato Actualizado Correctamente'});
});

router.delete('/:id', async (req, res) => {
  await Plato.findByIdAndRemove(req.params.id);
  res.json({status: 'El Palto ha sido eliminado de su menú'});
});

module.exports = router;
