const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		product: {
			type: String,
			required: [true, 'Please select a product'],
			enum: ['Iphone', 'Macbook Pro', 'Imac', 'Ipad', 'Watch', 'AirPods', 'TV']
		},
		description: {
			type: String,
			required: [true, 'Please enter a description of the issue']
		},
		status: {
			type: String,
			enum: ['New', 'Open', 'Closed'],
			default: 'New'
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Ticket', ticketSchema);
