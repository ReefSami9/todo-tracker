'use client';
import classnames from 'classnames';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Button, Container, DropdownMenu, Flex } from '@radix-ui/themes';
import Logo from '../assets/Logo';
import { useEffect } from 'react';
import { signOut, signIn } from 'next-auth/react';


const NavBar = () => {
      const currentPath = usePathname();
      const { status } = useSession();
      const router = useRouter();

      useEffect(() => {
            if (status === 'unauthenticated') {
                  router.push('/');
            }
      }, [status, router]);

      const links = [
            { label: 'Dashboard', href: '/' },
            ...(status === 'authenticated' ? [{ label: 'Todos', href: '/todos' }] : []),
      ];
      return (
            <nav className='border-b mb-5 px-5 py-3'>
                  <Container>
                        <Flex justify='between'>
                              <Flex align='center' gap='3'>
                                    <Link href="/" >
                                          <Logo />
                                    </Link >
                                    <ul className='flex space-x-6'>
                                          {links.map(link => (
                                                <li key={link.href}>
                                                      <Link
                                                            className={classnames({
                                                                  'text-zinc-900': link.href === currentPath,
                                                                  'text-zinc-500': link.href !== currentPath,
                                                                  'hover:text-zinc-800 transition-colors': true
                                                            })}

                                                            href={link.href}>{link.label}</Link>
                                                </li>
                                          ))}
                                    </ul>
                              </Flex>
                              {<AuthStatus />}
                        </Flex>
                  </Container>
            </nav >
      )
}
const AuthStatus = () => {
      const { status, data: session } = useSession();
      if (status === 'loading') return null;
      if (status === 'unauthenticated')
            return <Button onClick={() => signIn(undefined, { callbackUrl: '/' })}>
                  Login
            </Button>
      return <Box>
            <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                        <Avatar
                              src={session!.user!.image!} fallback='?' size='2' radius='full' className='cursor-pointer hover:border-2' />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                        <DropdownMenu.Label>
                              {session!.user!.email}
                        </DropdownMenu.Label>
                        <DropdownMenu.Item onSelect={() => signOut({ callbackUrl: '/' })}>
                              Logout
                        </DropdownMenu.Item>
                  </DropdownMenu.Content>
            </DropdownMenu.Root>

      </Box>;
}

export default NavBar
