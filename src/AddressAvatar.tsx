

import { createAvatar } from '@dicebear/core';
import { icons } from '@dicebear/collection';



export function AddressAvatar(props: { address: string, size: number }) {
    

    const avatar = createAvatar(icons, {
        seed: props.address,
        size: props.size
    });

    const svg = avatar.toString();
    return (
        <span
            className="avatar"
            dangerouslySetInnerHTML={{ __html: svg }}
        >
        </span>
    );
}