import { UserModel, PersonalDetailsModel } from '../models/index.js';

export const createPersonalDetails = async (req, res) => {
  try {
    const { idProof, fullName, DOB, bloodGroup, fatherName } = req.body;

    // Find existing user by idProof
    let user = await UserModel.findOne({ idProof });
    
    // If user doesn't exist, create new user
    if (!user) {
      try {
        user = await UserModel.create({ idProof });
      } catch (err) {
        // If creation fails due to duplicate key, try finding the user again
        if (err.code === 11000) {
          user = await UserModel.findOne({ idProof });
          if (!user) {
            return res.status(400).json({ message: "Error creating/finding user" });
          }
        } else {
          throw err;
        }
      }
    }

    // Check if personal details already exist for this user
    const existingDetails = await PersonalDetailsModel.findOne({ userId: user._id });
    if (existingDetails) {
      // Update existing details
      const updatedDetails = await PersonalDetailsModel.findByIdAndUpdate(
        existingDetails._id,
        { fullName, DOB, bloodGroup, fatherName },
        { new: true }
      );
      return res.status(200).json({ message: "Personal details updated", details: updatedDetails });
    }

    // Create new personal details
    const details = await PersonalDetailsModel.create({
      userId: user._id,
      fullName,
      DOB,
      bloodGroup,
      fatherName
    });

    res.status(201).json({ message: "Personal details saved", details });
  } catch (err) {
    console.error('Personal details creation error:', err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};