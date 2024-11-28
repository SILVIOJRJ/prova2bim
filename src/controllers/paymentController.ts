import { Request, Response, NextFunction } from 'express';
import { Payment } from '../models/Payment';
import { Job } from '../models/Job';

export const createPayment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { jobId, amount } = req.body;
  
      if (!jobId || amount <= 0) {
        res.status(400).json({ message: 'Job ID e valor do pagamento devem ser válidos' });
        return;
      }
  
      const job = await Job.findByPk(jobId);
      if (!job) {
        res.status(404).json({ message: 'Job não encontrado' });
        return;
      }
  
      if (job.balance <= 0) {
        res.status(400).json({ message: 'O trabalho já foi pago integralmente' });
        return;
      }
  
      if (amount > job.balance) {
        res.status(400).json({ message: 'O pagamento excede o saldo restante do trabalho' });
        return;
      }
  
      job.balance -= amount;
  
      if (job.balance === 0) {
        job.paid = true;
      }
  
      await job.save();
  
      const payment = await Payment.create({
        jobId,
        amount,
        operationDate: new Date(),
      });
  
      res.status(201).json({ message: 'Pagamento registrado com sucesso', payment });
    } catch (error) {
      next(error);
    }
  };