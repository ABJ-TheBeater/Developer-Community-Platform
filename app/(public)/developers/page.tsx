import connectMongo from "@/lib/Mongoose";
import User from "@/models/User";
import DeveloperCard from "@/components/developer-card";

export const revalidate = 60;

const Page = async () => {

    await connectMongo();

    const developers = await User.find().sort({
        name: 1,
    });

    return (

        <section className="max-w-6xl mx-auto px-6 py-8 space-y-4">

            <h1 className="text-4xl font-bold">
                Meet Our Developers
            </h1>

            <p className="text-gray-600">
                Discover the talented developers who are part of our vibrant community.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {developers.map((developer: any) => (

                    <DeveloperCard
                        key={developer._id}
                        name={developer.name}
                        username={developer.username}
                        bio={developer.bio}
                        title={developer.headline}
                    />

                ))}

            </div>

        </section>

    );

};

export default Page;