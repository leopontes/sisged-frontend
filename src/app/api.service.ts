import axios, { AxiosResponse } from "axios";
import { Escola } from './escola';
import { Turma } from './turma';

const apiClient = axios.create({
  baseURL: 'https://localhost:5001/api',
  responseType: 'json',
  headers:{
    'Content-Type': 'application/json'
  }
});

// :::::API Escolas::::
export const getAllEscola = async (): Promise<Escola[]> => {
  return new Promise(async(resolve, reject) =>{
    try{
      const escolas = await apiClient.get<Escola[]>('/escolas');
      return resolve(escolas.data);
    }catch(err){
      return reject(err);
    }
  });
};

export const getEscolaById = async (id: number): Promise<Escola> =>{
  return new Promise(async(resolve, reject)=>{
    try{
      const escola = await apiClient.get<Escola>(`/escolas/${id}`);
      return resolve(escola.data);
    }catch(err){
      return reject(err);
    }
  });
};

export const createEscola = async (escola: Escola): Promise<AxiosResponse> => {
  return apiClient.post('/escolas', escola);
};

export const updateEscola = async (id: number, escola: Escola): Promise<AxiosResponse> =>{
  return apiClient.put(`/escolas/${id}`, escola);
};

export const deleteEscola = async (id: number): Promise<AxiosResponse> =>{
  return apiClient.delete(`/escolas/${id}`);
};

// API :::::Turmas:::::
export const getAllTurmas = async (): Promise<Turma[]> => {
  return new Promise(async(resolve, reject) =>{
    try{
      const turmas = await apiClient.get<Turma[]>('/turmas');
      return resolve(turmas.data);
    }catch(err){
      return reject(err);
    }
  });
};

export const getTurmaById = async (id: number): Promise<Turma> =>{
  return new Promise(async(resolve, reject)=>{
    try{
      const turma = await apiClient.get<Turma>(`/turmas/${id}`);
      return resolve(turma.data);
    }catch(err){
      return reject(err);
    }
  });
};

export const createTurma = async (turma: Turma): Promise<AxiosResponse> => {
  return apiClient.post('/turmas', turma);
};

export const updateTurma = async (id: number, turma: Turma): Promise<AxiosResponse> =>{
  return apiClient.put(`/turmas/${id}`, turma);
};

export const deleteTurma = async (id: number): Promise<AxiosResponse> =>{
  return apiClient.delete(`/turmas/${id}`);
};