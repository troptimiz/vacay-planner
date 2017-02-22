db = db.getSiblingDB("vacayplanner");
db.classificationgroups.drop();

db.classificationgroups.save({
    "name": "Amusement",
    "description": "Amusement Classification",
    "is_active": true
});

db.classificationgroups.save({
    "name": "Adventure",
    "description": "Adventure Classification",
    "is_active": true
});

db.classificationgroups.save({
    "name": "Elite",
    "description": "Elite Classification",
    "is_active": true
});