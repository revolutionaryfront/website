import { CallToActionButton } from "@/components/CallToActionButton";
import { Page } from "@/components/Page";

import HomeBackgroundImage from "@public/images/home-bg.png";

export default function Home() {
  return (
    <div className="flex flex-col h-full items-center w-full">
      <section
        className="bg-center bg-cover flex flex-col h-150 items-center justify-center w-full"
        style={{
          backgroundImage: `url('${HomeBackgroundImage.src}')`,
        }}>
        <div className="max-w-5xl p-5 text-body-light text-shadow-lg/20 w-full">
          <h1 className="font-bold font-title mb-2 text-8xl">We are Revolutionary Front,</h1>
          <h2 className="font-bold text-5xl uppercase break-keep">
            a revolutionary socialist and anti-imperialist organization in North Texas.
          </h2>
        </div>
      </section>
      <Page>
        <article>
          Revolutionary Front exists to heighten working-class consciousness within the metroplex through education, agitation, mass rallies,
          direct action, and grassroots organizing. By doing so, we will assist our fellow workers and oppressed community
          members in developing the knowledge, desire, and institutions necessary to bring forth liberation.
        </article>
        <nav className="flex flex-row justify-between">
          <CallToActionButton path="/points-of-unity" text="Points of Unity" />
          <CallToActionButton path="https://donate.revolutionaryfront.org" text="Donate" openInNewTab privacy />
          <CallToActionButton path="/join" text="Join" />
        </nav>
      </Page>
    </div>
  );
}
