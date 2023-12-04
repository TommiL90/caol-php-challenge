'use client'
import { api } from '@/services/api'
import { Client } from '@/types/clients'
import { useEffect, useState } from 'react'

const useClients = () => {
  const [availableUsers, setAvailableUsers] = useState<Client[]>([])
  const [selectedUsers, setSelectedUsers] = useState<Client[]>([])
  const [movedUsers, setMovedUsers] = useState<Client[]>([])
  const handleUserClick = (user: Client) => {
    
    if (selectedUsers.includes(user)) {
      const updatedSelectedUsers = selectedUsers.filter((u) => u !== user)
      setSelectedUsers(updatedSelectedUsers)
    } else {
      setSelectedUsers([...selectedUsers, user])
    }
  }

  const handleMove = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setAvailableUsers([...availableUsers, ...selectedUsers])
      const updatedMovedUsers = movedUsers.filter(
        (user) => !selectedUsers.includes(user),
      )
      setMovedUsers(updatedMovedUsers)
    } else {
      setMovedUsers([...movedUsers, ...selectedUsers])
      const updatedAvailableUsers = availableUsers.filter(
        (user) => !selectedUsers.includes(user),
      )
      setAvailableUsers(updatedAvailableUsers)
    }
    setSelectedUsers([])
  }

  useEffect(() => {
    const retrieveUser = async () => {
      try {
        const response = await api('clients')
        const data: Client[] = response.data
        setAvailableUsers(data)
      } catch (error) {
        console.error(error)
      }
    }
    retrieveUser()
  }, [])

  return {
    availableUsers,
    selectedUsers,
    movedUsers,
    handleUserClick,
    handleMove,
  }
}

export default useClients
