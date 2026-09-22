import { Page } from "@/components/page";

export default function Join() {
  return (
    <Page>
      <iframe
        className="block border-none h-full w-full"
        src="https://docs.google.com/forms/d/e/1FAIpQLScKsN7GgnEcdvBGLB4usYYvGwXo47Bb67dlDbD1bW4W3y3VRA/viewform?embedded=true"
        style={{
          height: 2200
        }}
        referrerPolicy="no-referrer"></iframe>
    </Page>
  );
}
