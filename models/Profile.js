const mongoose = require('mongoose');
const profileSchema = require('../schemas/profile');
const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
