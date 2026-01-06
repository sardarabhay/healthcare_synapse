import AppointmentForm from '@/components/forms/AppointmentForm'
import RegisterForm from '@/components/forms/RegisterForm'
import { getPatient, getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import Link from 'next/link'

const Appointment = async({params}:SearchParamProps) => {
  const {userId}=await params;

    const patient=await getPatient(userId);
  
  return (
    <div className="flex h-screen max-h-screen">
          <section className="remove-scrollbar container my-auto ">
            <div className="sub-container max-w-[860px] flex-1 justify-between">
              <Image
                src="/assets/icons/logo-full.svg"
                height={1000}
                width={1000}
                alt="patient"
                className="mb-12 h-10 w-fit"
              />
    
              <AppointmentForm 
                userId={userId}
                patientId={patient?.$id}
                type="create"
              />    
    
              <p className="copyright mt-10 py-12">
                  © 2025 CarePulse. All rights reserved.
              </p>
            </div>
          </section>
    
          <Image 
            src="/assets/images/appointment-img.png"
            height={1500}
            width={1500}
            alt="appointment"
            className="side-img max-w-[390px] bg-bottom"
          />
        </div>
  )
}

export default Appointment