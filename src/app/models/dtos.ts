export interface ClientDto {
  id?: number;
  fullName?: string;
  email?: string;
  telephone?: string;
  password?: string;
}


export interface CompteDto {
  code?: string;
  type?: 'COURANT' | 'EPARGNE';
  solde?: number;
  dateCreation?: string; // ISO date string
  status?: 'CREATED' | 'ACTIVATED' | 'SUSPENDED';
  clientId?: number;
  agentId?: number;
  client?: ClientDto; // Optional, to include client details
}

export interface CompteCourantDto extends CompteDto {
  decouvert?: number;
}

export interface CompteEpargneDto extends CompteDto {
  tauxInteret?: number;
}

export interface OperationDto {
  id?: number;
  dateOperation?: string; // ISO date string
  montant?: number;
  type?: 'DEBIT' | 'CREDIT';
  compteCode?: string;
}
