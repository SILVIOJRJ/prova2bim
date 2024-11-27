import { Router } from 'express';
import { createJob, getUnpaidJobs, deleteJob } from '../controllers/jobController';
import { createProfile } from '../controllers/profileController';
import { depositToProfile } from '../controllers/depositController';
import {
  createContract,
  getContractsByProfile,
  updateContractTerms,
  getAllContracts,
} from '../controllers/contractController';
import { countContractsByProfile } from '../controllers/contractController';

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

export default router;
