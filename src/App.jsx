import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [dispatch])

  return !loading ? (
    <div className='max-h-screen flex flex-wrap bg-gray-400 content-between'>
      <div className='w-full block'>
        <Header />
         <main>
          {/* TODO: <Outlet /> */}
         </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
