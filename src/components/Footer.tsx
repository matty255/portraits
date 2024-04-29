import { FOOTER_TITLE } from "../../constants/navigation";

export default function Footer() {
  return (
    <footer className="footer px-4 bg-neutral text-neutral-content fixed bottom-0">
      <aside className="">
        <p className="text-lg mb-1">{FOOTER_TITLE}</p>
      </aside>
      <nav className="flex"></nav>
    </footer>
  );
}
