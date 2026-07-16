import { NextResponse } from "next/server";
import connectMongo from "@/lib/Mongoose";
import Community from "@/models/Community";
import User from "@/models/User";
import { auth } from "@/auth";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(
    request: Request,
    { params }: Props
) {

    try {

        const { id } = await params;

        await connectMongo();

        const community = await Community
            .findById(id)
            .populate("members");

        if (!community) {

            return NextResponse.json(
                { error: "Community not found" },
                { status: 404 }
            );

        }

        return NextResponse.json(
            community,
            { status: 200 }
        );

    } catch {

        return NextResponse.json(
            { error: "Failed to fetch community" },
            { status: 500 }
        );

    }

}

export async function PATCH(
    request: Request,
    { params }: Props
) {

    try {

        const session = await auth();

        if (!session?.user?.email) {

            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );

        }

        const { id } = await params;

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

        const community = await Community.findById(id);

        if (!community) {

            return NextResponse.json(
                { error: "Community not found" },
                { status: 404 }
            );

        }

        const alreadyJoined = community.members.some(
            (member: any) =>
                member.toString() === user._id.toString()
        );

        if (alreadyJoined) {

            community.members = community.members.filter(
                (member: any) =>
                    member.toString() !== user._id.toString()
            );

        } else {

            community.members.push(user._id);

        }

        await community.save();

        return NextResponse.json(
            community,
            { status: 200 }
        );

    } catch {

        return NextResponse.json(
            { error: "Failed to update community" },
            { status: 500 }
        );

    }

}