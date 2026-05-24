export default function Spinner({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className="animate-spin"
    >
      <circle
        cx="10"
        cy="10"
        r="8"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="2"
      />
      <path
        d="M10 2a8 8 0 0 1 8 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}