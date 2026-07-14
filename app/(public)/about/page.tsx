import React from 'react'

const page = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-10 space-y-6">
        <h1 className="text-3xl font-bold">About Developer Community Platform</h1>
        <p className="text-gray-600">Developer Community Platform is a place for developers to connect, share knowledge, and grow together. Our mission is to foster a vibrant community where developers can find support, collaborate on projects, and stay updated with the latest trends in technology.</p>
        <h2 className="text-2xl font-semibold">Our Features</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><strong>Communities:</strong> Join or create communities based on your interests and expertise.</li>
            <li><strong>Developer Profiles:</strong> Showcase your skills, projects, and connect with other developers.</li>
            <li><strong>Topics:</strong> Follow topics to stay updated on the latest trends and discussions in the developer world.</li>
            <li><strong>Events:</strong> Participate in events, webinars, and workshops hosted by the community.</li>
        </ul>
        <p className="text-gray-600">Whether you're a beginner looking for guidance or an experienced developer seeking collaboration, Developer Community Platform is here to support you on your journey. Join us today and be part of a thriving community of developers!</p>
  
  </section>)
}

export default page