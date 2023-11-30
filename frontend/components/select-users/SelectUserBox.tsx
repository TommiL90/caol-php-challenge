import { Consultant } from '@/functions/retrieve-consultants'
import React from 'react'

interface SelectedUserBoxProps {
  title: string
  listUsers: Consultant[]
  selectedUsers: Consultant[]
  handleUserClick: (user: Consultant) => void
}
const SelectUserBox = ({
  title,
  listUsers,
  selectedUsers,
  handleUserClick,
}: SelectedUserBoxProps) => {
  return (
    <div className="h-24 w-1/2">
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>
      <ul className="h-24 overflow-auto border border-muted">
        {listUsers.map((user) => (
          <li
            key={user.no_usuario}
            className={`flex cursor-pointer items-center justify-between py-1 ${
              selectedUsers.includes(user) ? 'bg-gray-200' : ''
            }`}
            onClick={() => handleUserClick(user)}
          >
            <span>{user.no_usuario}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SelectUserBox
