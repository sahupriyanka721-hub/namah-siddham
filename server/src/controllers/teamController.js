import LeadershipMember from '../models/LeadershipMember.js';

export const getAllTeamMembers = async (req, res, next) => {
  try {
    const team = await LeadershipMember.find().sort({ displayOrder: 1, createdAt: 1 });
    res.status(200).json({
      success: true,
      count: team.length,
      data: team,
    });
  } catch (error) {
    next(error);
  }
};

export const getTeamMemberById = async (req, res, next) => {
  try {
    const member = await LeadershipMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Team member not found.' });
    }
    res.status(200).json({ success: true, data: member });
  } catch (error) {
    next(error);
  }
};

export const createTeamMember = async (req, res, next) => {
  try {
    const { name, designation, biography, profileImage, linkedinUrl, displayOrder, isPublished } = req.body;

    const member = await LeadershipMember.create({
      name,
      designation,
      biography,
      profileImage,
      linkedinUrl,
      displayOrder: Number(displayOrder) || 0,
      isPublished: isPublished !== undefined ? isPublished : true,
    });

    res.status(201).json({
      success: true,
      message: 'Team profile created successfully.',
      data: member,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTeamMember = async (req, res, next) => {
  try {
    const member = await LeadershipMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!member) {
      return res.status(404).json({ success: false, message: 'Team member not found.' });
    }
    res.status(200).json({
      success: true,
      message: 'Team profile updated successfully.',
      data: member,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTeamMember = async (req, res, next) => {
  try {
    const member = await LeadershipMember.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Team member not found.' });
    }
    res.status(200).json({
      success: true,
      message: 'Team member removed.',
    });
  } catch (error) {
    next(error);
  }
};
