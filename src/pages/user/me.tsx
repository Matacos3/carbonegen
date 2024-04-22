import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useUser from "../../data/use-user";

//importing zod

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const changeSchema = z.object({
  email: z.string().email("Veuillez saisir une adresse e-mail valide"),
  name: z.string(),
});

//stating schema as type

export type ChangeSchemaType = z.infer<typeof changeSchema>;

export default function UserSpace() {
  //declaring router const
  const router = useRouter();
  //importing states from useUser
  const { user, loading, loggedOut, mutate } = useUser("1");

  //redirecting if not connected

  useEffect(() => {
    // If user is not logged in, redirect to "/"
    if (loggedOut) {
      console.log("the use effect is triggered because your are logged out");
      router.push("/");
    }

    console.log("voici les changements de user", user);
  }, [user, loggedOut]);
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
  });

  console.log(watch("email"));
  console.log(watch("name"));
  //handling submissions variables

  const onSubmit = (data: ChangeSchemaType) => {
    setShowChangeModal(false)
    console.log("data to be sent:", data);
    fetch("http://localhost:3000/api/users/edit",{
      method:"POST",
      body: JSON.stringify(data),
      headers:{"Content-Type":"application/json"}
    })
    .then(response => response.json())
    .then(data=>{
      console.log(data);
      localStorage.setItem("token",data.token)
      mutate()
    })
  };

  return (
    <div>
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
        <div>
          <h1 className="text-xl font-medium text-black">Espace utilisateur</h1>
          <p className="text-gray-600">
            Votre adresse mail : {user ? user.userData.payload.email : "error"}
          </p>
          <p className="text-gray-600">
            {" "}
            Votre nom : {user ? user.userData.payload.name : "error"}
          </p>
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
          <div className=" relative bg-white p-6 rounded-lg shadow-lg">
            <div className="cursor-pointer absolute left-1 top-1" onClick={()=>setShowChangeModal(false)}>
              x
            </div>
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
