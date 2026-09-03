import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><p className="eyebrow">404 / Not found</p><h1>This page is outside the system.</h1><Link className="button button-dark" href="/">Return home</Link></main>;
}
