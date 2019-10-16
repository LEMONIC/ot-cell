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
http://localhost:5000 (Real-time collaboration editing with different 2-browser)

### Usage
* Left-Click to Cell : select cell
* Double-Click to Cell : set cell value
* Drag to Cells : select cell range
* Left-Click to ColorPicker : set background-color to selected cells
* Delete Key : delete value to selected cells

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
* [Node.js](https://nodejs.org) - JavaScript server side
* [ShareJS](https://github.com/josephg/ShareJS) - Operational Transform
* [jasmine](https://github.com/jasmine/jasmine) - JavaScript testing framework
* [jQuery](https://jquery.com) - JavaScript client side
* [jQueryUI](https://jqueryui.com) - for selectable
* [jquery-simplecolorpicker](https://github.com/tkrotoff/jquery-simplecolorpicker) - simple color picker
* [Oliviale Ng](https://codepen.io/oliviale/pen/rPjgmB) - CSS Grid: Excel Spreadsheet
* etc..
