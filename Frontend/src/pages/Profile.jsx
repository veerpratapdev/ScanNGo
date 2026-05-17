function Profile() {

  const user = JSON.parse(localStorage.getItem('user'))

  return (

    <div className='min-h-screen bg-blue-50 p-8'>

      <div className='bg-white shadow-2xl rounded-2xl p-10 max-w-2xl mx-auto'>

        <h1 className='text-4xl font-bold text-blue-700 mb-8'>
          My Profile
        </h1>

        <div className='space-y-5 text-lg text-gray-700'>

          <div className='bg-blue-50 p-5 rounded-xl'>
            <p className='font-semibold text-blue-700 mb-1'>
              Name
            </p>

            <p>
              {user?.name}
            </p>
          </div>

          <div className='bg-blue-50 p-5 rounded-xl'>
            <p className='font-semibold text-blue-700 mb-1'>
              Email
            </p>

            <p>
              {user?.email}
            </p>
          </div>

          <div className='bg-blue-50 p-5 rounded-xl'>
            <p className='font-semibold text-blue-700 mb-1'>
              Account Type
            </p>

            <p>
              Customer
            </p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Profile