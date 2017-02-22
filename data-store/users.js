db = db.getSiblingDB("vacayplanner");
db.users.drop();

db.users.save({
    "username": "admin01",
    "password": "pass123",
    "firstName":"Admin-01",
    "lastName":"",
    "middleName":"",
     "role":"admin",
    "designation":"Mr",
    "emailAddress":"admn01@vacayplanner.com",
    "is_active":true
});

db.users.save({
    "username": "admin02",
    "password": "pass123",
    "firstName":"Admin-02",
    "lastName":"",
    "middleName":"",
     "role":"admin",
    "designation":"Mr",
    "emailAddress":"admn02@vacayplanner.com",
     "is_active":true
});

db.users.save({
    "username": "admin03",
    "password": "pass123",
    "firstName":"Admin-03",
    "lastName":"",
    "middleName":"",
    "role":"admin",
    "designation":"Mr",
    "emailAddress":"admn03@vacayplanner.com",
     "is_active":true
});