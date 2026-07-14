import React from 'react'
import Link from 'next/link';
const CommunityCard = ({ name, slug ,description, members }: { name: string; slug: string; description: string; members: number }) => {
  return (
    <div className="border rounded-xl bg-white p-5 space-y-3">
        <h2 className="text-xl text-black font-semibold">{name}</h2>
        <p className="text-gray-600">{description}</p>
        <p className="text-sm text-gray-500">{members} members</p>
        <Link href={`/communities/${slug}`} className="text-blue-500 hover:underline">View Community</Link>
        </div>
  )
}

export default CommunityCard