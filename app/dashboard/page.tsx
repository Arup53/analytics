import Link from "next/link";
import { redirect } from "next/navigation";

const Page = () => {
  redirect("/dashboard/projects");
};

export default Page;
