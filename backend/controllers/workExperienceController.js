import { UserModel, WorkExperienceModel } from '../models/index.js';

export const createWorkExperience = async (req, res) => {
  try {
    const { idProof, typeOfExperience, organizationName, role, duration, year } = req.body;

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

    // Check if work experience already exists for this user
    const existingExperience = await WorkExperienceModel.findOne({ userId: user._id });
    if (existingExperience) {
      // Update existing experience
      const updatedExperience = await WorkExperienceModel.findByIdAndUpdate(
        existingExperience._id,
        { typeOfExperience, organizationName, role, duration, year },
        { new: true }
      );
      return res.status(200).json({ message: "Work experience updated", experience: updatedExperience });
    }

    // Create new work experience
    const experience = await WorkExperienceModel.create({
      userId: user._id,
      typeOfExperience,
      organizationName,
      role,
      duration,
      year
    });

    res.status(201).json({ message: "Work experience saved", experience });
  } catch (err) {
    console.error('Work experience creation error:', err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};