import { FormButton } from "@/components/form-button";
import { FormInput } from "@/components/form-input";
import { Page } from "@/components/page";
import { Title } from "@/components/title";

export default function Contact() {
  return (
    <Page>
      <Title>Contact Us</Title>
      <form action="https://secform.revolutionaryfront.org/" method="POST" id="contactForm">
        <p>We&apos;d love to hear from you! Use this form to send us a secure message.</p>

        <FormInput type="short-text" name="name" label="Name" required />
        <FormInput type="email" name="email" label="Email address" required />
        <FormInput type="long-text" name="message" label="Message" required />

        <input type="hidden" id="k" name="k" value="MTAzMjkK3AAFE85v" />
        <input type="hidden" id="formredir" name="formredir" value=" " />

        <FormButton text="Send message" />
      </form>
    </Page>
  );
}
