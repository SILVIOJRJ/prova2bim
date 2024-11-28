import { Request, Response, NextFunction } from 'express';
import { Job } from '../models/Job';
import { Payment } from '../models/Payment';

// Função para listar trabalhos não pagos de um contrato específico
export const getUnpaidJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { contractId } = req.params;

    const numericContractId = parseInt(contractId, 10);
    if (isNaN(numericContractId)) {
      res.status(400).json({ message: 'O ID do contrato deve ser um número válido' });
      return;
    }

    const unpaidJobs = await Job.findAll({
      where: {
        contractId: numericContractId,
        paid: false,
      },
    });

    if (unpaidJobs.length === 0) {
      res.status(404).json({ message: 'Nenhum trabalho não pago encontrado para este contrato' });
      return;
    }

    const jobsWithDetails = unpaidJobs.map((job) => ({
      ...job.toJSON(),
      partialPayment: job.price - job.balance,
      remaining: job.balance,
    }));

    res.status(200).json(jobsWithDetails);
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
      balance: price, // Inicializa o saldo como o preço total
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

// Função para registrar pagamentos
export const createPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { jobId, amount } = req.body;

    if (amount <= 0) {
      res.status(400).json({ message: 'O valor do pagamento deve ser positivo' });
      return;
    }

    const job = await Job.findByPk(jobId);

    if (!job) {
      res.status(404).json({ message: 'Trabalho não encontrado' });
      return;
    }

    if (job.balance <= 0) {
      res.status(400).json({ message: 'O trabalho já foi pago integralmente' });
      return;
    }

    if (amount > job.balance) {
      res.status(400).json({ message: 'O pagamento excede o valor restante' });
      return;
    }

    // Atualizar saldo do trabalho
    job.balance -= amount;

    if (job.balance === 0) {
      job.paid = true; // Marca como pago integralmente
    }

    await job.save();

    // Registrar o pagamento
    await Payment.create({
      jobId,
      amount,
      operationDate: new Date(),
    });

    res.status(200).json({ message: 'Pagamento registrado com sucesso', job });
  } catch (error) {
    next(error);
  }
};
