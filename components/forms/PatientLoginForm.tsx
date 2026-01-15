"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import SubmitButton from "../SubmitButton"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { getUserByEmail, getPatient } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"

const LoginFormValidation = z.object({
  email: z.string().email("Invalid email address"),
});

const PatientLoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit({ email }: z.infer<typeof LoginFormValidation>) {
    setIsLoading(true);
    setError(null);

    try {
      const user = await getUserByEmail(email);
      
      if (!user) {
        setError("No account found with this email. Please sign up first.");
        setIsLoading(false);
        return;
      }

      // Check if user has completed registration (has patient record)
      const patient = await getPatient(user.$id);
      
      if (!patient) {
        // User exists but hasn't completed registration
        router.push(`/patients/${user.$id}/register`);
        return;
      }

      // User is fully registered, go to dashboard
      router.push(`/patients/${user.$id}/dashboard`);

    } catch (err) {
      console.log(err);
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome Back👋</h1>
          <p className="text-dark-700">Login to view your appointments.</p>
        </section>

        <CustomFormField 
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="Enter your registered email"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email icon"
        />

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <SubmitButton isLoading={isLoading}>Login</SubmitButton>
      </form>
    </Form>
  );
}

export default PatientLoginForm
