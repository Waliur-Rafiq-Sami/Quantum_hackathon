export type AccountType = "customer" | "provider";

export interface CustomerFormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  password: string;
  agreeTerms: boolean;
}

export interface ProviderFormData {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  expertiseCategory: string;
  serviceArea: string;
  baseCharge: string;
  password: string;
  idDocumentName?: string;
  agreeTerms: boolean;
}
