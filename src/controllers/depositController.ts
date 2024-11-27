import { Request, Response, NextFunction } from 'express';

export const depositToProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { profileId, amount } = req.body;
    // Sua lógica aqui...
    res.status(200).json({ message: 'Deposit successful' });
  } catch (error) {
    next(error); // Certifique-se de chamar o `next` em caso de erro
  }
};
