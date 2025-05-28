import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  idProof: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);
export default UserModel; 