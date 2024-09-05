"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";

import { AppointmentModal } from "../AppointmentModal";
import { StatusBadge } from "../StatusBadge";

export const columns: ColumnDef<Appointment>[] = [
	{
		header: "ID",
		cell: ({ row }) => {
			return <p className="text-14-medium ">{row.index + 1}</p>;
		},
	},
	{
		accessorKey: "patient",
		header: "Patient",
		cell: ({ row }) => {
			const patientName = row.original.patient?.name || "Unknown Patient"; //
			return <p className="text-14-medium ">{patientName}</p>;
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const appointment = row.original;
			return (
				<div className="min-w-[115px]">
					<StatusBadge status={appointment.status} />
				</div>
			);
		},
	},
	{
		accessorKey: "schedule",
		header: "Appointment",
		cell: ({ row }) => {
			const appointment = row.original;
			return (
				<p className="text-14-regular min-w-[100px]">
					{formatDateTime(appointment.schedule).dateTime}
				</p>
			);
		},
	},
	{
		accessorKey: "primaryPhysician",
		header: "Doctor",
		cell: ({ row }) => {
			const appointment = row.original;

			const doctor = Doctors.find(
				(doctor) => doctor.name === appointment.primaryPhysician
			);

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
		id: "actions",
		header: () => <div className="pl-4">Actions</div>,
		cell: ({ row }) => {
			const appointment = row.original;

			return (
				<div className="flex gap-1">
					<AppointmentModal
						patientId={appointment.patient?.name || "Unknown ID"}
						userId={appointment.userId}
						appointment={appointment}
						type="schedule"
						title="Schedule Appointment"
						description="Please confirm the following details to schedule."
					/>
					<AppointmentModal
						patientId={appointment.patient?.name || "Unknown ID"}
						userId={appointment.userId}
						appointment={appointment}
						type="cancel"
						title="Cancel Appointment"
						description="Are you sure you want to cancel your appointment?"
					/>
				</div>
			);
		},
	},
];

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

// export type Payment = {
// 	id: string;
// 	amount: number;
// 	status: "pending" | "processing" | "success" | "failed";
// 	email: string;
// };

// export const columns: ColumnDef<Payment>[] = [
// 	{
// 		accessorKey: "status",
// 		header: "Status",
// 	},
// 	{
// 		accessorKey: "email",
// 		header: "Email",
// 	},
// 	{
// 		accessorKey: "amount",
// 		header: () => <div className="text-right">Amount</div>,
// 		cell: ({ row }) => {
// 			const amount = parseFloat(row.getValue("amount"));
// 			const formatted = new Intl.NumberFormat("en-GB", {
// 				style: "currency",
// 				currency: "GBP",
// 			}).format(amount);

// 			return <div className="text-right font-medium">{formatted}</div>;
// 		},
// 	},
// ];
