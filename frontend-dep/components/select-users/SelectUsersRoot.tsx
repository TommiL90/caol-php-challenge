import React, { ReactNode } from 'react'

interface SelectUsersRootProps {
  children: ReactNode
}
const SelectUsersRoot = ({ children }: SelectUsersRootProps) => {
  return (
    <div className="container mx-auto flex h-60 justify-between py-8">
      {children}
    </div>
  )
}

export default SelectUsersRoot
