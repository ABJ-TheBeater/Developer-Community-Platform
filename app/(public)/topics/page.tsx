import {topics} from '@/data/topics'
const page = () => {
    return (
       <section className="space-y-3">
        <h1 className="text-4xl font-bold">Explore Topics</h1>
        <p className="text-gray-600">Discover trending topics and discussions in the developer community.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
                <div key={topic} className="border rounded-xl bg-white p-5 space-y-3">
                    <h2 className="text-xl text-black font-semibold">{topic}</h2>
                    </div>
            ))}
        </div>
       </section>
    )
}

export default page