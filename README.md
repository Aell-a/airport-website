# Welcome

Scanpol is a flight search website for Amsterdam Schiphol Airport.
Users can browse flights and save them to their profile.
Website is made with Next.js, ShadCN, TailwindCSS, NodeJS, Express and MongoDB.
Requires NodeJS version higher than 18

## Dependencies

Front-end

- React
- Next.js
- TailwindCSS
- ShadCN
- Axios

Backend

- NodeJs
- Express
- JWT
- Mongoose
- bcryptjs
- Axios

## Installing

Path into server and client folders and run `npm install` on both directories to install necessary dependencies.
Then you can run `npm run dev` on both paths to start the development environment.
For backend to function properly you need a `.env` file with MongoDB URI, JWT Secret Key and App ID & Key from Schiphol API.
![.env File](https://i.imgur.com/qNh382J.png)

## Functionality

Airport search from country, city or airport name
![Searching for airports](https://i.imgur.com/wKRDSfj.png)
Datepicker component with past dates disabled
![Datepicker](https://i.imgur.com/UbZlX3W.png)
Recieved flights from Schiphol API listed
![flights](https://i.imgur.com/m89qB4V.png)
Clicking save button redirects us to login popup
![popup](https://i.imgur.com/BJ9D4dw.png)
After logging in/registering we can save flights
![save flight](https://i.imgur.com/Fudq0yo.png)
Saved flights displayed in profile page
![profile](https://i.imgur.com/k9K1DeY.png)
Our database displaying user information and saved flight information
![database](https://i.imgur.com/oQN4YPf.png)
