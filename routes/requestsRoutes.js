// const app = require('./app');
const express = require('express');
const router = express.Router();

const requestController = require('../controllers/requestsController');

router.get('/', requestController.getAllRequests);
router.get('/:id', requestController.getRequest);
router.post('/', requestController.createRequest);
// router.patch('/:id', requestController.updateRequest);
router.delete('/:id', requestController.deleteRequest);
router.get('/:id/approve', requestController.approveRequest);
router.get('/:id/reject', requestController.rejectRequest);

module.exports = router;
