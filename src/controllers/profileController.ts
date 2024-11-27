import { Request, Response, NextFunction } from 'express';
import { Profile } from '../models/Profile';

export const createProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { firstname, lastname, profession, balance, type } = req.body;

    const newProfile = await Profile.create({
      firstname,
      lastname,
      profession,
      balance,
      type,
    });

    res.status(201).json(newProfile);
  } catch (error) {
    next(error);
  }
};
