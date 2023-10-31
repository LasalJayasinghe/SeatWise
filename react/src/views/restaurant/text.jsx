<div className="ordercontainer">
<div className="menuContainer">
    <SettingsBar />
</div>
<div className="contentContainer">
    <div>
        <header className="bg-white shadow">
            <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Complaints</h1>
                <div className="loading-container">
                    {/* {loading && <p className="loading-text">Loading...</p>} */}
                </div>
            </div>
        </header>
    </div>
    <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        
    <div className="flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h1 className="mt-10 text-center text-4xl font-bold leading-12 tracking-tight text-gray-900">
           Request Assistance 
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
           Request Technical Assistance for your restaurant.
          </p>
        </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={onSubmit}
          className="space-y-1"
          action="#"
          method="POST"
        >
             {message && (
 <div className={`p-2 ${message.includes('Successfully') ? 'bg-green-500 text-white-300' : 'bg-red-200 text-white-800'}`}>
    {message}
  </div>
)}

            {errors && (
              <div className="alert">
                {Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            )}
        <div className="grid grid-cols-2 gap-2">

          <div>
            <label
              htmlFor="restaurantname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Restaurant Name
            </label>
            <div className="mt-1">
              <input
                ref={restaurantnameRef}
                id="restaurantname"
                name="restaurantname"
                type="text"
                required
                defaultValue={user.restaurantname}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="brn"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Business Registration No
            </label>
            <div className="mt-1">
              <input
                ref={brnRef}
                id="brn"
                name="brn"
                type="text"
                defaultValue={user.brn}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          </div>

          <div className="my-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Email address
            </label>
            <div className="mt-1">
              <input
                ref={emailRef}
                id="email"
                name="email"
                type="email"
                defaultValue={user.email}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>




          <div className="grid grid-cols-2 gap-2">

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Contact Person Name
            </label>
            <div className="mt-1">
              <input
                ref={nameRef}
                id="name"
                name="name"
                type="text"
                defaultValue={user.name}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Phone Number
            </label>
            <div className="mt-1">
              <input
                ref={phoneRef}
                id="phone"
                name="phone"
                type="text"
                defaultValue={user.phone}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

        
        

      

          </div>
          <div>
  <label
    htmlFor="priority"
    className="block text-sm font-medium leading-6 text-gray-900"
  >
    Priority
  </label>
  <div className="mt-2 flex items-center space-x-4">
  <label className="inline-flex items-center">
            <input
              type="radio"
              id="lowPriority"
              name="priority"
              value="low"
              checked={selectedPriority === 'low'} // Check if 'low' is selected
              onChange={handlePriorityChange} // Call the function when a radio button is clicked
              className="form-radio h-4 w-4 text-indigo-600"
            />
            <span className="ml-2">Low</span>
          </label>
          <label className="inline-flex items-center">
    <input
      type="radio"
      id="mediumPriority"
      name="priority"
      value="medium"
      checked={selectedPriority === 'medium'}
      onChange={handlePriorityChange}
      className="form-radio h-4 w-4 text-indigo-600"
    />
    <span className="ml-2">Medium</span>
  </label>
  <label className="inline-flex items-center">
    <input
      type="radio"
      id="highPriority"
      name="priority"
      value="high"
      checked={selectedPriority === 'high'}
      onChange={handlePriorityChange}
      className="form-radio h-4 w-4 text-indigo-600"
    />
    <span className="ml-2">High</span>
  </label>
  <label className="inline-flex items-center">
    <input
      type="radio"
      id="criticalPriority"
      name="priority"
      value="critical"
      checked={selectedPriority === 'critical'}
      onChange={handlePriorityChange}
      className="form-radio h-4 w-4 text-indigo-600"
    />
    <span className="ml-2">Critical</span>
  </label>
  </div>
</div>
          <div className="my-4">
            <label
              htmlFor="issue"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Describe your issue 
            </label>
            <div className="mt-1">
            <textarea
      ref={issueRef}
      id="issue"
      name="issue"
      rows="2" // You can adjust the number of rows as needed
      required
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    ></textarea>
            </div>
          </div>
          <br></br>     
         
<br></br>



      <br/>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            > Request
            </button>
          </div>
        </form>

        <br /> 

</div>
      </div>
    </div>

    </div>

    
    
</div>
</div>
