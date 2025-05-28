import mongoose from 'mongoose';

const contactDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  addresses: [{
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    }
  }],
  sameAsCorrespondence: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Validate exactly two addresses
contactDetailsSchema.pre('save', function(next) {
  if (this.addresses.length !== 2) {
    next(new Error('Exactly two addresses are required'));
  }
  next();
});

const ContactDetailsModel = mongoose.model('ContactDetails', contactDetailsSchema, 'contactdetails');
export default ContactDetailsModel; 