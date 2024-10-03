"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";

export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton',
}

const PatientForm = () => {
    const router = useRouter();
    const [isLoading, setisLoading] = useState(false);

    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    });

    async function onSubmit(values: z.infer<typeof UserFormValidation>) {
        setisLoading(true);

        try {
            const userData = { name: values.name, email: values.email, phone: values.phone };
            const user = await createUser(userData);

            console.log("User data returned:", user);  // Debugging log
            if (user && user.$id) {
                router.push(`/patients/${user.$id}/register`);
            } else {
                console.log("User creation or retrieval failed, no valid user returned.");
            }
        } catch (error) {
            console.log("Error occurred:", error);
        } finally {
            setisLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-2 -mt-8">
                <section className="space-y-12">
                    <h1 className="header -mt-10 -mb-5">Hi There! </h1>
                    <p className="text-dark-700 mt-5">Schedule Your Appointment Here at Mary Chiles Hospital</p>
                </section>

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label="Full name"
                    placeholder="Juan DelaCruz"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="User"
                />

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="juandelacruz@gmail.com"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email"
                />

                <CustomFormField
                    fieldType={FormFieldType.PHONE_INPUT}
                    control={form.control}
                    name="phone"
                    label="Phone number"
                    placeholder="09xxxxxxxxx"
                />

                <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
            </form>
        </Form>
    );
};

export default PatientForm;
