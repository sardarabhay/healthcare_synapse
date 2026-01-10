"use client"

import { ColumnDef } from "@tanstack/react-table"
 
import { Button } from "@/components/ui/button"
import { formatDateTime } from "@/lib/utils"
import { Appointment } from "@/types/appwrite.types"
import { Doctors } from "@/constants"
import Image from "next/image"
import StatusBadge from "../StatusBadge"
import { AppointmentModal } from "../AppointmentModal"

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index+1}</p>
  },
  {
    accessorKey:"patient",
    header:"Patient",
    cell:({row})=>{
      const appointment=row.original;
      console.log(appointment.patient);
      return <p className="text-14-medium">{appointment.patient?.name || "N/A"}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell:({row})=>{
      const appointment=row.original;
      return(
        <div className="min-w-[115px]">
          <StatusBadge status={appointment.status} />
        </div>
      );
    }
  },
  {
    accessorKey: "schedule",
    header:"Appointment",
    cell:({row})=>{
      const appointment=row.original;
      return(
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(appointment.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey:"primaryPhysician",
    header:"Doctor",
    cell:({row})=>{
      const appointment=row.original;

      const doctor=Doctors.find(
        (doctor)=>doctor.name===appointment.primaryPhysician
      );
      console.log(doctor);
 
      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image!}
            alt="doctor"
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
        
      );
    },
  },
  {
    id:"actions",
    header:()=> <div className="pl-4">Actions</div>,
    cell:({row})=>{
      const appointment=row.original;

      return(
        <div className="flex gap-1">
          <AppointmentModal 
          patientId={appointment.patient.$id}
          userId={appointment.userId}
          appointment={appointment}
          type="schedule"
          title="Schedule Appointment"
          description="Fill the form to schedule appointment"
          />
          <AppointmentModal 
          patientId={appointment.patient.$id}
          userId={appointment.userId}
          appointment={appointment}
          type="cancel"
          title="Cancel Appointment"
          description="Are you sure you want to cancel this appointment?"
          />
        </div>
      );
    }
  }
]