import { Page } from "@/components/Page";

export default function Join() {
  return (
    <Page>
      <iframe
        className="block border-none h-full w-full"
        src="https://docs.google.com/forms/d/e/1FAIpQLScKsN7GgnEcdvBGLB4usYYvGwXo47Bb67dlDbD1bW4W3y3VRA/viewform?embedded=true"
        style={{
          height: 1800
        }}
        referrerPolicy="no-referrer"></iframe>
    </Page>
  );
}
