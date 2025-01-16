'use client'
import { Dropdown } from 'flowbite-react'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from 'react-icons/ai'
import { HiCog, HiUser } from 'react-icons/hi2'

type UserActionProps = {
    user: User
}

const UserAction = ({ user }: UserActionProps) => {
    const router = useRouter();
    return (
        <>
            <Dropdown
                inline
                label={`Welcome ${user.name}`}
            >
                <Dropdown.Item icon={HiUser}>
                    <Link href={`/`}>
                        My auction
                    </Link>
                </Dropdown.Item>
                <Dropdown.Item icon={AiFillTrophy}>
                    <Link href={`/`}>
                        Auction won
                    </Link>
                </Dropdown.Item>
                <Dropdown.Item icon={AiFillCar}>
                    <Link href={`/`}>
                        Sell my car
                    </Link>
                </Dropdown.Item>
                <Dropdown.Item icon={HiCog}>
                    <Link href={`/session`}>
                        Session (dev only)
                    </Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item icon={AiOutlineLogout} onClick={() => signOut({ callbackUrl: '/' })}>
                    SignOut
                </Dropdown.Item>
            </Dropdown>
        </>
    )
}

export default UserAction