import mongoose from 'mongoose';

const educationDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  nameOfInstitution: {
    type: String,
    required: true
  },
  courses: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  }
  // startYear: {
  //   type: Number,
  //   required: true
  // },
  // endYear: {
  //   type: Number,
  //   required: true
  // }
}, {
  timestamps: true
});

// Create a compound index to allow multiple education entries per user
educationDetailsSchema.index({ userId: 1, nameOfInstitution: 1, courses: 1, branch: 1 }, { unique: true });

const EducationDetailsModel = mongoose.model('EducationDetails', educationDetailsSchema, 'educationdetails');
export default EducationDetailsModel; 