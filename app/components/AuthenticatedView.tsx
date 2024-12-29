'use client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import DonutChart from './DonutChart';
import Link from 'next/link';
import { useSession } from 'next-auth/react';


interface AuthenticatedViewProps {
      todos: any[];
}

const AuthenticatedView = ({ todos }: AuthenticatedViewProps) => {
      const completedCount = todos.filter((todo) => todo.completed).length;
      const pendingTodos = todos.filter((todo) => !todo.completed);
      const { data: session } = useSession();

      return (
            <Flex
                  direction="column"
                  align="center"
                  gap="8"
                  className="max-w-5xl mx-auto mt-12 px-4 sm:px-6 lg:px-8"
            >
                  <Heading as="h1" size="5" weight="bold" align="center" color="bronze">
                        Welcome, {session?.user?.name || 'User'}!
                  </Heading>

                  <Flex
                        direction={{ initial: 'column', lg: 'row' }}
                        align="stretch"
                        justify="center"
                        gap="6"
                        className="w-full"
                  >
                        <Card
                              variant="surface"
                              className="flex-1 p-6 shadow-md min-w-[280px] sm:min-w-[360px] bg-[#F6EDEA]"
                        >
                              <Flex direction="column" align="center" gap="4">
                                    <Heading as="h2" size="4" weight="bold" color="bronze" align="center">
                                          Todo Completion Progress
                                    </Heading>
                                    <DonutChart completed={completedCount} pending={pendingTodos.length} />
                              </Flex>
                        </Card>

                        <Card
                              variant="surface"
                              className="flex-1 p-6 shadow-md min-w-[280px] sm:min-w-[360px] bg-[#F6EDEA]"
                        >
                              <Heading as="h2" size="4" weight="bold" color="bronze" className="mb-4">
                                    Pending Todos
                              </Heading>
                              {pendingTodos.length > 0 ? (
                                    <ul className="list-disc pl-5 space-y-2">
                                          {pendingTodos.map((todo) => (
                                                <li key={todo.id} className="text-sm font-medium text-brown hover:underline">
                                                      <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
                                                </li>
                                          ))}
                                    </ul>
                              ) : (
                                    <Text size="3" color="green" weight="medium">
                                          All todos are completed!
                                    </Text>
                              )}
                        </Card>
                  </Flex>
            </Flex>
      );
};

export default AuthenticatedView;