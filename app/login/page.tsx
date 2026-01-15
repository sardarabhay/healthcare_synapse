import PatientLoginForm from "@/components/forms/PatientLoginForm";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo_synapse-remove-bg.png"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <PatientLoginForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 Synapse. All rights reserved.
            </p>
            <Link href="/" className="text-green-500">
              New Patient? Sign Up
            </Link>
          </div>
        </div>
      </section>

      <Image 
        src="/assets/images/homepage.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
