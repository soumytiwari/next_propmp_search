'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePrompt = () => {

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
