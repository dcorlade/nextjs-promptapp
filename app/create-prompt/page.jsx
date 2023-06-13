'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form'
import Router from 'next/router';

const CreatePrompt = () => {
  const router = useRouter();
  const {data: session} = useSession();


  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })

  const createPrompt = async (e) => {
    e.preventDefault(); // dont reload when form is submitted
    setSubmitting(true);

    try {
      // post prompt to our api
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag
        })
      })

      if (response.ok) {
        router.push('/') // push to homepage
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false); //after submitting the prompt, setSubmitting to false
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