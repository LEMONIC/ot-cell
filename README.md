# ot-cell

Mini Excel-like app to allow concurrent editing via OT(Operational transformation)

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org) - latest recommend version (v10.1.0~)

### Installing
```
# npm install
```
### Running
```
# node ./lib/index.js
```
http://localhost:5000 (default port)

### To change the port number
```javascript
// ./lib/index.js
...
ShareJS.attach(server, ShareJSOpts);

port = 5000; // Todo

server.listen(port, function() {
...
```

## License & Acknowledgments
This project is licensed under the MIT License
* [ShareJS](https://github.com/josephg/ShareJS) - Operational Transform
* [Oliviale Ng](https://codepen.io/oliviale/pen/rPjgmB) - CSS Grid: Excel Spreadsheet
* etc
