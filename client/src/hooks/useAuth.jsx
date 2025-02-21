import { AuthContext } from '@/provider/AuthProvider'
import { useContext } from 'react'

const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        return null
    }
    return context
}

export default useAuth