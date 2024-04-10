
import IndividualFe from "../../components/IndividualFe";
import { useRouter } from "next/router"

export default function feById(){
  const router = useRouter()
  const { id } = router.query
  return(
    <div>

      <IndividualFe id={id}/>
    </div>
  )
}