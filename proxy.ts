import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((request) => {

    const isLoggedIn = !!request.auth;

    const pathname = request.nextUrl.pathname;

    if (

        !isLoggedIn &&

        (
            pathname.startsWith("/blogs/new") ||

            pathname.startsWith("/profile/edit")
        )

    ) {

        return NextResponse.redirect(
            new URL("/login", request.url)
        );

    }

    return NextResponse.next();

});

export const config = {

    matcher: [

        "/blogs/new",

        "/profile/edit",

    ],

};