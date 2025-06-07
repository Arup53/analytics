import Link from "next/link";
import AnimationContainer from "../wrapper/AnimationContainer";
import SectionBadge from "../wrapper/SectionWrapper";
import Wrapper from "../wrapper/wrapperSectionContainer";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <Wrapper className="relative flex-1 pt-20 lg:pt-32 w-full h-full min-h-screen">
      <div className="z-[11] flex lg:flex-row flex-col lg:gap-16 w-full h-full">
        <div className="flex flex-col items-start gap-10 py-8 w-full">
          <div className="flex flex-col items-start gap-4">
            <AnimationContainer>
              <SectionBadge title="Built using Next.Js" />
            </AnimationContainer>

            <AnimationContainer>
              <h1 className="bg-clip-text bg-gradient-to-r from-white to-neutral-500 font-medium text-transparent text-5xl lg:text-6xl !leading-tight">
                {"Unlock Your Website's Potential"}
              </h1>
            </AnimationContainer>

            <AnimationContainer>
              <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
                Unlock powerful insights with ease. Track visitor behavior,
                monitor key metrics, and optimize performance effortlessly with
                our intuitive analytics platform.
              </p>
            </AnimationContainer>
          </div>

          <AnimationContainer>
            <div className="w-full">
              <Link href="/">
                <Button className="bg-[#C05D5D] hover:bg-[#c05d5dcb] w-full md:w-auto">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </AnimationContainer>

          {/* <AnimationContainer >
            <div className="flex flex-col items-start gap-4 py-4">
              <p className="text-muted-foreground text-sm md:text-base">
                Powering Insights with Cutting-Edge Technology
              </p>
              <div className="relative w-full max-w-[calc(100vw-2rem)] lg:max-w-lg">
                <Marquee className="select-none [--duration:30s] [--gap:2rem]">
                  {languages.map((Company, index) => (
                    <div
                      key={index}
                      className="flex justify-center items-center h-16 text-muted-foreground"
                    >
                      <Company className="grayscale-[1] w-auto h-12" />
                    </div>
                  ))}
                </Marquee>
                <div className="-right-1 z-40 absolute inset-y-0 bg-gradient-to-l from-[#101010] w-1/3 pointer-events-none"></div>
                <div className="-left-1 z-40 absolute inset-y-0 bg-gradient-to-r from-[#101010] w-1/3 pointer-events-none"></div>
              </div>
            </div>
          </AnimationContainer> */}
        </div>

        <AnimationContainer className="z-[12]">
          <div className="relative flex flex-col justify-start items-start w-full h-min overflow-visible">
            <div className="relative w-full lg:w-[1024px] lg:h-[auto,760px] lg:aspect-[1.3884514435695539/1]">
              <div className="hidden lg:block right-[0%] z-50 absolute inset-y-0 bg-gradient-to-l from-black w-[60%] h-[86%] pointer-events-none"></div>
              <div className="lg:absolute lg:inset-0">
                {/* <Image
                  src="/bg/hero-1.png"
                  alt="hero"
                  sizes="1000px"
                  width={1024}
                  height={1024}
                  className="rounded-xl lg:rounded-2xl min-w-full h-auto object-contain"
                /> */}

                <p>koi koi </p>
              </div>
            </div>
          </div>
        </AnimationContainer>
      </div>
    </Wrapper>
  );
};

export default Hero;
