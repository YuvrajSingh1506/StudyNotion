
import React from "react";
import ContactUsForm from "../ContactPage/ContactUsForm";

const ContactFormSection = () => {
  return (
    <section className="mx-auto w-11/12 max-w-[900px] py-12 sm:py-16 lg:py-20">
      
      {/* Heading */}
        <div className="mx-auto max-w-[700px] text-center">
          <h1 className="text-3xl font-semibold text-richblack-5 sm:text-4xl lg:text-5xl">
            Get in Touch
          </h1>

          <p className="mt-4 text-sm leading-6 text-richblack-300 sm:text-base">
            We&apos;d love to hear from you. Please fill out this form and
            we&apos;ll get back to you as soon as possible.
          </p>
        </div>

      {/* Contact Form */}
      <div className="mx-auto mt-10 w-full sm:mt-12">
        <ContactUsForm />
      </div>
    </section>
  );
};

export default ContactFormSection;

