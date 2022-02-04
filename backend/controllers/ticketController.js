const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');


// @desc  Get user tickets
// @route GET /api/tickets
// @access Private
const getTickets = asyncHandler(async(req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id); //validate geçerli olunca tokeni req.user ile eklemiştik middlewware kısmında
    
    if(!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const tickets = await Ticket.find({user: req.user.id});

    res.status(200).json(tickets); 
})

// @desc    Get user ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)
  
    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }
  
    const ticket = await Ticket.findById(req.params.id)
  
    if (!ticket) {
      res.status(404)
      throw new Error('Ticket not found')
    }
  
    if (ticket.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('Not Authorized')
    }
  
    res.status(200).json(ticket)
  })


// @desc  Create new ticket
// @route POST/api/tickets
// @access Private
const createTicket = asyncHandler(async(req, res) => {
    const {product, description} = req.body; //kullanıcı seçimleri ile gelicek
    
    if(!product || !description) {
        res.status(400)
        throw new Error('Please add a product an description');
    }

     // Get user using the id in the JWT
     const user = await User.findById(req.user.id); //validate geçerli olunca tokeni req.user ile eklemiştik middlewware kısmında
    
     if(!user) {
         res.status(401);
         throw new Error('User not found');
     }
     // Create a ticket
     const ticket = await Ticket.create({
         product,
         description,
         user: req.user.id,
         status: 'new'
     })
    res.status(201).json(ticket); 
})

// @desc  Delete ticket
// @route DELETE /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async(req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id); //validate geçerli olunca tokeni req.user ile eklemiştik middlewware kısmında
    
    if(!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.id); //:id kolonundan gelicek

    if(!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    if(ticket.user.toString() !== req.user.id) { //tek bir ticket içinde kullanıcı idsi olmalı
        res.status(401);
        throw new Error('Not Authorized')
    }

    await ticket.remove() ;//return etmemize gerek yok silme işlemi var
    res.status(200).json({success: true}); 
})


// @desc  Update ticket
// @route PUT /api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async(req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id); //validate geçerli olunca tokeni req.user ile eklemiştik middlewware kısmında
    
    if(!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.id); //:id kolonundan gelicek

    if(!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    if(ticket.user.toString() !== req.user.id) { //tek bir ticket içinde kullanıcı idsi olmalı
        res.status(401);
        throw new Error('Not Authorized')
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id,
         req.body,{ new: true}); //ilk parametre urlden gelenId, ikincisi biz req.bodyden göndericez, üçüncüsü option böyle bir kayıt yoksa ekle
    res.status(200).json(updatedTicket); 
})



module.exports = {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket

}