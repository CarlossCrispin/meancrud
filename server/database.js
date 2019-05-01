const mongoose = require ('mongoose');

// const URI = 'mongodb://localhost/mean-crud';
const URI = 'mongodb://carlos:Empl0yee@ds149806.mlab.com:49806/meancrud';

mongoose.connect(URI,{useNewUrlParser: true })
    .then(db => console.log('BD is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;