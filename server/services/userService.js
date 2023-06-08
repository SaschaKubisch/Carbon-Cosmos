const { User } = require('../db/models/User');

const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    console.error(`Could not create user: ${error}`);
    throw new Error('Failed to create user');
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    console.error(`Could not find user: ${error}`);
    throw new Error('Failed to get user');
  }
};

const updateUser = async (id, updates) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error(`User with id ${id} not found.`);
    }
    const updatedUser = await user.update(updates);
    return updatedUser;
  } catch (error) {
    console.error(`Could not update user: ${error}`);
    throw new Error('Failed to update user');
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error(`User with id ${id} not found.`);
    }
    await user.destroy();
    return true;
  } catch (error) {
    console.error(`Could not delete user: ${error}`);
    throw new Error('Failed to delete user');
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
