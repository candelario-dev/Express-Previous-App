const express = require('express') //Calls the express npm
const app = express() //refers to express
const bodyParser = require('body-parser') // How it reads the forms
const MongoClient = require('mongodb').MongoClient //Allows node to interact w/ database
const mongo = require('mongodb')

var db, collection; //Vars you'll use later

const dbName = "demo"; //shortcut for the databse name
const url = `mongodb+srv://becca:becca@clusterlist.hsv8a.mongodb.net/<dbname>?retryWrites=true&w=majority`; //connection to database

app.listen(3000, () => { //listen to the port
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => { //connecting to mongo db
        if(error) { //handles error
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs') //app=express viewing as ejs
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public')) //public folders

app.get('/', (req, res) => { //request and response it reads in CRUD when you load page
  //console.log(db)
  db.collection('messages').find().sort({priority:-1}).toArray((err, result) => { //finding and turning messages to array you have err or result
    if (err) return console.log(err)
     result.sort((a, b) => a.priority > b.priority);
     console.log(result[0]);
    res.render('index.ejs', {messages: result}) //if result put it into the ejs
  })
})

app.post('/messages', (req, res) => { //Create in CRUD
  db.collection('messages').save({name: req.body.name, msg: req.body.msg, priority: 0}, (err, result) => {
    if (err) return console.log(err) //^properties for the object
    console.log('saved to database')
    res.redirect('/') //responding w/ a reques to refresh page
  })
})

// app.put('/thumbUp', (req, res) => { //Put is Update in CRUD
//   db.collection('messages')
//   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
//     $set: { //replaces value with specified value
//       thumbUp:req.body.thumbUp + 1 //takes thumbs up value and adds one
//     }
//   }, {
//     sort: {_id: -1}, //tprt the ids
//     upsert: true //to update if everything matches
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })

app.put('/messages', (req, res) => {

  // console.log(req.body)
  db.collection('messages').findOneAndUpdate({_id: new mongo.ObjectID(req.body.id)}, {
    $inc: {
      priority: 1
    }
  },
    // sort: {_id: -1},
    // upsert: true
  (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })

})



// app.put('/messages', (req, res) => {
//
//   console.log(req.body, req.body.priority)
//   if(req.body.priority == 0){
//   db.collection('messages').findOneAndUpdate({_id: new mongo.ObjectID(req.body.id)}, {
//     $set: {
//       priority: 1
//     }
//   }
// )
// }else{
//     db.collection('messages').findOneAndUpdate({_id: new mongo.ObjectID(req.body.id)}, {
//       $set: {
//         priority: 0
//       }
//     }
//   )
// }
//     // sort: {_id: -1},
//     // upsert: true
//   (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   }
//
// })





// app.put('/done', (req, res) => {
//   // console.log(req.body)
//   db.collection('messages')
//   .findOneAndUpdate({_id: new mongo.ObjectID(req.body.id)}, {
//     $set: {
//       list.insertBefore(li, list.firstChild)
//     }
//   }, {
//     // sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })


app.delete('/messages', (req, res) => {
  db.collection('messages').findOneAndDelete({_id: new mongo.ObjectID(req.body.id)}, (err, result) => {
    console.log('result', result);
    if (err) return res.send(500, err)
    res.json(result)
  })
})

app.delete('/removeAll', (req, res) => {
  db.collection('messages').deleteMany({}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
