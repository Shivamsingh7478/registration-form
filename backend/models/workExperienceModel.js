import mongoose from 'mongoose';

const workExperienceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  typeOfExperience: {
    type: String,
    required: true
  },
  organizationName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const WorkExperienceModel = mongoose.model('WorkExperience', workExperienceSchema);
export default WorkExperienceModel; 