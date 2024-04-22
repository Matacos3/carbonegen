import IndividualFe from "../../components/IndividualFe";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

export default function feById() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Navbar />
      <IndividualFe id={id} />
    </div>
  );
}
