# Mongo DB basics

This file resumes basics commands and concepts of mongo DB

## Quick start with the mongo shell

```
// show DBs
show dbs
// create and use db
use mydb
// to show you on wich db you are
db
```

The equivalent of SQL Tables is collection. They hold documents or reccords.

```
db.createCollection('collectionName')
show collections
```

To insert document inside collection :
```
db.collectionName.insert({...});
// ex :
db.firstCollection.insert({first_name: 'John', last_name: 'Doe'})
// Then
db.firstCollection.find()
// This will display all documents inside the collection
```
The collection is not freezed with defined objects :
```
db.firstCollection.insert({first_name: 'Fix', last_name: 'Alain', gender: "female"})
// then
db.firstCollection.find().pretty()
// pretty change the displaying
```
### Update entries
```
db.firstCollection.update({match}, {replacment object})
// ex :
db.firstCollection.update({name: "toto"}, {size: 4})
```
This will replace the entire object ! To keep the old object and add new fields :
```
db.firstCollection.update({name: "toto"}, {$set:{size: 4}})
```
In the same idea, other operators exist:
```
// To remove hobby field
db.firstCollection.update({name: "toto"}, {$unset:{hobby:1}})

// To increment size by 5 :
db.firstCollection.update({name: "toto"}, {$inc:{size: 5}})

// To update/create if not exist, pass option as third argument
db.firstCollection.update({first_name: "Unknown"},{first_name: "Unknown", "last_name": "nolastname"},{upsert: true})

// To rename a field
db.firstCollection.update({name: "toto"}, {$rename:{name: "first_name"}})
```
### Delete entries
```
// remove all matches
db.firstCollection.remove({match})
// Or just one
db.firstCollection.remove({match}, {justOne: true})
```
### Get entries
```
db.firstCollection.find({match})
// ex :
db.firstCollection.find({name:"coco"})
db.firstCollection.find({"address.number": 30})
// test if array contains value : (admin favoritescolors is an array)
db.firstCollection.find({favoritescolors: "blue"})

// multiple
db.firstCollection.find({$or:[{match},{another_match}]})

// with conditions (greater than, lower than...)
db.firstCollection.find({age:{gt:40}})
```
#### Treat entries
```
// Sorting :1 for ascending, -1 for descending
db.firstCollection.find({match}).sort({field_to_sort: 1})

// Counting
db.firstCollection.find({match}).count()

// Limit
db.firstCollection.find({match}).limit()

// ForEach (Yes ! With js like function !!)
db.firstCollection.find({match}).forEach(fucntion(doc){print("Name is " + doc.first_name)})
```