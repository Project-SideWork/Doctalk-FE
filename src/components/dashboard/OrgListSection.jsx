export default function OrgListSection({ orgs = [] }) {
  return (
    <section className="border rounded-xl p-4 mt-4">
      <div className="flex items-center justify-between pb-3">
        <h3 className="font-bold text-[18px]">My Organizaion List</h3>
        <span className="text-sm text-gray-500">{orgs.length}개</span>
      </div>

      <div className="max-h-[240px] overflow-y-auto pr-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {orgs.map((org) => {
            const href = org.html_url ?? org.url;
            const sub = org.html_url ? `github.com/${org.login}` : org.url;

            return (
              <a
                key={org.id}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="border rounded-lg p-3 hover:bg-gray-50 hover:border-gray-300 transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={org.avatar_url}
                    alt={org.login}
                    className="w-10 h-10 rounded-full border"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <div className="font-medium truncate">{org.login}</div>
                    <div className="text-xs text-gray-500 truncate">{sub}</div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
