import CallAPIBusiness from '@/api/business_api';

// Business type values mirror your Prisma Category enum
export const BUSINESS_TYPES = ['Office', 'Coach', 'Bank', 'Agency', 'Account', 'Orm'] as const;
export type BusinessType = typeof BUSINESS_TYPES[number];

// Tax types used by your API
export const TAX_TYPES = ['VAT', 'Non-VAT'] as const;
export type TaxType = typeof TAX_TYPES[number];

export interface BusinessRegistrationInput {
  businessName: string;
  taxId: string;
  businessType: BusinessType;
  taxType: TaxType;
  userId: number;
  memberId: string; // Member.uniqueId
  DocumentType?: Array<'Invoice' | 'Receipt' | 'Quotation' | 'WithholdingTax'>;
}

export interface BusinessRegistrationResult<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

// Small guard utilities similar to your register flow
export const isNonEmpty = (v: string | undefined | null) => !!v && v.trim().length > 0;

export const validateBusinessRegistration = (
  input: BusinessRegistrationInput
): string | null => {
  if (!isNonEmpty(input.businessName)) return 'Business name is required';
  if (!isNonEmpty(input.taxId)) return 'Tax ID is required';
  if (!BUSINESS_TYPES.includes(input.businessType)) return 'Invalid business type';
  if (!TAX_TYPES.includes(input.taxType)) return 'Invalid tax type';
  if (!input.userId || Number.isNaN(Number(input.userId))) return 'Invalid userId';
  if (!isNonEmpty(input.memberId)) return 'Invalid memberId';
  return null;
};

export async function registerBusiness(
  input: BusinessRegistrationInput
): Promise<BusinessRegistrationResult> {
  const validationError = validateBusinessRegistration(input);
  if (validationError) {
    return { success: false, message: validationError };
  }

  try {
    const data = await CallAPIBusiness.RegisterAPI(input);
    if (data?.error) {
      return { success: false, message: String(data.error) };
    }
    return { success: true, data };
  } catch (error: any) {
    const message =
      error instanceof Error
        ? error.message
        : typeof error === 'object' && error !== null && 'message' in error
        ? String((error as { message?: unknown }).message ?? 'Something went wrong.')
        : 'Something went wrong.';
    return { success: false, message };
  }
}
