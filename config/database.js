const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const MongoClient = require('mongodb').MongoClient;


// MongoDB connection URI
const uri = 'mongodb+srv://pavan:pavan123@cluster0.byvgdnu.mongodb.net/events-management?retryWrites=true&w=majority&appName=Cluster0';

// Function to connect to MongoDB
const connectToDatabase = async () => {
    try {
        const connect = await mongoose.connect(uri);
        console.log('Connected to MongoDB ', connect.connection.host, connect.connection.name);


        // // Database Name
        const dbName = 'events-management';

        // // Collection Name
        // const collectionName = 'events';

        // // CSV file path
        // const csvFilePath = './data/events.csv'; // Path to your CSV file

        // // Read the CSV file and insert data into MongoDB
        // fs.createReadStream(csvFilePath)
        //     .pipe(csv())
        //     .on('data', async (row) => {
        //         try {
        //             const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        //             await client.connect();
        //             const db = client.db(dbName);
        //             const collection = db.collection('events'); // Change 'myCollection' to your collection name
        //             await collection.insertOne(row);
        //             console.log('Inserted:', row);
        //         } catch (error) {
        //             console.error('Error inserting data:', error);
        //         }
        //     })
        //     .on('end', () => {
        //         console.log('CSV file successfully processed');
        //     });
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('events');
        collection.updateMany(
            { "date": { $type: "string" } }, // Filter documents where date field is of type string
            [
                {
                    $set: {
                        "date": { $toDate: "$date" } // Convert string to date
                    }
                }
            ]
        );


    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Throw error for handling in the calling function
    }
};

module.exports = connectToDatabase;
