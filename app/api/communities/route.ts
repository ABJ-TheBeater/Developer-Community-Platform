import { NextResponse } from "next/server";
import connectMongo from "@/lib/Mongoose";
import Community from "@/models/Community";
import { auth } from "@/auth";
import { communitySchema } from "@/schemas/communitySchema";

export async function GET() {

    try {

        await connectMongo();

        const communities = await Community
            .find()
            .populate("members");

        return NextResponse.json(
            communities,
            { status: 200 }
        );

    } catch {

        return NextResponse.json(
            { error: "Failed to fetch communities." },
            { status: 500 }
        );

    }

}

export async function POST(
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

        const validated = communitySchema.parse(body);

        await connectMongo();

        const community = await Community.create({

            name: validated.name,

            slug: validated.name
                .toLowerCase()
                .trim()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]+/g, ""),

            category: validated.category,

            description: validated.description,

            members: [],

        });

        return NextResponse.json(
            community,
            { status: 201 }
        );

    } catch (error: any) {

        if (error.code === 11000) {

            return NextResponse.json(
                {
                    error: "A community with this name already exists.",
                },
                {
                    status: 409,
                }
            );

        }

        return NextResponse.json(
            {
                error: "Failed to create community.",
            },
            {
                status: 500,
            }
        );

    }

}