import { Request, Response, NextFunction } from 'express';
import { Job } from '../models/Job';

// Função para listar trabalhos não pagos de um contrato específico
export const getUnpaidJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { contractId } = req.params;

    // Validação do ID como número
    const numericContractId = parseInt(contractId, 10);
    if (isNaN(numericContractId)) {
      res.status(400).json({ message: 'O ID do contrato deve ser um número válido' });
      return;
    }

    // Buscar Jobs não pagos para o contrato fornecido
    const unpaidJobs = await Job.findAll({
      where: {
        contractId: numericContractId,
        paid: false, // Apenas Jobs não pagos
      },
    });

    // Verifica se não existem Jobs não pagos
    if (unpaidJobs.length === 0) {
      res.status(404).json({ message: 'Nenhum trabalho não pago encontrado para este contrato' });
      return;
    }

    // Retornar Jobs encontrados
    res.status(200).json(unpaidJobs);
  } catch (error) {
    next(error);
  }
};

// Função para apagar um trabalho por ID
export const deleteJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { jobId } = req.params;

    // Validação do ID como número
    const numericJobId = parseInt(jobId, 10);
    if (isNaN(numericJobId)) {
      res.status(400).json({ message: 'O ID do trabalho deve ser um número válido' });
      return;
    }

    // Buscar o trabalho pelo ID
    const job = await Job.findByPk(numericJobId);

    if (!job) {
      res.status(404).json({ message: 'Trabalho não encontrado' });
      return;
    }

    // Excluir o trabalho
    await job.destroy();

    res.status(200).json({ message: 'Trabalho apagado com sucesso' });
  } catch (error) {
    next(error);
  }
};

// Função para criar um trabalho
export const createJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { contractId, description, operationDate, paymentDate, price, paid } = req.body;

    const newJob = await Job.create({
      contractId,
      description,
      operationDate,
      paymentDate,
      price,
      paid,
    });

    res.status(201).json(newJob);
  } catch (error) {
    next(error);
  }
};

// Função para listar todos os trabalhos de um contrato
export const getAllJobsByContract = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { contractId } = req.params;

    // Validação do ID como número
    const numericContractId = parseInt(contractId, 10);
    if (isNaN(numericContractId)) {
      res.status(400).json({ message: 'O ID do contrato deve ser um número válido' });
      return;
    }

    // Buscar todos os Jobs vinculados ao contrato
    const jobs = await Job.findAll({
      where: {
        contractId: numericContractId,
      },
    });

    // Verifica se não existem trabalhos para o contrato
    if (jobs.length === 0) {
      res.status(404).json({ message: 'Nenhum trabalho encontrado para este contrato' });
      return;
    }

    // Retorna os trabalhos encontrados
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};
