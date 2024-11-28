import { Router } from 'express';
import { createJob, getUnpaidJobs, deleteJob, getAllJobsByContract } from '../controllers/jobController';
import { createProfile } from '../controllers/profileController';
import { depositToProfile } from '../controllers/depositController';
import {
  createContract,
  getContractsByProfile,
  updateContractTerms,
  getAllContracts,
} from '../controllers/contractController';
import { countContractsByProfile } from '../controllers/contractController';
import { createPayment } from '../controllers/paymentController';

const router = Router();

router.post('/profiles', createProfile); // Criar perfis
router.post('/contracts', createContract); // Criar contratos
router.get('/contracts/:profileId', getContractsByProfile); // Listar contratos por perfil
router.post('/jobs', createJob); // Criar trabalhos
router.get('/jobs/unpaid/:contractId', getUnpaidJobs); // Listar trabalhos não pagos
router.post('/deposits', depositToProfile); // Fazer depósitos
router.put('/contracts/:contractId', updateContractTerms); // Atualizar termos de contrato
router.delete('/jobs/:jobId', deleteJob); // Deletar um trabalho
router.get('/contracts', getAllContracts); // Rota para listar todos os contratos
router.get('/contracts/count/:profileId', countContractsByProfile); // Contar contratos por perfil
router.get('/contracts/profile/:profileId', getContractsByProfile); // Listar contratos por perfil
router.get('/contracts/count/profile/:profileId', countContractsByProfile); // Contar contratos por perfil
router.post('/deposits/:profileId', depositToProfile); // Realizar depósito para um perfil
router.get('/jobs/unpaid/:contractId', getUnpaidJobs);
router.get('/jobs/:contractId', getAllJobsByContract);
router.delete('/jobs/:jobId', deleteJob);
router.post('/deposits/:profileId', depositToProfile);
router.get('/jobs/unpaid/:contractId', getUnpaidJobs); // Listar trabalhos não pagos integralmente
router.post('/jobs/payment', createPayment); // Registrar pagamento
router.post('/payments', createPayment);
router.post('/api/payments', createPayment);
router.post('/jobs/payment', createPayment); // Rota para registrar pagamento

export default router;
