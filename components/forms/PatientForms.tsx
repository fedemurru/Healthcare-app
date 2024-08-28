"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import { UserFormValidation } from "@/lib/validation";

export enum FormFieldType {
	INPUT = "input",
	TEXTAREA = "textarea",
	PHONE_INPUT = "phoneInput",
	CHECKBOX = "checkbox",
	DATE_PICKER = "datePicker",
	SELECT = "select",
	SKELETON = "skeleton",
}

const formSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
});

export function PatientForms() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	// 1. Define your form.
	const form = useForm<z.infer<typeof UserFormValidation>>({
		resolver: zodResolver(UserFormValidation),
		defaultValues: {
			username: "",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		console.log(values);
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
				<section className="mb-12 space-y-4">
					<h1 className="header">Hi there 👋</h1>
					<p className="text-dark-700">Get started with appointments.</p>
				</section>
				<CustomFormField
					fieldType={FormFieldType.INPUT}
					control={form.control}
					name="name"
					lable="Full Name"
					placeholder="John Doe"
					iconSrc="/assets/icons.user.svg"
					iconAlt="user"
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}

export default PatientForms;
