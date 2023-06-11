"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Profile from '@components/Profile';

const UserProfile = ({ params }) => {
    //http://localhost:3000/profile/64734c55bea88c2aa0d7c518?name=kattarajkishore

    const searchParams = useSearchParams();
    const userName = searchParams.get('name');
    const pathName = usePathname();
    const userId = pathName.replace('/profile/', "")

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params?.id}/posts`);
            const data = await response.json();
            setPosts(data)
        }

        if (userId)
            fetchPosts();
    }, [])

    return (
        <Profile
            name={userName}
            desc={`Welcome to ${userName}'s profile page. Explore exceptional prompts and be inspired by the power of their imagination.`}
            data={posts}
        />

    )
}

export default UserProfile