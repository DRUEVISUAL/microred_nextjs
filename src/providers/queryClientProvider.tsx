'use client'

// Types
import { PropsWithChildren } from 'react';

// Utilities
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

////////////////////////////////////////////////////////////////////////////////

export default function TanstackQueryClientProvider({ children }: PropsWithChildren) {
	const queryClient = new QueryClient();

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
