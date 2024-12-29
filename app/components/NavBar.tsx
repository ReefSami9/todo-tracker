'use client';
import classnames from 'classnames';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Button, Container, DropdownMenu, Flex } from '@radix-ui/themes';
import Logo from '../assets/Logo';
import { useState, useEffect } from 'react';
import { signOut, signIn } from 'next-auth/react';

const NavBar = () => {
      const currentPath = usePathname();
      const { status } = useSession();
      const router = useRouter();
      const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <nav className="border-b bg-gradient-to-r from-[#B98E7E] via-[#B98E7E] to-[#EFE4DF] text-white shadow-lg">
                  <Container>
                        <Flex justify="between" align="center" className="py-4 px-4 sm:px-6 md:px-8">
                              <Flex align="center" gap="2">
                                    <Link href="/">
                                          <div className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity">
                                                <Logo />
                                          </div>
                                    </Link>
                              </Flex>

                              <ul className="hidden md:flex items-center gap-6 lg:gap-8">
                                    {links.map((link) => (
                                          <li key={link.href}>
                                                <Link
                                                      href={link.href}
                                                      className={classnames(
                                                            'text-base font-medium transition-all duration-300',
                                                            {
                                                                  'text-white border-b-2 border-white pb-1': link.href === currentPath,
                                                                  'text-gray-200 hover:text-white hover:pb-1': link.href !== currentPath,
                                                            }
                                                      )}
                                                >
                                                      {link.label}
                                                </Link>
                                          </li>
                                    ))}
                              </ul>

                              <Flex align="center" gap="6">
                                    <AuthStatus />
                                    <div className="md:hidden">
                                          <Button
                                                variant="ghost"
                                                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                                                aria-label="Toggle Menu"
                                                className="text-white hover:opacity-90 transition-opacity"
                                          >
                                                <span className="text-white text-2xl">
                                                      {isMobileMenuOpen ? 'x' : '☰'}
                                                </span>
                                          </Button>
                                    </div>
                              </Flex>
                        </Flex>

                        {isMobileMenuOpen && (
                              <div className="md:hidden mt-4  rounded-lg shadow-lg px-4 py-3">
                                    <ul className="flex flex-col items-start gap-4">
                                          {links.map((link) => (
                                                <li key={link.href} className="w-full">
                                                      <Link
                                                            href={link.href}
                                                            onClick={() => setMobileMenuOpen(false)}
                                                            className={classnames(
                                                                  'block w-full text-base font-medium transition-all duration-300',
                                                                  {
                                                                        'text-white border-b-2 border-white pb-1': link.href === currentPath,
                                                                        'text-gray-200 hover:text-white hover:pb-1': link.href !== currentPath,
                                                                  }
                                                            )}
                                                      >
                                                            {link.label}
                                                      </Link>
                                                </li>
                                          ))}
                                    </ul>
                              </div>
                        )}
                  </Container>
            </nav>
      );
};

const AuthStatus = () => {
      const { status, data: session } = useSession();

      if (status === 'loading') return null;

      if (status === 'unauthenticated') {
            return (
                  <Button
                        onClick={() => signIn(undefined, { callbackUrl: '/' })}
                        variant="soft"
                        className="text-slate-50 hidden md:block hover:bg-white hover:text-[#C2A499] transition-colors duration-300"
                  >
                        Login
                  </Button>
            );
      }

      return (
            <Box>
                  <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                              <Avatar
                                    src={session?.user?.image || undefined}
                                    fallback="?"
                                    size="2"
                                    radius="full"
                                    className="cursor-pointer hover:scale-105 transition-transform hover:border-white"
                              />
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content className="p-3 bg-white shadow-lg rounded-lg">
                              <DropdownMenu.Label className="text-zinc-800 font-semibold">
                                    {session?.user?.email}
                              </DropdownMenu.Label>
                              <DropdownMenu.Item
                                    onSelect={() => signOut({ callbackUrl: '/' })}
                                    className="text-red-500 hover:bg-red-100 cursor-pointer px-3 py-2 rounded-lg transition-all"
                              >
                                    Logout
                              </DropdownMenu.Item>
                        </DropdownMenu.Content>
                  </DropdownMenu.Root>
            </Box>
      );
};

export default NavBar;
