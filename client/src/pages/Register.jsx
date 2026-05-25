import { useState } from 'react'
import {
  useNavigate,
  Link,
} from 'react-router-dom'

import { motion } from 'framer-motion'

import api from '../services/api'

const Register = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'farmer',
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await api.post('/auth/register', form)

      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 flex items-center justify-center px-6 overflow-hidden relative'>
      
      {/* Floating Background */}
      <motion.div
        animate={{
          y: [0, -30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className='absolute top-0 left-0 w-96 h-96 bg-green-300 opacity-20 blur-3xl rounded-full'
      />

      <motion.div
        animate={{
          y: [0, 30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className='absolute bottom-0 right-0 w-96 h-96 bg-green-500 opacity-20 blur-3xl rounded-full'
      />

      {/* Main Container */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        className='relative z-10 w-full max-w-6xl bg-white/40 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-[40px] overflow-hidden grid lg:grid-cols-2'
      >
        
        {/* LEFT SIDE IMAGE */}
       {/* LEFT SIDE IMAGE */}
<div className='hidden lg:flex relative items-center justify-center bg-gradient-to-br from-green-700 to-green-500 p-14 overflow-hidden'>
  
  {/* Animated Ring */}
  <motion.div
    animate={{
      rotate: 360,
    }}
    transition={{
      repeat: Infinity,
      duration: 25,
      ease: 'linear',
    }}
    className='absolute w-[420px] h-[420px] border border-white/10 rounded-full'
  />

  {/* Image Container */}
  <motion.div
    initial={{
      opacity: 0,
      y: 30,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    transition={{
      duration: 1,
    }}
    className='relative z-10 flex flex-col items-center'
  >
    <img
      src='https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop'
      alt='Farmer'
      className='w-[340px] h-[420px] object-cover rounded-[32px] shadow-2xl'
    />

    {/* Text */}
    <div className='mt-8 text-center text-white max-w-sm'>
      <h1 className='text-4xl font-black leading-tight'>
        Smart Farming
      </h1>

      <p className='mt-4 text-sm text-green-100 leading-7'>
        AI-powered agriculture and smart
        logistics platform helping farmers
        manage crops and deliveries efficiently.
      </p>
    </div>
  </motion.div>
</div>

        {/* RIGHT SIDE FORM */}
        <div className='flex justify-center items-center p-6 md:p-12'>
          
          <motion.form
            onSubmit={handleSubmit}
            initial={{
              opacity: 0,
              x: 50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className='w-full max-w-sm'
          >
            
            {/* Logo */}
            <motion.h1
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className='text-4xl font-black text-green-700 mb-2'
            >
              AgriLink AI
            </motion.h1>

            <p className='text-gray-500 text-sm mb-8'>
              Create your smart farming account
            </p>

            {/* Inputs */}
            <div className='space-y-4'>
              
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type='text'
                name='name'
                placeholder='Full Name'
                onChange={handleChange}
                className='w-full bg-white/70 border border-gray-200 p-4 rounded-2xl outline-none text-sm focus:border-green-500 transition-all shadow-sm'
              />

              <motion.input
                whileFocus={{ scale: 1.02 }}
                type='email'
                name='email'
                placeholder='Email Address'
                onChange={handleChange}
                className='w-full bg-white/70 border border-gray-200 p-4 rounded-2xl outline-none text-sm focus:border-green-500 transition-all shadow-sm'
              />

              <motion.input
                whileFocus={{ scale: 1.02 }}
                type='password'
                name='password'
                placeholder='Password'
                onChange={handleChange}
                className='w-full bg-white/70 border border-gray-200 p-4 rounded-2xl outline-none text-sm focus:border-green-500 transition-all shadow-sm'
              />

              <motion.select
                whileFocus={{ scale: 1.02 }}
                name='role'
                onChange={handleChange}
                className='w-full bg-white/70 border border-gray-200 p-4 rounded-2xl outline-none text-sm focus:border-green-500 transition-all shadow-sm'
              >
                <option value='farmer'>
                  Farmer
                </option>

                <option value='admin'>
                  Admin
                </option>
              </motion.select>
            </div>

            {/* Buttons */}
            <div className='space-y-4 mt-8'>
              
              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className='w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-2xl text-sm font-semibold shadow-xl transition-all'
              >
                Create Account
              </motion.button>

              <Link to='/'>
                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  type='button'
                  className='w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl text-sm font-semibold shadow-xl transition-all'
                >
                  Back To Login
                </motion.button>
              </Link>
            </div>

            {/* Footer */}
            <motion.p
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className='text-xs text-center text-gray-400 mt-8'
            >
              Future of Agriculture & Rural Logistics
            </motion.p>
          </motion.form>
        </div>
      </motion.div>
    </div>
  )
}

export default Register