# EDIT a ticket ??

## Global notes // Redux Toolkit

`redux-thunk` is the most commonly used middleware for working with both synchronous and async logic outside of components
<br>

## BACKEND = server

### `ticketController` file

- control the ticket into the database

        OK updateTicket

  <br>

### `ticketModel` file

- describe the ticket elements

        ? edit boolean added

  <br>

### `ticketRoutes` file

- create the routes with the different endpoints

        OK PUT route for update

  <br>

## FRONTEND = Client

### `ticketService` file

- fetch the elements needed from the database for the ticket to be displayed

        ? use geTicket OR create an editTicket function

  <br>

### `ticketSlice` file

- manage the actions and reducers for redux toolkit
- ? use geTicket AND create an updateTicket function
  <br>

### `ticketItem` component

- ticketItem component reusable anywhere into the App. It includes a "View" button to go to the "Ticket" page
  <br>

### `NewTicket`, `Tickets` & `Ticket` pages

- views of tickets at different steps

        ? start EditTicket from Ticket

  <br>
