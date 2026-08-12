import { redirect } from 'next/navigation';

// Redirect bare /product to home catalog
export default function ProductRootPage() {
  redirect('/');
}
