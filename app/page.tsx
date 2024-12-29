'use client';
import { useSession } from 'next-auth/react';
import DonutChart from './components/DonutChart';
import { useTodos } from './hooks/useTodos';
import Link from 'next/link';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';

export default function Home() {
  const { status, data: session } = useSession();
  const { data: todos, isLoading, isError } = useTodos();

  if (status === 'loading') {
    return <Text size="2">Loading session...</Text>;
  }

  if (status === 'unauthenticated') {
    return <Text size="3" color="red" weight="medium">
      Please log in to track your todos.
    </Text>;
  }

  if (isLoading) {
    return <Text size="2">Loading todos...</Text>;
  }

  if (isError) {
    return <Text size="2" color="red">Failed to load todos. Please try again later.</Text>;
  }

  // Calculate completed and pending todos
  const completedCount = todos.filter((todo: any) => todo.completed).length;
  const pendingTodos = todos.filter((todo: any) => !todo.completed);

  return (
    <Flex
      direction="column"
      align="center"
      gap="8"
      className="max-w-5xl mx-auto mt-12 p-6"
    >
      <Heading as="h1" size="5" weight="bold" align="center">
        Welcome, {session?.user?.name || 'User'}!
      </Heading>

      <Flex
        direction={{ initial: 'column', lg: 'row' }}
        align="start"
        justify="center"
        gap="5"
        className="w-full"
      >
        <Card variant="surface" className="flex-1 p-6 shadow-md">
          <Flex direction="column" align="center" gap="4">
            <Heading as="h2" size="4" weight="bold" color="bronze" align="center">
              Todo Completion Progress
            </Heading>
            <DonutChart completed={completedCount} pending={pendingTodos.length} />
          </Flex>
        </Card>

        <Card variant="surface" className="flex-1 p-6 shadow-md">
          <Heading as="h2" size="4" weight="bold" color="bronze" className="mb-4">
            Pending Todos
          </Heading>
          {pendingTodos.length > 0 ? (
            <Flex direction="column" gap="2">
              {pendingTodos.map((todo: any) => (
                <Text key={todo.id} size="3" color="bronze" weight="medium" className="hover:underline">
                  <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
                </Text>
              ))}
            </Flex>
          ) : (
            <Text size="3" color="green" weight="medium">
              All tasks are completed!
            </Text>
          )}
        </Card>
      </Flex>
    </Flex>
  );
}
