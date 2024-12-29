'use client';
import { Button, Flex, Heading, Text } from '@radix-ui/themes';
import Vector from '../assets/Vector';

const UnauthenticatedView = () => (
      <Flex
            direction={{ initial: 'column', lg: 'row' }}
            align="center"
            justify="center"
            className="mt-12 px-4 sm:px-6 lg:px-8 gap-8 text-center"
      >
            <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  className="max-w-md gap-4"
            >
                  <Heading as="h1" align="left" size="9" weight="bold" color="bronze">
                        Welcome to Todo Tracker!
                  </Heading>
                  <Text size="5" align="left" color="bronze" weight="regular">
                        Please log in to start managing and tracking your tasks with ease.
                  </Text>
                  <Button
                        size="3"
                        color="bronze"
                        onClick={() => window.location.href = '/api/auth/signin'}
                        className="flex w-full items-center gap-2 bg-bronze text-white hover:opacity-70 transition-opacity px-4 py-2 rounded-lg focus:cursor-pointer"
                  >
                        Log In
                  </Button>
            </Flex>

            <div className="flex justify-center items-center">
                  <div className="w-[250px] sm:w-[300px] lg:w-[500px]">
                        <Vector />
                  </div>
            </div>
      </Flex>
);

export default UnauthenticatedView;