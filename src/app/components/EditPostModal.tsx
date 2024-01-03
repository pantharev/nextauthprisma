import { useState } from 'react';

export default function EditPostModal() {
    const [showModal, setShowModal] = useState(true);

    return (
        <>
            <Modal isOpen={true}>
                <h1>This is the Edit Post Modal</h1>
            </Modal>
        </>
    )
}