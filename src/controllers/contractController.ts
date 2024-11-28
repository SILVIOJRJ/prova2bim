import { Request, Response, NextFunction } from 'express';
import { Contract } from '../models/Contract';
import { Op } from 'sequelize';

// Criar contrato
export const createContract = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { terms, clientId, contractorId, operationDate, status } = req.body;

    const newContract = await Contract.create({
      terms,
      clientId,
      contractorId,
      operationDate,
      status,
    });

    res.status(201).json(newContract);
  } catch (error) {
    next(error);
  }
};

// Listar contratos por perfil (clientId ou contractorId)
export const getContractsByProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { profileId } = req.params;

    // Validação de ID como número
    const numericProfileId = parseInt(profileId, 10);
    if (isNaN(numericProfileId)) {
      res.status(400).json({ message: 'O ID do perfil deve ser um número válido' });
      return;
    }

    // Busca contratos onde o perfil é clientId ou contractorId
    const contracts = await Contract.findAll({
      where: {
        [Op.or]: [
          { clientId: numericProfileId },
          { contractorId: numericProfileId },
        ],
      },
    });

    // Verifica se não existem contratos para o perfil fornecido
    if (contracts.length === 0) {
      res.status(404).json({ message: 'Nenhum contrato encontrado para este perfil' });
      return;
    }

    // Retorna os contratos encontrados
    res.status(200).json(contracts);
  } catch (error) {
    next(error);
  }
};

// Listar todos os contratos
export const getAllContracts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const contracts = await Contract.findAll(); // Busca todos os contratos no banco
    res.status(200).json(contracts); // Retorna os contratos encontrados
  } catch (error) {
    next(error); // Passa o erro para o middleware de tratamento
  }
};

// Contar contratos por perfil
export const countContractsByProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { profileId } = req.params;

    // Validação de ID como número
    const numericProfileId = parseInt(profileId, 10);
    if (isNaN(numericProfileId)) {
      res.status(400).json({ message: 'O ID do perfil deve ser um número válido' });
      return;
    }

    // Contar os contratos onde clientId ou contractorId corresponde ao profileId
    const contractCount = await Contract.count({
      where: {
        [Op.or]: [
          { clientId: numericProfileId },
          { contractorId: numericProfileId },
        ],
      },
    });

    res.status(200).json({ profileId: numericProfileId, contractCount });
  } catch (error) {
    next(error); // Passar erro para o middleware de tratamento
  }
};

// Atualizar termos do contrato
export const updateContractTerms = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { contractId } = req.params;
    const { terms } = req.body;

    // Validação de ID como número
    const numericContractId = parseInt(contractId, 10);
    if (isNaN(numericContractId)) {
      res.status(400).json({ message: 'O ID do contrato deve ser um número válido' });
      return;
    }

    // Buscar contrato pelo ID fornecido
    const contract = await Contract.findByPk(numericContractId);

    if (!contract) {
      res.status(404).json({ message: 'Contrato não encontrado' });
      return;
    }

    // Atualiza os termos do contrato
    contract.terms = terms;
    await contract.save();

    res.status(200).json({ message: 'Termos do contrato atualizados com sucesso', contract });
  } catch (error) {
    next(error);
  }
};
