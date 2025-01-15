import { Button } from 'flowbite-react'
import Link from 'next/link'
import React from 'react'

const UserAction = () => {
    return (
        <>
            <Button outline>
                <Link href={'/session'}>Session</Link>
            </Button>
        </>
    )
}

export default UserAction