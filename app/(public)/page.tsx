import Link from "next/link"

const page = () => {
	return(
		<section className="space-y-6">
			<h1 className="text-3xl font-bold">Welcome to Developer Community Platform</h1>
			<p className="text-gray-600">Connect with developers, join communities, and share your knowledge.</p>
			<div>
				<h2 className="text-2xl font-semibold">Get Started</h2>
				<p className="text-gray-600">Explore our communities and find developers to connect with.</p>
				<Link href="/communities" className="text-blue-500 hover:underline">Browse Communities</Link>
				<Link href="/developers" className="text-blue-500 hover:underline ml-4">Browse Developers</Link>	
			</div>
		</section>
	)
}
export default page