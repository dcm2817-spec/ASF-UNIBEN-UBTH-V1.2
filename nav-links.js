// The site's navigation menu, defined once. To add, remove, or reorder a
// nav link, edit this array only -- nav.js builds every page's menu from
// it, so there's no need to edit each HTML page's navbar by hand anymore.
const NAV_LINKS = [
  { href: 'index.html', label: 'About' },
  { href: 'leadership.html', label: 'Leadership' },
  { href: 'ministry-groups.html', label: 'Ministry Groups', id: 'nav-ministry', requiresAuth: true },
  { href: 'announcements.html', label: 'Announcements', id: 'nav-announcements', requiresAuth: true },
  { href: 'messages.html', label: 'Messages', id: 'nav-messages', requiresAuth: true },
  { href: 'songs.html', label: 'Songs', id: 'nav-songs', requiresAuth: true },
  { href: 'chat.html', label: 'Ask ASF', id: 'nav-chat', requiresAuth: true },
  { href: 'profile.html', label: 'My Profile', id: 'nav-profile', requiresAuth: true },
  { href: 'admin.html', label: 'Admin', id: 'nav-admin', requiresAdmin: true },
];
