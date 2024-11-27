import { Request, Response, NextFunction } from 'express';
import { Profile } from '../models/Profile';
import { Deposit } from '../models/Deposit';

// Realizar depósito para o perfil
export const depositToProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { profileId } = req.params; // ID do perfil passado na URL
    const { depositValue } = req.body; // Valor do depósito passado no corpo da requisição

    // Verificar se o depósito é um número válido e positivo
    if (isNaN(depositValue) || depositValue <= 0) {
      res.status(400).json({ message: 'O valor do depósito deve ser um número positivo' });
      return;
    }

    // Encontrar o perfil pelo ID
    const profile = await Profile.findByPk(profileId);

    if (!profile) {
      res.status(404).json({ message: 'Perfil não encontrado' });
      return;
    }

    // Atualizar o saldo do perfil
    profile.balance += depositValue;
    await profile.save();

    // Registrar o depósito na tabela de depósitos
    await Deposit.create({
      clientId: profileId,
      depositValue,
      operationDate: new Date(),
    });

    res.status(200).json({ message: 'Depósito realizado com sucesso', profile });
  } catch (error) {
    next(error);
  }
};
