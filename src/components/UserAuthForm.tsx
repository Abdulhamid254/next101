"use client" // changing it from server component to client component to enable interactivity
import { FC, useState } from 'react'
import { Button } from './ui/Button'
import { cn } from '@/lib/utils'
import { signIn} from "next-auth/react"
import { Icons } from './Icons'
import { useToast } from '@/hooks/use-toast'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement>{
 
}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props}) => {
  // keeping track of the user state when he logs in
  const [ isloading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast();
  // loggin functionality
  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
        await signIn('google')
    } catch (error) {
       
        toast({
            title: 'There was a problem',
            description: 'There was an error logging in with Google',
            variant: 'destructive',
        })
    } finally {
        setIsLoading(false)
    }
  }
  
    return (
  <div className={cn('flex justify-center', className)} {...props}>
    <Button  onClick={loginWithGoogle} isLoading={isloading} size='sm' className='w-full'>
        {isloading ? null : <Icons.google className='h-4 w-4 mr-2 '/>}
        Google
    </Button>
  </div>
  )
}

export default UserAuthForm