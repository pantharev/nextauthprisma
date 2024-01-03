'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { updatePost } from '../lib/actions'
import PencilSquareIcon from '@heroicons/react/24/solid/PencilSquareIcon'

export default function EditPostModal({ id, content } : { id: number, content: string }) {
  let [isOpen, setIsOpen] = useState(false)


  const editPostById = updatePost.bind(null, id);

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  // functions to edit post
  // function editPostById() {
  //   editPost.bind(null, id);
  //   setIsOpen(false);
  // }

  return (
    <>
      <div className="inset-0 flex items-center justify-center">
        <button className="bg-yellow-300 rounded-md p-3 text-black" type="button" onClick={openModal}>
            <PencilSquareIcon className="h-6 w-6 text-black" />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit Post
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <form action={editPostById}>
                        <textarea rows={5} cols={50} name="content" placeholder={content} className="text-black border border-b-2 border-black overflow-hidden"></textarea>
                        <button type="submit" className="bg-blue-500 rounded-md p-3 hover:bg-blue-400 focus:ring-2 text-black">Edit</button>
                      </form>
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
