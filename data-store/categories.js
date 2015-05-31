db = db.getSiblingDB("vacayplanner");
db.categories.drop();

db.categories.save({
     "__v" : 0,
     "cssClass" : "item-hotels",
     "description" : "Hotels Category",
     "imageUrl" : "noimage1432925276412.jpg",
     "is_active" : true,
     "name" : "Hotels"
});
db.categories.save({
     "cssClass" : "item-resorts",
     "description" : "Resorts Category",
     "imageUrl" : "noimage1433006300821.jpg",
     "is_active" : true,
     "name" : "Resorts"
});
db.categories.save({
    "classification" : [
            {
                    "name" : "Adventure",
                    "_id" : ObjectId("556a19b54e3665a41e6313b3")
            },
            {
                    "name" : "Elite",
                    "_id" : ObjectId("556a1a2c5cb923980dc9a8fd")
            },
            {
                    "name" : "Amusement",
                    "_id" : ObjectId("556a273d64f4213c1d272e7c")
            },
            {
                    "name" : "Music",
                    "_id" : ObjectId("556a283b64f4213c1d272e82")
            }
    ],
    "cssClass" : "item-spa",
    "description" : "Spa Category Description",
    "imageUrl" : "hotel1433020260838.jpg",
    "is_active" : true,
    "name" : "Spa"
});
db.categories.save({
    "cssClass" : "item-movies",
    "description" : "Movies Entertainment Category",
    "imageUrl" : "hotel1433006337375.jpg",
    "is_active" : true,
    "name" : "Movies-Entertainment"
});
db.categories.save({
    "classification" : [
            {
                    "name" : "Adventure",
                    "_id" : ObjectId("556aa1e500f3f3a40e7c3e51")
            },
            {
                    "name" : "Elite",
                    "_id" : ObjectId("556aa1f000f3f3a40e7c3e52")
            },
            {
                    "name" : "Amusement",
                    "_id" : ObjectId("556aa20100f3f3a40e7c3e53")
            }
    ],
    "cssClass" : "item-flight",
    "description" : "Travel Air Category",
    "imageUrl" : "hotel1433006544461.jpg",
    "is_active" : true,
    "name" : "Travel-Air"
});
db.categories.save({
    "cssClass" : "item-car",
    "description" : "Travel Car Category",
    "imageUrl" : "noimage1433006376804.jpg",
    "is_active" : true,
    "name" : "Travel-Car"
});