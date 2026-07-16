import { NextResponse } from "next/server";
import connectMongo from "@/lib/Mongoose";
import User from "@/models/User";
import { auth } from "@/auth";
import { profileSchema } from "@/schemas/profileSchema";

export async function GET() {

    try {

        const session = await auth();

        if (!session?.user?.email) {

            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );

        }

        await connectMongo();

        const user = await User.findOne({
            email: session.user.email,
        });

        if (!user) {

            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );

        }

        return NextResponse.json(
            user,
            { status: 200 }
        );

    } catch (error) {

        return NextResponse.json(
            { error: "Failed to fetch profile" },
            { status: 500 }
        );

    }

}

export async function PATCH(
    request: Request
) {

    try {

        const session = await auth();

        if (!session?.user?.email) {

            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );

        }

        const body = await request.json();

        const validated =
            profileSchema.parse(body);

        await connectMongo();

        const updatedUser =
            await User.findOneAndUpdate(

                {
                    email: session.user.email,
                },

                {
                    name: validated.name,
                    headline: validated.headline,
                    bio: validated.bio,
                    github: validated.github,
                    linkedin: validated.linkedin,
                    skills: validated.skills || [],
                },

                {
                    new: true,
                }

            );

        return NextResponse.json(
            updatedUser,
            { status: 200 }
        );

    } catch (error) {

        return NextResponse.json(
            { error: "Failed to update profile" },
            { status: 500 }
        );

    }

}