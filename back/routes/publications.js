const express = require('express');

const publicationCtrl = require('../controllers/publication');
const jwtCheck = require('../middleware/jwtCheck')

let router = express.Router();

router.get('/',jwtCheck ,publicationCtrl.getAllPublications);

router.get('/:id',jwtCheck ,publicationCtrl.getPublication);

router.put('/',jwtCheck ,publicationCtrl.createPublication);

router.patch('/:id',jwtCheck ,publicationCtrl.updatePublication);

router.post('/untrash/:id',jwtCheck ,publicationCtrl.untrashPublication);

router.delete('/trash/:id',jwtCheck ,publicationCtrl.trashPublication);

router.delete('/:id',jwtCheck ,publicationCtrl.deletePublication);

module.exports = router;