import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

//importing zod

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import user from "@/redux/user";

const changeSchema = z.object({
  email: z.string().email("Veuillez saisir une adresse e-mail valide"),
  name: z.string(),
});

//stating schema as type

export type ChangeSchemaType = z.infer<typeof changeSchema>;

export default function UserSpace() {
  //reading userInfos
  const userInfos = useSelector((state) => state.user.value);
  //declaring router const
  const router = useRouter();
  //redirecting if not connected

  useEffect(() => {
    if (!userInfos.isConnected) {
      router.push("/");
    }
  }, [userInfos.isConnected, router]);

  //handlIng modals apparitions

  const [showChangeModal, setShowChangeModal] = useState(false);

  //handling form with useForm

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangeSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(changeSchema),
    defaultValues: {
      name: userInfos.name,
      email: userInfos.mail,
    },
  });
  console.log(watch("email"));
  console.log(watch("name"));
  //handling submissions variables

  const onSubmit = (data: ChangeSchemaType) => {
    console.log("data to be sent:",  data);
  };

  return (
    <div>
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
        <div>
          <h1 className="text-xl font-medium text-black">Espace utilisateur</h1>
          <p className="text-gray-600">{userInfos.mail} </p>
          <p className="text-gray-600">{userInfos.name} </p>
          <button
            onClick={() => setShowChangeModal(true)}
            className="text-blue-600 underline"
          >
            Change user informations
          </button>
        </div>
      </div>
      {/* Mail modal */}
      {showChangeModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="mail" className="block font-medium text-gray-700">
                New mail
              </label>
              <input
                type="email"
                {...register("email")}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.email && (
                <span className="text-color4">{errors.email.message}</span>
              )}
              <label>New name</label>
              <input
                type="text"
                {...register("name")}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />

              <button
                type="submit"
                className="mt-2 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
