import { signIn, signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

import Button from './Button'
import Link from './Link'
import LoadingSpinner from './LoadingSpinner'

interface LoginViewProps {
  message: string
}

const LoginView = ({ message }: LoginViewProps) => {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState<boolean>()
  const onSignIn = async () => {
    setIsLoading(true)
    await signIn()
    setIsLoading(false)
  }

  return (
    <div className="prose dark:prose-dark lg:prose-xl">
      {session?.user ? (
        <div>
          Logged in as <strong>{session.user.name}</strong>{' '}
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <Link
              className="font-semibold"
              href="api/auth/signout"
              onClick={async (e) => {
                e.preventDefault()
                setIsLoading(true)
                await signOut()
                setIsLoading(false)
              }}
            >
              Logout
            </Link>
          )}
        </div>
      ) : (
        <div className="mb-10 border-2 border-primary-400 dark:border-primary-600 rounded-md p-6">
          <h5 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
            {message}
          </h5>
          <Button onClick={onSignIn}>
            {isLoading ? <LoadingSpinner /> : 'Login'}
          </Button>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Your information is only used to display your name and profile
            picture.
          </p>
        </div>
      )}
    </div>
  )
}

export default LoginView
