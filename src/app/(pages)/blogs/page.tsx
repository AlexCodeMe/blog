import { getAllPosts } from '@/lib/db'
import React from 'react'

export default async function BlogsPage() {
  const allPosts = await getAllPosts()
  if (!allPosts.success) {
    console.log('!allPosts.success')

    return <div>Error: {allPosts.error}</div>
  }

  return (
    <div>
      {allPosts?.posts.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}
