'use client';
import { useSession } from 'next-auth/react';
import { useTodos } from './hooks/useTodos';
import UnauthenticatedView from './components/UnauthenticatedView';
import AuthenticatedView from './components/AuthenticatedView';
import SkeletonLoader from './components/Skeleton';


export default function Home() {
  const { status, data: session } = useSession();
  const { data: todos, isLoading, isError } = useTodos();

  if (status === 'loading') {
    return <SkeletonLoader />;
  }

  if (status === 'unauthenticated') {
    return <UnauthenticatedView />;
  }

  if (isLoading) {
    return <p>Loading todos...</p>;
  }

  if (isError) {
    return <p>Failed to load todos. Please try again later.</p>;
  }

  return <AuthenticatedView todos={todos} />;
}
