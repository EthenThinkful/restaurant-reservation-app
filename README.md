# Periodic Tables: Restaurant Reservation System

Fully-functional PERN Stack Application developed for use of restaurant personnel. Help your company keep track of whats going on!

In the process of restyling... 

## Demo 

You can view the app here: https://periodictables.vercel.app/dashboard

## Features

### Reservation Management

The main focus of this application is to allow the user to easily manage guests. Main features include:

1. Create: You can head to the nav-bar and click "New Reservation" which will prompt a screen that allows you to create a detailed reservation.

2. Edit: Once a reservation has been created you will be redirected to the dashboard page of the date of that reservation. The reservation card on that page will include options to seat, edit, or cancel reservation.

Upon clicking edit, will direct you to the initial form upon which you can update or change any information.

3. Delete: If you wish to cancel a reservation, an "are you sure screen" will pop up.

4. Assigning Tables to Reservations: Clicking the "seat" button will allow you to assign this reservation a table.

Once the reservation at any table is done with their stay, you can click the "finish" button to clear the table to be available for other reservations.

5. Creating new tables: head to the nav-bar to create new tables. You can create a new table and submit it to be available for reservations.

6. Searching a Reservation by Phone Number: This feature allows you to search the database for any reservation matching a phone number.

## Installation

1. Run `npm install` under the root folder to install project dependencies.
1. Run `npm run start` to start your server.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than http://localhost:5001.

## Plans for App Expansion

As this app is functional, I have plans for extensive styling and additional features. If you would like to submit any feature requests or bugs, head to the issues tab and I will review it!




