import { useNavigate } from "react-router";
import Button from "../../components/ui/Button";
import Logo from "../../components/common/Logo";


export default function Landing() {
  const navigate = useNavigate()


  return (
    <div className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden bg-black px-6 py-12">
      {/* Purple blob background decoration */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-purple-600/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-purple-700/30 blur-3xl" />

      {/* Logo */}
      <div className="z-10 w-full">
        <Logo />
      </div>

      {/* Headline */}
      <div className="z-10 flex flex-1 flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
          Strangers.
          <br />
          Hangouts.
          <br />
          Memories.
        </h2>
        <p className="mt-4 max-w-xs text-base text-gray-400">
          Discover parties, meet like-minded people, and never have a boring
          weekend again.
        </p>
      </div>

      {/* Bottom*/}
      <div className="z-10 flex w-full max-w-sm flex-col gap-3">
        <Button variant="primary" fullWidth onClick={() => navigate('/signup')}>
          Get Started
        </Button>
        <button
          onClick={() => navigate('/terms')}
          className="text-center text-sm text-gray-400 underline underline-offset-2"
        >
          Terms & Conditions
        </button>
      </div>
    </div>
  )
}
