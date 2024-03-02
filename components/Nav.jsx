'use client';

// this is going to allow us to move to other pages of our application
import Link from 'next/link';
import Image from 'next/image';         //  this will automatically optimize the images for us
import { useEffect, useState } from 'react';      // hooks
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';          //  these utility functions is gonna make our sigin, and signout flow simple

const Nav = () => {

  const isUserLoggedIn = true;

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

          </>
        )}
      </div>
    </nav>
  )
}

export default Nav

// '/' meaning the root route
// gap-3 md: gap-5 means, gap is 3 usually but in medium devices gap is 5