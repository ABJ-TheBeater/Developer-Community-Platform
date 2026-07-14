import React from 'react'
import {developers} from '@/data/developers';
import DeveloperCard from '@/components/developer-card';
const page = () => {
  return (
    <section className="space-y-3">
        <h1 className="text-4xl font-bold">Meet Our Developers</h1>
        <p className="text-gray-600">Discover the talented developers who are part of our vibrant community.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developers.map((developer) => (
                <DeveloperCard key={developer.username} {...developer} />))}
        </div>
    </section>
  )
}

export default page