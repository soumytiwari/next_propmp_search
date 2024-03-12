'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  // all the variables that we can pass to our form
  // are we submitting our state?
  const [submitting, setSubmitting] = useState(false);
  // the post state with objects
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  useEffect(() => {
    const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${promptId}`)                     //  we get response by calling our own endpoints
        const data = await response.json();

        setPost({
            prompt: data.prompt,
            tag: data.tag,
        })
    }

    if(promptId)    getPromptDetails()
  }, [promptId])                //  it's gonna happen, whenever the 'promptId' changes

  // function to create prompt
  const updatePrompt = async (e) => {
    // this prevents the default behaviour of the browser when submitting the form which is to do a reload. we wanna reduce number of reloads possible so..
    e.preventDefault();
    setSubmitting(true);        //  we can use this as some sort of loader later on

    if(!promptId) return alert('Prompt ID not found')

    try{
      // -------------------  api-call  -----------------------
      // we're creating our own api call to do, to edit prompt, to submit it
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
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
    type="Edit"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt
