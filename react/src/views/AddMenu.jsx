

export default function AddMenu() {
  return (
    <>
      <header className="bg-white shadow">
        <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Add Menu</h1>
            <div className="loading-container">
                {/* {loading && <p className="loading-text">Loading...</p>} */}
            </div>
        </div>
        </header>
        <main>
            <div className="mx-auto max-w-5xl py-6 sm:px-6 lg:px-8">

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
                
                <div className="flex mr-10">

                <div className="mt-0 sm:w-full sm:max-w-sm ml-2">

                <form className="space-y-3" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Meal ID
                        </label>
                        <div className="mt-1">
                            <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="#1234"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                        </div>
                        <div className="mt-1">
                            <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Name the meal"
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Category
                        </label>
                        <div className="mt-1">
                            <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Select 1 or more categories"
                            autoComplete="email"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Price
                        </label>
                        <div className="mt-1">
                            <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="LKR"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Description
                        </label>
                        <div className="mt-1">
                            <textarea
                            id="email"
                            name="email"
                            type="email"
                            placeholder="   Add note"
                            autoComplete="email"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                    {/* <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign in
                    </button> */}
                    </div>
                </form>
                </div>

                <div className="add-menu"> 
                    <div className="text-slate-700 text-sm font-medium leading-tight">Image</div>
                    
                    {/* <div className="w-[196px] h-[196px] bg-zinc-100 rounded-[10px]" /> */}
                    {/* <img className="w-[110px] h-[110px]" src="https://via.placeholder.com/110x110" /> */}
                    <div className="w-[37px] h-[37px] relative" />
                    <div className="w-[195px] h-[135px] bg-gradient-to-b from-white to-white rounded-[10px] mb-10">
                        <img src="src/assets/download.png" alt="" />
                        <div style={{ position: 'relative' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" className="w-8 h-8" style={{ position: 'absolute', top: '50%', left: '100%', transform: 'translate(-50%, -50%)' }}>
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    
                    <div className="mt-20 w-[195px] h-[90px] rounded-lg justify-end items-start inline-flex">
                        <div className="mt-10 px-5 py-3 bg-zinc-900 rounded-lg shadow justify-center items-center gap-2 flex">
                            <div className="text-white text-s font-semibold leading-5">Add meal</div>
                        </div>
                    </div>
                </div>
                </div>

            </div>

            </div>
        </main>
    </>
  )
}
