# ot-cell

Mini Excel-like app to allow Real-time collaboration editing via OT(Operational transformation)

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org) - latest recommend version (v10.1.0~)

### Installing
```
# npm install
```
### Running
```
# npm start
```
http://localhost:5000 (default port)

### To change the port number
```javascript
// serverRunner.js
...
ShareJS.attach(server, ShareJSOpts);

port = 5000; // TODO

server.listen(port, function() {
...
```

## License & Acknowledgments
This project is licensed under the MIT License
* [ShareJS](https://github.com/josephg/ShareJS) - Operational Transform
* [Oliviale Ng](https://codepen.io/oliviale/pen/rPjgmB) - CSS Grid: Excel Spreadsheet
* etc
