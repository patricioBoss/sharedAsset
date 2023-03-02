import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { useSWRConfig } from "swr";

export default function ComingSoonModal({ open, setOpen, user }) {
  const [loading, setLoading] = useState();
  const url = `/api/user/${user._id}`;
  const { mutate } = useSWRConfig();
  const handleRedeemBonus = (bonus) => {
    setLoading(true);
    axios
      .post(`/api/user/${user._id}/bonus`, { bonus })
      .then(function (res) {
        setLoading(false);
        mutate(url);
        setOpen(false);
        toast.success(res.data.message);
      })
      .catch(function (err) {
        setLoading(false);
        if (err.response) {
          toast.error("error redeeming bonus");
        } else {
          toast.error(err.message);
        }
      });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[1201]" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[28rem] sm:p-6">
                <div className="w-full flex flex-col justify-center items-center p-6 text-center">
                  {user.bonus ? (
                    <>
                      <img
                        src="/img/gift-celebrate.svg"
                        className="w-full sm:w-[90%]"
                        alt="illustration"
                      />
                      <h2 className=" font-bold text-green-600 text-2xl md:text-4xl mt-2">
                        Redeem Gift Price
                      </h2>
                      <div className="mt-7">
                        <LoadingButton
                          loading={loading}
                          variant="contained"
                          onClick={() => handleRedeemBonus(user.bonus)}
                        >
                          Redeem Bonus
                        </LoadingButton>
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src="/img/empty-box.svg"
                        className="w-full sm:w-[90%]"
                        alt="illustration"
                      />
                      <h2 className=" font-bold text-gray-600 text-2xl md:text-4xl mt-2">
                        No Bonus Price
                      </h2>
                      <div className="mt-7">
                        <Button
                          variant="contained"
                          onClick={() => setOpen(false)}
                        >
                          Close
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
