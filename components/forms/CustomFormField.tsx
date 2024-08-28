"use client";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./PatientForms";
import React from "react";

interface CustomProps {
	control: Control<any>;
	fieldType: FormFieldType;
	name: string;
	label?: string;
	placeholder?: string;
	iconSrc?: string;
	disabled?: boolean;
	dateFormat?: string;
	showTimeSelect?: boolean;
	children?: React.ReactNode;
	renderSkeleton?: (field: any) => React.ReactNode;
}

const CustomFormField = ({ control, fieldType, name, label }: CustomProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex-1">
					{fieldType !== FormFieldType.CHECKBOX && label && (
						<FormLabel>{label}</FormLabel>
					)}
				</FormItem>
			)}
		/>
	);
};

export default CustomFormField;
