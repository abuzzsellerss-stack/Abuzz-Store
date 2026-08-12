declare module '@cashfreepayments/cashfree-js' {
  export function load(options: { mode: 'sandbox' | 'production' }): Promise<{
    checkout: (params: { paymentSessionId: string; redirectTarget?: '_self' | '_blank' | '_top' }) => void;
  }>;
}
