const express = require('express');
const {
	getTickets,
	getTicket,
	createTicket,
	updateTicket,
	deleteTicket
} = require('../controllers/ticketController');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

// * Re-route into noteRouter - to get the following route: /api/tickets/:ticketId/notes
const noteRouter = require('./noteRoutes');
router.use('/:ticketId/notes', noteRouter);

router.route('/').get(protect, getTickets).post(protect, createTicket);

router
	.route('/:id')
	.get(protect, getTicket)
	.put(protect, updateTicket)
	.delete(protect, deleteTicket);

module.exports = router;
