import mongoose from 'mongoose';

const personalDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  DOB: {
    type: Date,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  fatherName: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const PersonalDetailsModel = mongoose.model('PersonalDetails', personalDetailsSchema);
export default PersonalDetailsModel; 