const mongoose = require('mongoose');

const Connection = mongoose.connect(process.env.MONGO_URI).then(() => console.log('DB Connected')).catch((err) => console.log('Error occured when connecting with DB :', err))

module.exports = Connection;