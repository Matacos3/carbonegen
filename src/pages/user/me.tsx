import { useSelector } from "react-redux"

export default function userSpace(){
  //reading userInfos
  const userInfos = useSelector(state => state.user.value)


  return(
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div>
        <h1 className="text-xl font-medium text-black">Espace utilisateur</h1>
        <p className="text-gray-600">{userInfos.mail}</p>
        <p className="text-gray-600">{userInfos.name}</p>
      </div>
    </div>
  )
}