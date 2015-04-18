db = db.getSiblingDB("vacayplanner");
db.categories.drop();

db.categories.save({
    "name": "Hotels",
    "description": "Hotels Category",
    "cssClass": "item-hotels",
    "imageUrl": "images/hotels.png",
    "is_active": true
});
db.categories.save({
    "name": "Resorts",
    "description": "Resorts Category",
    "cssClass": "item-resorts",
    "imageUrl": "images/resorts.png",
    "is_active": true
});
db.categories.save({
    "name": "Spa",
    "description": "Spa Category",
    "cssClass": "item-spa",
    "imageUrl": "images/spa.png",
    "is_active": true
});
db.categories.save({
    "name": "Movies-Entertainment",
    "description": "Movies Entertainment Category",
    "cssClass": "item-movies",
    "imageUrl": "images/movies.png",
    "is_active": true
});
db.categories.save({
    "name": "Travel-Air",
    "description": "Travel Air Category",
    "cssClass": "item-flight",
    "imageUrl": "images/travel-air.png",
    "is_active": true
});
db.categories.save({
    "name": "Travel-Car",
    "description": "Travel Car Category",
    "cssClass": "item-car",
    "imageUrl": "images/travel-car.png",
    "is_active": true
});