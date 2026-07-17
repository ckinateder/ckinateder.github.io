const Footer = () => {
  return (
    <footer className="border-t border-line bg-canvas pt-8 pb-6 text-center transition-colors duration-150">
      <p className="font-mono text-xs text-muted tracking-wide">
        © {new Date().getFullYear()} Calvin Kinateder · Built with React & Tailwind
      </p>
    </footer>
  )
}

export default Footer
