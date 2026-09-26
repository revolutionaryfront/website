"use client";

import { RefObject, SubmitEventHandler, useRef, useState } from "react";
import * as OpenPGP from "openpgp";
import { FormButton } from "@/components/form-button";
import { FormInput } from "@/components/form-input";
import { Page } from "@/components/page";
import { Title } from "@/components/title";
import { Alert, AlertType } from "@/components/alert";
import { PulseLoader } from "react-spinners";

const ANTI_SPAM_KEY = "TVRJM01UUUtNVFl6TWpZSwo=";
const PGP_KEY_URL = "https://secform.revolutionaryfront.org/pgp_pub_key";
const SUBMIT_URL = "https://secform.revolutionaryfront.org"

export default function Contact() {
  const formRef: RefObject<HTMLFormElement | null> = useRef(null);

  const [isInflightRequest, setIsInflightRequest] = useState(false);
  const [alertState, setAlertState] = useState<{
    isOpen: boolean;
    text: string;
    type: AlertType;
  }>({
    isOpen: false,
    text: "",
    type: "success"
  });

  const onSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    (async () => {
      if (isInflightRequest) {
        return;
      }
      setIsInflightRequest(true);

      // get form ref
      const form = formRef.current;
      if (form === null) {
        throw new Error("Form ref is null");
      }

      // get form control values by name/value
      const fields: Record<string, string> = Object.fromEntries(
        Array.from(form.elements)
          .filter((elem) => "name" in elem && "value" in elem)
          .map((elem) => [elem.name, elem.value])
          .filter(([key, value]) => key && value)
      );
      
      // load remote pgp key
      const pgpKeyResp = await fetch(PGP_KEY_URL);
      const pgpKeyJson = await pgpKeyResp.json();
      const pgpKeyArmored = new TextDecoder().decode(
        Uint8Array.from(atob(pgpKeyJson.key), (c) => c.charCodeAt(0))
      );
      const pgpKey = await OpenPGP.readKey({ armoredKey: pgpKeyArmored });

      // build email message as a list of key/value pairs from the form
      const emailMessage = Object.entries(fields)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");
      const encryptedMessage = await OpenPGP.encrypt({
        message: await OpenPGP.createMessage({ text: emailMessage }),
        encryptionKeys: pgpKey
      });

      // build form data
      const formData = new FormData();
      formData.append("message", encryptedMessage);
      formData.append("k", ANTI_SPAM_KEY); // TODO: get this more securely or tighten cors rules

      // submit form
      const submitResp = await fetch(SUBMIT_URL, {
        method: "POST",
        body: formData
      });
      if (!submitResp.ok) {
        throw new Error(`Submit failed: server responded with status code ${submitResp.status}`);
      }

      // show success alert
      setAlertState({
        isOpen: true,
        text: "Thank you for your message!",
        type: "success"
      });
    })()
      .catch((err) => {
        // show error alert on error
        setAlertState({
          isOpen: true,
          text: `Submit failed: ${err.message}`,
          type: "error"
        });
        console.error(err);
      })
      .finally(() => setIsInflightRequest(false));
  };

  return (
    <Page>
      <Title>Contact Us</Title>
      
      <form ref={formRef} onSubmit={onSubmit}>
        <p>We&apos;d love to hear from you! Use this form to send us a message.</p>

        <Alert
          show={alertState.isOpen}
          type={alertState.type}
          onClose={() => setAlertState({ isOpen: false, text: alertState.text, type: alertState.type })}>
            {alertState.text}
        </Alert>

        <FormInput type="short-text" name="name" label="Name" required />
        <FormInput type="email" name="email" label="Email address" required />
        <FormInput type="long-text" name="message" label="Message" required />

        <FormButton>
          {isInflightRequest
            ? <PulseLoader color="var(--color-body-light)" />
            : "Send message"}
        </FormButton>
      </form>
    </Page>
  );
}
