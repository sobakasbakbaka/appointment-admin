export interface Client {
  id: number;
  name: string;
  phone: string;
  birthday?: string;
  whatsapp?: string;
  telegram?: string;
}

export interface CreateClientDto {
  name: string;
  phone: string;
  birthday?: string;
  whatsapp?: string;
  telegram?: string;
}

export interface UpdateClientDto {
  name?: string;
  phone?: string;
  birthday?: string;
  whatsapp?: string;
  telegram?: string;
}
