drop database if exists bamazon_db;
create database bamazon_db;

use bamazon_db;

create table products(
item_id integer(10) auto_increment,
product_name varchar(100) not null,
department_name varchar(30) not null,
price integer(10) not null,
stock_quantity integer(10) not null,
primary key(id)
);

insert into products (product_name, department_name, price, stock_quantity)
values ("Global Win Globalwin", "Shoes", 30, 18),
("NB Trail Running Course En Sentier", "Shoes", 67, 255),
("Hydroton Leca Expanded Clay Pebbles", "Garden Supply", 10, 80),
("6 Inch Clear Plastic Orchid Pot", "Garden Supply", 5, 74),
("Targus Checkpoint Backpack for 15.6-Inch Laptop", "Backpack", 62, 11),
("CMP 3350mAh LG Cell", "Laptop Battery", 48, 49),
("Digital Kitchen Scale", "Food Scale", 9, 33),
("Universal Round watch SCREEN Protector (2 Units)", "Screen Protector", 9, 50),
("Paladone Harry Potter Hogwarts Notebook", "Notebook", 16, 40),
("Hohner Special 20 Harmonica, E", "Harmonicas", 39, 4);

