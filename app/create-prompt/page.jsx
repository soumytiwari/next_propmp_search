'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  // all the variables that we can pass to our form
  // are we submitting our state?
  const [submitting, setSubmitting] = useState(false);
  // the post state with objects
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  // function to create prompt
  const createPrompt = async (e) => {
    // this prevents the default behaviour of the browser when submitting the form which is to do a reload. we wanna reduce number of reloads possible so..
    e.preventDefault();
    setSubmitting(true);        //  we can use this as some sort of loader later on

    try{
      // -------------------  api-call  -----------------------
      // we're creating our own api call to do, to create post, to submit it
      const response = await fetch('/api/prompt/new', {
        // we're passing all the following data to the above '/api/prompt/new (this is the api we wanna call)' place.. using this #POST method
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag
        })
      }) 
      // ------------------ api-call  ------------------------

      if(response.ok) {
        router.push('/');
      }
    } catch(error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }


  return (
    <Form
    type="Create"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt
