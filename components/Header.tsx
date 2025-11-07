import Link from 'next/link';

export function Header() {
  return (
    <header className="header">
      <div className="header__primary">
        <div>
          <div className="tag-pill">Dashboard</div>
          <h1>LeafLift</h1>
          <p className="header__subtitle">
            A calm command center for monitoring every plant&apos;s mood, hydration, and growth.
          </p>
        </div>
      </div>
      <div className="header__actions">
        <div className="header__search">
          <span aria-hidden="true">🔍</span>
          <input type="search" placeholder="Search plants, care logs, tips..." />
        </div>
        <div className="header__actions-buttons">
          <button className="button button--ghost" type="button">
            Insights
          </button>
          <button className="button button--primary" type="button">
            + Add Plant
          </button>
        </div>
        <Link href="#" className="header__profile" aria-label="Open personal dashboard">
          <span className="header__profile-avatar" aria-hidden="true">
            🌱
          </span>
          <div>
            <span className="header__profile-name">Morgan</span>
            <span className="header__profile-role">Plant curator</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
