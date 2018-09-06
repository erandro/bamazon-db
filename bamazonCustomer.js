var inquirer = require("inquirer");
var mysql = require("mysql");
var colors = require('colors');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    readProducts();
    askItemIdAndAmount();
});
function readProducts() {
    console.log("Products available:\n".red);
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        res.forEach(element => {
            console.log("item ID " + element.item_id + ": " + element.product_name);
            console.log(element.department_name + " department");
            console.log("Price: " + element.price);
            console.log(element.stock_quantity + " still in stock\n".green);
        });

    });
};
function askItemIdAndAmount() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "id",
                message: "What's the product ID that you would like to buy"
            },
            {
                name: "amount",
                message: "how many would you like to buy?"
            }
        ]).then(function (userInput) {

            var product_stock = checkProductStock(userInput.id);
            //because checkProductStock() is stuck:
            //console.log(product_stock); --> undifined
            //just to be able to continued I gave product_stock a value:
            product_stock = 12;

            var new_amonut = product_stock - userInput.amount
            if (new_amonut < 0) {
                console.log("There are only " + product_stock + " in stock. Please select product id and amount again");
                askItemIdAndAmount();
            } else {
                editProductAmountInDatabase(new_amonut, userInput.id);
                var purchase_price = showPurchaseCost(userInput.amount, userInput.id);
            };
        });
    });
};
function checkProductStock(id) {
    connection.query("SELECT stock_quantity FROM products where item_id = " + id, function (err, res) {
        if (err) throw err;
        return res[0].stock_quantity;
        // this function is stuck (when I do "return") - not returning the amount
    });
};
function editProductAmountInDatabase(amount, id) {
    connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: amount
            },
            {
                item_id: id
            }
        ],
        function (err, res) {
            console.log("*products amount have been updated!*\n");
        });
};
function showPurchaseCost(amount, id) {
    connection.query("SELECT price FROM products where item_id = " + id, function (err, res) {
        if (err) throw err;
        console.log("Your purchase total is $" + res[0].price * amount + "\n");
        connection.end();
    });
};