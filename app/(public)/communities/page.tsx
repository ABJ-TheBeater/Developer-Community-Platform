import connectMongo from "@/lib/Mongoose";
import Community from "@/models/Community";
import CommunityCard from "@/components/community-card";
import User from "@/models/User";
import { auth } from "@/auth";

export const revalidate = 60;

type Props = {
    searchParams: Promise<{
        search?: string;
    }>;
};

export default async function CommunitiesPage({
    searchParams,
}: Props) {

    const { search } = await searchParams;

    await connectMongo();

    const session = await auth();

    let currentUser = null;

    if (session?.user?.email) {

        currentUser = await User.findOne({
            email: session.user.email,
        });

    }

    const query = search
        ? {
              name: {
                  $regex: search,
                  $options: "i",
              },
          }
        : {};

    const communities = await Community.find(query).lean();

    return (

        <main className="max-w-5xl mx-auto px-6 py-10">

            <h1 className="text-3xl font-bold mb-8">
                Communities
            </h1>

            <form className="mb-8">

                <input
                    type="text"
                    name="search"
                    defaultValue={search}
                    placeholder="Search communities..."
                    className="w-full border rounded-lg px-4 py-2"
                />

            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {communities.length === 0 ? (

                    <p>No communities found.</p>

                ) : (

                    communities.map((community: any) => (

                        <CommunityCard
                            key={community._id}
                            name={community.name}
                            slug={community.slug}
                            category={community.category}
                            description={community.description}
                            members={community.members}
                            joined={
                                currentUser
                                    ? community.members.some(
                                          (member: any) =>
                                              member.toString() ===
                                              currentUser._id.toString()
                                      )
                                    : null
                            }
                        />

                    ))

                )}

            </div>

        </main>

    );

}