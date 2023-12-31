import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import axiosClent from '../axios-client';
import { useStateContext } from '../context/ContextProvider';

export default function Example() {
  const [open, setOpen] = useState(true)
  const [complaintTitle, setComplaintTitle] = useState(''); // Define complaintTitle state
  const [complaintDescription, setComplaintDescription] = useState(''); // Define complaintDescription state
  const cancelButtonRef = useRef(null)
  const {user} = useStateContext();
  const userId = user ? user.id : null;

  const handleSubmit = async () => {
    try {
      const response = await axiosClent.post('/complaints', {
        title: complaintTitle,
        description: complaintDescription,
        user_id: userId, // Include the user_id in the POST request
        // Other complaint data as needed
      });
  
      // Handle success, e.g., close the modal
      console.log('Complaint submitted:', response.data);
      setOpen(false);
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error('Error submitting complaint:', error);
    }
  };
  const handleTitleChange = (event) => {
    setComplaintTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setComplaintDescription(event.target.value);
  };


  

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    {/* <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="w-6 h-6 text-red-600" aria-hidden="true" />
                    </div> */}
                    <div className="mt-3 sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="mb-10 text-lg font-semibold leading-6 text-center text-gray-900">
                        Add complaint
                      </Dialog.Title>
                      <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="complaintTitle">
            Title
          </label>
          <input
            id="complaintTitle"
            type="text"
            value={complaintTitle} // Bind value to state
            onChange={handleTitleChange} // Handle input change
            className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:ring-green-300 focus:border-green-500 focus:border-2"
            placeholder="Brief title for your complaint..."
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="complaintDescription">
            Description
          </label>
          <textarea
            id="complaintDescription"
            name="complaintDescription"
            value={complaintDescription} // Bind value to state
            onChange={handleDescriptionChange} // Handle input change
            rows={3}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
            defaultValue={''}
          />
        </div>
                      <div className="mt-2">
                        <p className="text-sm text-justify text-gray-500">
                        Please describe the issue you're facing in as much detail as possible. Our team will prioritize this matter and work diligently to resolve it as soon as possible. Your feedback is important to us.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-green-500 rounded-md shadow-sm hover:bg-green-600 sm:ml-3 sm:w-auto"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}