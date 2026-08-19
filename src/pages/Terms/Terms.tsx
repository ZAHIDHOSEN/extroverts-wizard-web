import { useNavigate } from 'react-router';
import Button from '../../components/ui/Button';


const sections = [
  {
    title: 'Age Requirement',
    body: 'You must be 18 years or older to use Extroverts. By signing up, you confirm you meet this requirement.',
  },
  {
    title: 'Account Responsibility',
    body: 'You are responsible for maintaining the confidentiality of your account and for all activities under it.',
  },
  {
    title: 'Community Conduct',
    body: 'Harassment, hate speech, or unsafe behavior at events is strictly prohibited and may result in a permanent ban.',
  },
  {
    title: 'Privacy',
    body: 'We collect your email, name, and location to provide core app functionality. See our Privacy Policy for full details.',
  },
  {
    title: 'Content Guidelines',
    body: 'Photos and content shared must comply with community guidelines. We reserve the right to remove violating content.',
  },
];

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-black px-6 py-10 text-white">
      {/* Background accent */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-purple-600/25 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-2xl">
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-300 hover:bg-white/10"
          aria-label="Go back"
        >
          ←
        </button>

        <h1 className="mb-2 text-3xl font-bold">Terms & Conditions</h1>
        <p className="mb-8 text-sm text-gray-400">
          Please review before continuing. Last updated Aug 2026.
        </p>

        {/* Sections as cards */}
        <div className="space-y-3">
          {sections.map((section, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/3 p-4"
            >
              <div className="mb-1.5 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600/20 text-xs font-semibold text-purple-400">
                  {i + 1}
                </span>
                <h2 className="font-semibold text-white">{section.title}</h2>
              </div>
              <p className="pl-8 text-sm leading-relaxed text-gray-400">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col gap-3">
          <Button variant="primary" fullWidth onClick={() => navigate('/signup')}>
            Accept & Continue
          </Button>
          <button
            onClick={() => navigate(-1)}
            className="text-center text-sm text-gray-400 hover:text-gray-300"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}