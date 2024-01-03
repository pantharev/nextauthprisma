import { useState } from 'react';

export default function EditPostModall({ post }: { post: string }) {
    const [showModal, setShowModal] = useState(true);

    return (
        <>
            <p>{post}</p>
        </>
    )
}