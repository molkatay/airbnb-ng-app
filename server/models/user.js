const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    username:{
        type: String,
        min: [4, 'Too short, min is 4 characters'],
        max: [32, 'Too long, max is 128 characters'],
    },
    email:{
        type: String,
        min: [4, 'Too short, min is 4 characters'],
        max: [32, 'Too long, max is 128 characters'],
        unique: true,
        lowercase: true,
        required: 'Email is required',
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password:{
        type: String,
        min: [4, 'Too short, min is 4 characters'],
        max: [32, 'Too long, max is 128 characters'],
        required: 'Password is required',
    },
    rentals:[{type: Schema.Types.ObjectId, ref: 'Rental'}],
});

userSchema.methods.hasSamePassword = function(requestedPassword){
    return bcrypt.compareSync(requestedPassword, this.password);
}

userSchema.pre('save', function(next){
    const user = this;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
})
module.exports = mongoose.model('User',userSchema);