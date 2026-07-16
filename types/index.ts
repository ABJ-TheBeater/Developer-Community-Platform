export interface UserResponse {
    _id: string;
    name: string;
    email: string;
    username: string;
    image: string;
    bio: string;
    headline: string;
    github: string;
    linkedin: string;
    skills: string[];
}

export interface BlogResponse {
    _id: string;
    title: string;
    content: string;
    tags: string[];
    createdAt: string;

    author: {
        _id: string;
        name: string;
        username: string;
    };
}

export interface CommunityResponse {
    _id: string;
    name: string;
    slug: string;
    category: string;
    description: string;
    members: UserResponse[];
}

export interface BlogPayload {
    title: string;
    content: string;
    tags: string[];
}

export interface CommunityPayload {
    name: string;
    description: string;
    category: string;
}

export interface ProfilePayload {
    name: string;
    headline?: string;
    bio?: string;
    github?: string;
    linkedin?: string;
    skills?: string[];
}