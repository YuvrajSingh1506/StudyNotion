
import ContactUsForm from "../../ContactPage/ContactUsForm";

const ContactFormSection = () => {
  return (
    <div className="mx-auto flex w-11/12 max-w-[1200px] flex-col items-center py-12 sm:py-16">

      {/* Heading */}
      

      {/* Form */}
      <div className="mt-10 w-full sm:mt-12 md:w-[85%] lg:w-[75%]">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;

