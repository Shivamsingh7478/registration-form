import { UserModel, EducationDetailsModel } from '../models/index.js';

export const createEducationDetails = async (req, res) => {
  try {
    const { idProof, nameOfInstitution, courses, branch } = req.body;

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

    // Check if this specific education entry already exists for this user
    const existingDetails = await EducationDetailsModel.findOne({
      userId: user._id,
      nameOfInstitution,
      courses,
      branch
    });

    if (existingDetails) {
      // Update existing details
      const updatedDetails = await EducationDetailsModel.findByIdAndUpdate(
        existingDetails._id,
        { nameOfInstitution, courses, branch },
        { new: true }
      );
      return res.status(200).json({ message: "Education details updated", details: updatedDetails });
    }

    // Create new education details
    const details = await EducationDetailsModel.create({
      userId: user._id,
      nameOfInstitution,
      courses,
      branch
    });

    res.status(201).json({ message: "Education details saved", details });
  } catch (err) {
    console.error('Education details creation error:', err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
