const express = require('express');
const router = express.Router();

const kontroler = require('../controllers/controller');

router.get('/pop_up_tekma', kontroler.pop_up_tekma);
router.get('/pop_up_tekma/:id', kontroler.podrobnostiTekme);
router
  .route('/pop_up_tekma/:id/uredi')
  .get(kontroler.urediTekmo)
  .post(kontroler.urediTekmo_POST);
router.get('/pop_up_tekma/:id/izbris', kontroler.izbrisiTekmo);
router.get('/pop_up_tekma/:id/pridruzi', kontroler.pridruziSeTekmi);
router.get('/pop_up_tekma/:id/odjavi', kontroler.odjaviOdTekme);

module.exports = router;