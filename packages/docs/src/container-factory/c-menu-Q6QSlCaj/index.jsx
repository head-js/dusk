export default function Container() {
  const active = 'kanban';

  return (
    <div className="Menu flex-initial">
      <ul className="menu menu-compact bg-base-100 border-r border-b">
        <li className="items-center">
          <a href="/">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </a>
        </li>
        <li className="menu-title">
          <span>Menu</span>
        </li>
        <li className={ active === 'scrum' ? 'bordered' : ''}><a href="/scrum-sprint">Scrum</a></li>
        <li className={ active === 'org' ? 'bordered' : ''}><a href="/org">Org</a></li>
        <li className={ active === 'align' ? 'bordered' : ''}><a href="/align">Align</a></li>
        <li className={ active === 'kanban' ? 'bordered' : ''}><a href="/kanban">Kanban</a></li>
      </ul>
    </div>
  );
}
