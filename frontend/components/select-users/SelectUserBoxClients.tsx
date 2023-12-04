import { Client } from '@/functions/retrieve-clients'
import React from 'react'

interface SelectedUserClientBoxProps {
  title: string
  listUsers: Client[]
  selectedUsers: Client[]
  handleUserClick: (user: Client) => void
}
const SelectUserClientBox = ({
  title,
  listUsers,
  selectedUsers,
  handleUserClick,
}: SelectedUserClientBoxProps) => {
  return (
    <div className="h-24 w-1/2">
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>
      <ul className="h-24 overflow-auto border border-muted">
        {listUsers.map((user) => (
          <li
            key={user.co_cliente}
            className={`flex cursor-pointer items-center justify-between py-1 ${
              selectedUsers.includes(user) ? 'bg-gray-200' : ''
            }`}
            onClick={() => handleUserClick(user)}
          >
            <span>{user.no_fantasia}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SelectUserClientBox
