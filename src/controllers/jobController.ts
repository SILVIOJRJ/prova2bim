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

    const unpaidJobs = await Job.findAll({
      where: {
        contractId,
        paid: false, // Apenas trabalhos não pagos
      },
    });

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

    // Buscar o trabalho pelo ID
    const job = await Job.findByPk(jobId);

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
