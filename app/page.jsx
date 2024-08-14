import Spline from "@splinetool/react-spline/next";
import { SignInButton } from "@clerk/nextjs";
function Page() {
  return (
    <div className="relative poppins-regular container h-screen mx-auto ">
      <div className=" p-10 absolute z-20 top-[50%] w-full text-center  left-[50%] -translate-x-1/2 -translate-y-1/2 ">
        <div className="pb-2 Mixcase-800  pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#4285f4] bg-clip-text text-center sm:text-7xl text-5xl font-bold leading-none tracking-tighter text-transparent w-full ">
          Promptly.ai
        </div>
        <p className="text-base text-white">
          Transform Your Ideas into Action <br /> with Intelligent Prompt
          Generation{" "}
        </p>
      </div>
      <div className=" absolute top-[50%] w-full left-[50%] -translate-x-1/2 -translate-y-1/2    h-full">
        <Spline scene="https://prod.spline.design/4jQTDA1PS4DCq913/scene.splinecode" />
      </div>
      <nav className="max-w-4xl mx-auto relative top-8  bg-glass rounded-full  flex justify-between items-center p-2 ">
        <div className="w-10 h-10 rounded-full overflow-hidden ">
          <img
            src="https://chatbot.design/images/chatbot/DIGITAL%20%28RGB%29/PNG/Contained_Mark_Blue.png"
            alt=""
          />
        </div>

        <div className="flex h-full justify-center items-center gap-2">
          <SignInButton
            fallbackRedirectUrl="/chat"
            signUpFallbackRedirectUrl="/onboarding"
          >
            <button
              type="button"
              className="text-white bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#4285f4] hover:bg-gradient-to-tr font-medium rounded-full text-sm px-5 py-2.5 text-center  "
            >
              Get Started
            </button>
          </SignInButton>
        </div>
      </nav>
    </div>
  );
}

export default Page;
