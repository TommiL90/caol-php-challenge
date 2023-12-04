'use client'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import React, { useContext } from 'react'
import { Button } from '@/components/ui/button'
import SelectUserClientBox from './SelectUserBoxClients'
import { ClientsContext } from '@/contexts/client-context'

const SelectUserBodyClients = () => {
  const {
    availableUsers,
    selectedUsers,
    handleUserClick,
    handleMove,
    movedUsers,
  } = useContext(ClientsContext)
  return (
    <>
      <div className="flex h-min justify-between space-x-4 md:w-3/6">
        <SelectUserClientBox
          title="Disponíveis"
          listUsers={availableUsers}
          selectedUsers={selectedUsers}
          handleUserClick={handleUserClick}
        />
        <div className="flex h-full w-max flex-col items-center justify-center gap-4 p-8">
          <Button
            onClick={() => handleMove('left')}
            className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
            disabled={movedUsers.length === 0}
          >
            <ArrowLeftIcon />
          </Button>
          <Button
            onClick={() => handleMove('right')}
            className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
            disabled={selectedUsers.length === 0}
          >
            <ArrowRightIcon />
          </Button>
        </div>
        <SelectUserClientBox
          title="Selecionados"
          listUsers={movedUsers}
          selectedUsers={selectedUsers}
          handleUserClick={handleUserClick}
        />
      </div>
    </>
  )
}

export default SelectUserBodyClients
