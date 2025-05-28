import { UserModel, ContactDetailsModel } from '../models/index.js';

export const createContactDetails = async (req, res) => {
    try {
        const {idProof, email, phone, addresses, sameAsCorrespondence} = req.body;

        let user =  await UserModel.findOne({idProof});
        if(!user){
            try {
                user = await UserModel.create({idProof});
            } catch (err) {
                if (err.code === 11000) {
                    user = await UserModel.findOne({idProof});
                    if (!user) {
                        return res.status(400).json({ message: "Error creating/finding user" });
                    }
                } else {
                    throw err;
                }
            }
        };

        const existingDetails = await ContactDetailsModel.findOne({ userId: user._id });
        if (existingDetails) {
            const updatedDetails = await ContactDetailsModel.findByIdAndUpdate(
                existingDetails._id,
                { email, phone, addresses, sameAsCorrespondence },
                { new: true }
            );
            return res.status(200).json({ message: "Contact details updated", details: updatedDetails });
        }

        const details = await ContactDetailsModel.create({
            userId: user._id,
            email,
            phone,
            addresses,
            sameAsCorrespondence
        });

        res.status(201).json({ message: "Contact details saved", details });
    }
        catch(err){
        console.error('Contact details creation error:', err);
        res.status(500).json({ message: "Server error", error: err.message });
    }

};