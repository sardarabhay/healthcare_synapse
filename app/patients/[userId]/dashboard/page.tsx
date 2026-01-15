import StatCard from '@/components/StatCard';
import { getPatientAppointments } from '@/lib/actions/appointment.actions';
import { getPatient, getUser } from '@/lib/actions/patient.actions';
import Image from 'next/image';
import Link from 'next/link';
import { patientColumns } from "@/components/table/patientColumns";
import { DataTable } from "@/components/table/DataTable";
import { redirect } from 'next/navigation';

const PatientDashboard = async ({ params }: SearchParamProps) => {
    const { userId } = await params;
    
    const user = await getUser(userId);
    const patient = await getPatient(userId);
    
    if (!patient) {
        redirect(`/patients/${userId}/register`);
    }
    
    const appointments = await getPatientAppointments(userId);
    
    return (
        <div className="mx-auto flex max-w-7xl flex-col space-y-14">
            <header className="admin-header">
                <Link href="/" className="cursor-pointer">
                    <Image
                        src="/assets/icons/logo_synapse-remove-bg.png"
                        height={1000}
                        width={1000}
                        alt="logo"
                        className="h-8 w-fit"
                    />
                </Link>
                <div className="flex items-center gap-4">
                    <p className="text-16-semibold text-dark-700">
                        Welcome, {patient?.name || user?.name}
                    </p>
                    <Link 
                        href={`/patients/${userId}/new-appointment`}
                        className="text-green-500 hover:text-green-400"
                    >
                        + New Appointment
                    </Link>
                </div>
            </header>

            <main className="admin-main">
                <section className="w-full space-y-4">
                    <h1 className="header">My Appointments</h1>
                    <p className="text-dark-700">
                        View and track all your appointments
                    </p>
                </section>

                <section className="admin-stat">
                    <StatCard
                        type="appointments"
                        count={appointments?.scheduledCount || 0}
                        label="Scheduled"
                        icon={"/assets/icons/appointments.svg"} 
                    />

                    <StatCard
                        type="pending"
                        count={appointments?.pendingCount || 0}
                        label="Pending"
                        icon={"/assets/icons/pending.svg"} 
                    />

                    <StatCard
                        type="cancelled"
                        count={appointments?.cancelledCount || 0}
                        label="Cancelled"
                        icon={"/assets/icons/cancelled.svg"} 
                    />
                </section>

                {appointments?.documents?.length > 0 ? (
                    <DataTable columns={patientColumns} data={appointments.documents} />
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 space-y-4">
                        <Image
                            src="/assets/icons/calendar.svg"
                            height={80}
                            width={80}
                            alt="no appointments"
                            className="opacity-50"
                        />
                        <p className="text-dark-600 text-lg">No appointments yet</p>
                        <Link 
                            href={`/patients/${userId}/new-appointment`}
                            className="shad-primary-btn px-6 py-3 rounded-lg"
                        >
                            Book Your First Appointment
                        </Link>
                    </div>
                )}
            </main>
        </div>
    )
}

export default PatientDashboard
