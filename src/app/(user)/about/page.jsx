import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMailOpenSharp } from "react-icons/io5";

export default function About() {

  const imgUrl = "https://res.cloudinary.com/ddfimjibr/image/upload/v1747958541/developerpalakbasak/kckvjxi1tvtxxgzowf63.jpg"

  return (
    <>
    <div className="mt-20 h-[80vh] flex flex-col gap-6 justify-center items-center relative">
      <Image src={imgUrl} alt="https://github.com/developerpalakbasak" height={300} width={300} className="rounded-full"/>
      <span className="flex gap-3 justify-center items-center">
        <FaLinkedin size={30} /> 
      <Link href="https://www.linkedin.com/in/palak-basak-a05510208/" target="_blank" className="font-semibold text-xl">developerpalakbasak</Link>
      </span>
      <span className="flex gap-3 justify-center items-center">
        <FaGithub size={30} /> 
      <Link href="https://github.com/developerpalakbasak" target="_blank" className="font-semibold text-xl">developerpalakbasak</Link>
      </span>
      <span className="flex gap-3 justify-center items-center">
         <IoMailOpenSharp size={30} />
      <Link href="mailto:developerpalakbasak@gmail.com" className="font-semibold text-xl">Send a mail</Link>
      </span>
    </div>
    </>
    
  );
}



