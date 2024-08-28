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
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

interface CustomProps {
	control: Control<any>;
	name: string;
	label?: string;
	placeholder?: string;
	iconSrc?: string;
	iconAlt?: string;
	disabled?: boolean;
	dateFormat?: string;
	showTimeSelect?: boolean;
	children?: React.ReactNode;
	renderSkeleton?: (field: any) => React.ReactNode;
	fieldType: FormFieldType;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
	const { fieldType, name, label, placeholder, iconSrc, iconAlt } = props;
	switch (props.fieldType) {
		case FormFieldType.INPUT:
			return (
				<div className="flex rounded-md border border-dark-500 bg-dark-400">
					{props.iconSrc && (
						<Image
							src={props.iconSrc}
							height={24}
							width={24}
							alt={props.iconAlt || "icon"}
							className="ml-2"
						/>
					)}
					<FormControl>
						<Input
							placeholder={props.placeholder}
							{...field}
							className="shad-input border-0"
						/>
					</FormControl>
				</div>
			);
		case FormFieldType.PHONE_INPUT:
			return (
				<FormControl>
					<PhoneInput
						defaultCountry="GB"
						placeholder={props.placeholder}
						international
						withCountryCallingCode
						value={field.value as E164Number | undefined}
						onChange={field.onChange}
						className="input-phone"
					/>
				</FormControl>
			);
		default:
			break;
	}
};

const CustomFormField = (props: CustomProps) => {
	const { control, fieldType, name, label } = props;
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex-1">
					{fieldType !== FormFieldType.CHECKBOX && label && (
						<FormLabel>{label}</FormLabel>
					)}
					<RenderField field={field} props={props} />
					<FormMessage className="shad-error" />
				</FormItem>
			)}
		/>
	);
};

export default CustomFormField;
