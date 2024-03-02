// the pages are rendered for server side for default. If we want any to be for client side.. we need to use the follwoing in start in that page.
'use client';

// this is going to allow us to move to other pages of our application
import Link from 'next/link';
import Image from 'next/image';         //  this will automatically optimize the images for us
import { useEffect, useState } from 'react';      // hooks
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';          //  these utility functions is gonna make our sigin, and signout flow simple
import Provider from './Provider';

const Nav = () => {

  const isUserLoggedIn = false;

  // when user is not logged in, we need to use sigin button, and for this we need.. providers
  // it is going to allow us to sigin using, google and next-auth <here, can more>
  const [ providers, setProviders] = useState(null);

  // set the providers using nextjs
  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    // not calling setProviders anywhere so here
    setProviders();
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link className="flex gap-2 flex-center" href="/" >
      <Image className="object-contain" src="/assets/images/logo.svg" alt='Prompt Palace Logo' width={30} height={30}></Image>
      {/* on smaller device, it won't show the logo name */}
      <p className="logo_text">Promp Palace</p>
      </Link>

      {/* Desktop Navigation */}
      {/* this means, on small devices it will be flex, otherwise usually hidden */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className='flex gap-3 md:gap-5'>
            <Link className='black_btn' href='/create=prompt'>
            Create Post
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image src='assets/images/profile.svg' width={37} height={37} className='rounded-full' alt='profile'></Image>
            </Link>

          </div>
        ): (
          <>
          {/* dynamic block of code */}
            {providers &&
              Object.values(providers).map((provider) => (
                <button 
                  className='black_btn' 
                  type='button' 
                  key={provider.name} 
                  onClick={ () => signIn(provider.id)}
                >
                  Sign In
                </button>
              )
            )
            }
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav

// '/' meaning the root route
// gap-3 md: gap-5 means, gap is 3 usually but in medium devices gap is 5
// providers provide sigin auth service using next for google apple github etc. 
// we can see the sigin option, when we fully setup the nextauth
