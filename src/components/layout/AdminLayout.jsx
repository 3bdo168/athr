import AdminNav from '../admin/AdminNav';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <AdminNav />
      <main className="flex-1 p-6">
        <div className="max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}