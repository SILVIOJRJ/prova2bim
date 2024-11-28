import { Request, Response, NextFunction } from 'express';
import { Profile } from '../models/Profile';
import { Deposit } from '../models/Deposit';

export const depositToProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { profileId, amount } = req.body;

    // Validações
    if (!profileId || !amount) {
      res.status(400).json({ message: 'É necessário informar o ID do perfil e o valor do depósito.' });
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      res.status(400).json({ message: 'O valor do depósito deve ser um número positivo.' });
      return;
    }

    // Buscar o perfil no banco de dados
    const profile = await Profile.findByPk(profileId);

    if (!profile) {
      res.status(404).json({ message: 'Perfil não encontrado.' });
      return;
    }

    // Atualizar o saldo do perfil
    profile.balance += amount;
    await profile.save();

    // Registrar o depósito na tabela de depósitos
    await Deposit.create({
      clientId: profileId, // Certifique-se de que esse campo corresponde ao modelo Deposit
      depositValue: amount,
      operationDate: new Date(),
    });

    // Resposta de sucesso
    res.status(200).json({
      message: 'Depósito realizado com sucesso.',
      updatedBalance: profile.balance,
    });
  } catch (error) {
    next(error); // Passa o erro para o middleware de tratamento de erros
  }
};
