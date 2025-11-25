import Announcement from '../../components/common/Misc/Announcement';
import Header from '../../components/navs/Header';
import Sidebar from '../../components/navs/Sidebar';

export default function SidebarLayout({ children }) {
  return (
    <main className="app-container">
      <Announcement />
      <Header />
      <section className="category-wrapper">
        <Sidebar />
        {children}
      </section>
    </main>
  );
}
